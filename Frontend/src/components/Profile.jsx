import { useContext } from "react";
import { motion } from "framer-motion";
import AppContext from "../Context/AppContext.js";
import PostCard from "../components/PostCard.jsx";
import { TbCircleX } from "react-icons/tb";
import SavedCard from "./SavedCard.jsx";
function Profile() {
  const {
    userData,
    setIsUserProfileVisible,
    setIsSavedPostsVisible,
    postByUser,
    isUserProfileVisible,
    isSavedPostsVisible,
    savedPost,
  } = useContext(AppContext);

  const handleCalcel = () => {
    if (isUserProfileVisible || isSavedPostsVisible) {
      setIsUserProfileVisible(false);
      setIsSavedPostsVisible(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={
        "profile h-screen w-screen fixed top-0 flex justify-center items-center left-0 bg-gray-800 z-50 overflow-scroll"
      }
    >
      <div className="w-full bg-gray-800 h-full flex-flex-col p-4">
        <div className="h-5 flex justify-end text-3xl">
          <TbCircleX
            className="text-red-500 hover:opacity-70 cursor-pointer "
            onClick={handleCalcel}
          />
        </div>
        <div className="header w-full flex flex-col justify-center items-center mb-4 gap-2 border-b-2 pb-5 border-white">
          <div className="flex items-center justify-center gap-3 text-2xl font-serif">
            <div
              className={
                "h-10 w-10 rounded-4xl bg-linear-to-t text-white from-blue-900 to-purple-900 justify-center items-center flex"
              }
            >
              <p className={`font-bold `}>
                {userData?.user?.username[0].toUpperCase()}
              </p>
            </div>
            <p className="text-white">{userData?.user?.username}</p>
          </div>
          <div className="text-xl text-white">
            <p>
              Joined Date :{" "}
              <span className="text-green-500 font-bold">
                {new Date(userData?.user?.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-center text-2xl mt-5 font-bold bg-gray-700 shadow-black shadow-md p-2 rounded-2xl">
              {isUserProfileVisible ? "Your Posts" : "Saved Posts"}
            </p>
          </div>
        </div>
        <div className="main w-full h-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {isUserProfileVisible &&
              postByUser.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            {isSavedPostsVisible &&
              savedPost.map((post, index) => (
                <SavedCard key={index} post={post} />
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
