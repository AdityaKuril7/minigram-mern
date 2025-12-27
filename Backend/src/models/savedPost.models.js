import mongoose from "mongoose";

const savedPostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

/** @type {import('mongoose').Model} */
export const SavedPost = mongoose.model("SavedPost", savedPostSchema);
