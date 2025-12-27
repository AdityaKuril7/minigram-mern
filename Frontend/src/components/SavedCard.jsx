import { useContext } from "react";
import { FaBookmark, FaShareAlt,FaHeart } from "react-icons/fa";
import AppContext from "../Context/AppContext";
import axios from "axios";
function SavedCard({ post }) {
  const { userData, savedPost, fetchSavedPosts,likedByUser, setLikedByUser,fetchUserLike } = useContext(AppContext);

  const isLiked =
    Array.isArray(likedByUser) &&
    likedByUser.some((item) => item.postId.toString() === post._id.toString());
  const handleLikePost = async () => {
    if (isLiked) {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/unlikePost",
        {
          userId: userData?.user?._id,
          postId: post._id,
        },
      );
      console.log(response.data);
      fetchUserLike();
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/Like",
        {
          userId: userData?.user?._id,
          postId: post._id,
        },
      );
      console.log(response.data);
      fetchUserLike();
    }
  };
  const isSaved = savedPost.some(
    (item) =>
      item?.postDetails?._id.toString() === post.postDetails._id.toString(),
  );

  const handleSave = async () => {
    if (isSaved) {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/unsavePost",
        {
          userId: userData?.user?._id,
          postId: post.postDetails._id,
        },
      );
      fetchSavedPosts();
      console.log(response.data);
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/savePost",
        {
          userId: userData?.user?._id,
          postId: post.postDetails._id,
        },
      );
      console.log(response.data);
      fetchSavedPosts();
    }
  };
  return (
    <div className="w-full max-w-md h-auto  flex flex-col rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 py-3 gap-3">
        <div className="h-10 w-10 rounded-full bg-linear-to-t from-blue-900 to-purple-900 flex justify-center items-center">
          <p className="font-bold text-white text-lg">
            {post?.postOwner?.username[0].toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className=" font-bold text-lg">{post?.postOwner?.username}</p>
          <p className="text-xs text-green-500 font-bold">
            {new Date(post?.postDetails?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={post?.postDetails?.image}
          alt="post"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex justify-around">
        <span className="flex gap-2 items-center">
          <FaShareAlt /> share
        </span>
        <span
          className={`flex gap-2 items-center ${isSaved ? "text-blue-500" : ""}`}
          onClick={handleSave}
        >
          <FaBookmark /> {isSaved ? "Saved" : "Save"}
        </span>
        <span
          className={`flex gap-2 items-center ${isLiked ? "text-red-500" : ""}`}
          onClick={handleLikePost}
        >
          <FaHeart /> {isLiked ? "Liked" : "Like"}
        </span>
      </div>
    </div>
  );
}

export default SavedCard;
