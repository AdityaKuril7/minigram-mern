import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addPost,
  deletePostById,
  getAllPost,
  getPostById,
  getUserLikes,
  getUserPost,
  LikePost,
  unlikePost,
  unsavePost,
  updatePostCaption,
} from "../controllers/post.controllers.js";
import {
  getSavedPostByUser,
  saveUserPost,
} from "../controllers/postOperation.controllers.js";
const postRouter = express.Router();

//Post
postRouter.route("/getPosts").get(getAllPost); // get all posts
postRouter.route("/getSpecificPost/:id").get(getPostById); // get spcific post, req.params
postRouter.route("/addPost").post(upload.single("image"), addPost);
postRouter.route("/updatePost/:id").put(updatePostCaption); // req.params
postRouter.route("/deletePost/:id").delete(deletePostById); // delete post
postRouter.route("/getUsersPost/:userId").get(getUserPost);

// Save Post
postRouter.route("/savePost").post(saveUserPost);
postRouter.route("/getSavedPost/:userId").get(getSavedPostByUser);
postRouter.route("/unsavePost").post(unsavePost);

//Like Post
postRouter.route("/getUserLikes/:userId").get(getUserLikes);
postRouter.route("/Like").post(LikePost);
postRouter.route("/unlikePost").post(unlikePost);


export { postRouter };
