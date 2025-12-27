import { Post } from "../models/post.models.js";
import { uploadFileOnCloudinary } from "../utils/coludinary.js";
import { SavedPost } from "../models/savedPost.models.js";
import mongoose from "mongoose";
import { Likes } from "../models/likes.models.js";
export const addPost = async (req, res) => {
  try {
    const { userId, caption } = req.body;
    const localFilePath = req.file?.path;

    if (!localFilePath)
      return res.send({ success: false, message: "No File Path" });

    const result = await uploadFileOnCloudinary(localFilePath);
    const dbresult = await Post.create({
      userId: userId,
      image: result.url,
      caption: caption,
    });
    res.send({ result: result.url });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const result = await Post.find({}).populate("userId", "username");
    if (!result)
      return res.send({ success: false, message: "No Records Found !" });
    res.json(result);
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findById(id);
    if (!result)
      return res.send({ success: false, message: "No Records Found !" });
    res.send({ result });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const updatePostCaption = async (req, res) => {
  const { id } = req.params;
  const { caption } = req.body;
  try {
    const result = await Post.findByIdAndUpdate(id, { caption }, { new: true });
    if (!result)
      return res.send({ success: false, message: "No Records Found !" });
    res.send({ success: true, message: "caption update successful" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(id);
    if (!result)
      return res.send({ success: false, message: "No Records Found !" });
    res.send({ success: true, message: "Deleted Successfully !" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const getUserPost = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Post.find({ userId }).populate("userId", "username");
    if (!result)
      return res.send({ success: false, message: "No Post Founds !" });
    return res.json(result);
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const unsavePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const result = await SavedPost.deleteOne({ userId, postId });
    res.send({ success: true, message: "removed from save" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const getUserLikes = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Likes.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!result)
      return res.send({ success: false, message: "No Likes Found " });
    return res.json(result);
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const LikePost = async (req, res) => {
  const { userId, postId } = req.body;
  console.log({ userId, postId });
  try {
    const result = await Likes.create({
      userId: new mongoose.Types.ObjectId(userId),
      postId: new mongoose.Types.ObjectId(postId),
    });
    if (!result) return res.send({ success: false, message: "Fail to like." });
    return res.send({ success: true, message: "Like Added" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const unlikePost = async (req, res) => {
  const { userId, postId } = req.body;
  console.log({ userId, postId });
  try {
    const result = await Likes.deleteOne({
      userId: new mongoose.Types.ObjectId(userId),
      postId: new mongoose.Types.ObjectId(postId),
    });
    if (!result) return res.send({ success: false, message: "Fail to unLike" });
    return res.send({ success: true, message: "Like removed" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};
