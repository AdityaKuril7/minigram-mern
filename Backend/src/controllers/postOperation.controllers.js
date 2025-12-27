import mongoose from "mongoose";
import {SavedPost} from "../models/savedPost.models.js"
export const saveUserPost = async (req, res) => {
    const {userId,postId} = req.body;

    try {
        const result = await SavedPost.create({userId,postId})
        res.send({success:true,message:"save post successfully !"})
    } catch (error) {
        return res.send({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
};

export const getSavedPostByUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const result = await SavedPost.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },

            // saver user
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "savedBy"
                }
            },

            // post
            {
                $lookup: {
                    from: "posts",
                    localField: "postId",
                    foreignField: "_id",
                    as: "postDetails"
                }
            },

            // postDetails array todna
            { $unwind: "$postDetails" },

            // 🔥 post owner lookup
            {
                $lookup: {
                    from: "users",
                    localField: "postDetails.userId",
                    foreignField: "_id",
                    as: "postOwner"
                }
            },

            { $unwind: "$postOwner" },

            // optional: clean output
            {
                $project: {
                    "userDetails.password": 0,
                    "userDetails.email": 0,
                    "userDetails.role": 0,
                    "postOwner.password": 0,
                    "postOwner.email": 0,
                    "__v": 0
                }
            }
        ])

        if(!result) return res.json({success:false,message:"No records or user found"})
        res.json(result);

    } catch (error) {
        return res.send({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
};
