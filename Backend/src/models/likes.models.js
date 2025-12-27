import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    unique: [true, "Repeat Save"],
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Likes = mongoose.model("Likes", likesSchema);
