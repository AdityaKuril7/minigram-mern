import React from "react";
import { FaBookmark, FaHome, FaPlusCircle, FaUser } from "react-icons/fa";
import AppContext from "../Context/AppContext.js";

function Navbar() {
  const {
    userData,
    setIsAddPostVisible,
    setIsUserProfileVisible,
    setIsSavedPostsVisible,
    fetchSavedPosts,
    fetchUserPosts
  } = React.useContext(AppContext);

  const handleUserProfile = () => {
    setIsUserProfileVisible(true);
    setIsSavedPostsVisible(false);
    fetchUserPosts();
  }
  return (
    <div
      className={`h-20 w-full bg-gray-900 text-white flex justify-between items-center border-b-2`}
    >
      <div className={`ApplicationName`}>
        <p className={`pl-5 text-2xl font-serif font-black `}>MiniGram</p>
      </div>
      <div className={`ActionButton flex gap-x-5`}>
        <div
          className={
            "actionbtns bg-blue-700 hover:bg-blue-600 transition-colors duration-300"
          }
        >
          <FaHome />
        </div>
        <div
          onClick={() => handleUserProfile() }
          className={
            "actionbtns bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
          }
        >
          <FaUser />
        </div>
        <div
          onClick={() => {
            setIsSavedPostsVisible(true);
            setIsUserProfileVisible(false)
            fetchSavedPosts();
          }}
          className={
            "actionbtns bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
          }
        >
          <FaBookmark />
        </div>
        <div
          onClick={() => setIsAddPostVisible(true)}
          className={
            "actionbtns bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
          }
        >
          <FaPlusCircle />
        </div>
      </div>
      <div
        className={
          "username pr-5 text-white font-semibold text-lg flex gap-x-2 items-center"
        }
      >
        <div
          className={
            "h-10 w-10 rounded-4xl bg-linear-to-t from-blue-900 to-purple-900 justify-center items-center flex"
          }
        >
          <p className={`font-bold `}>
            {userData?.user?.username[0].toUpperCase()}
          </p>
        </div>
        <p>{userData?.user?.username}</p>
      </div>
    </div>
  );
}

export default Navbar;
