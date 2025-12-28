import { useContext } from "react";
import AppContext from "../Context/AppContext";
import {
  FaBookmark,
  FaHeart,
  FaShare,
  FaShareAlt,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

function PostCard({ post }) {
  const {
    userData,
    savedPost,
    fetchSavedPosts,
    likedByUser,
    setLikedByUser,
    isUserProfileVisible,
    fetchUserLike,
    fetchUserPosts,
    fetchPost
  } = useContext(AppContext);

  const isSaved = savedPost.some(
    (item) => item?.postDetails?._id.toString() === post._id.toString()
  );
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
        }
      );
      console.log(response.data);
      fetchUserLike();
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/Like",
        {
          userId: userData?.user?._id,
          postId: post._id,
        }
      );
      console.log(response.data);
      fetchUserLike();
    }
  };

  const handlePostDelete = async () =>{
    const msg = prompt("Are Your sure ? yes or no ")
    if(msg.toLowerCase() === 'yes'){  
      const response = await axios.delete(`http://localhost:8000/api/v1/post/deletePost/${post._id}`)
      if(!response.data.success) return console.log(response.data)
      fetchPost()
      fetchUserPosts()
   }
  }

  const handleSave = async () => {
    if (isSaved) {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/unsavePost",
        {
          userId: userData?.user?._id,
          postId: post._id,
        }
      );
      console.log(response.data);
      fetchSavedPosts();
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/savePost",
        {
          userId: userData?.user?._id,
          postId: post._id,
        }
      );
      console.log(response.data);
      fetchSavedPosts();
    }
  };

  return (
    <div className="w-full max-w-md h-auto  flex flex-col rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center px-5 py-3 gap-3">
        <div className="h-10 w-10 rounded-full bg-linear-to-t from-blue-900 to-purple-900 flex justify-center items-center">
          <p className="font-bold text-white text-lg">
            {post?.userId?.username[0].toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className=" font-bold text-lg">{post?.userId?.username}</p>
          <p className="text-xs text-green-500 font-bold">
            {new Date(post?.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isUserProfileVisible && (
          <div className="flex w-50 justify-end">
            <p>
               <FaTrash className="text-red-500 text-lg" onClick={handlePostDelete} />
            </p>
          </div>
        )}
      </div>

      <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={post?.image}
          alt="post"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="px-5 py-3 flex justify-around">
        <span className="flex gap-2 items-center">
          <FaShareAlt /> share
        </span>
        <span
          className={`flex gap-2 items-center ${
            isSaved ? "text-blue-500" : ""
          }`}
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

export default PostCard;
