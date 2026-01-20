import { useEffect, useState } from "react";

import Navbar from "../components/Navbar.jsx";
import AppContext from "../Context/AppContext.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AddPostCard from "../components/AddPostCard.jsx";
import { AnimatePresence } from "framer-motion";
import PostCard from "../components/PostCard.jsx";
import Profile from "../components/Profile.jsx";
function Home() {
  const fetchPost = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/post/getPosts",
    );
    setPosts(response.data);
  };
  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/user/getUser/${state?.userId}`,
    );
    setUserData(response.data);
  };

  const fetchUserPosts = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/post/getUsersPost/${state?.userId}`,
    );
    setPostByUser(response.data);
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/post/getSavedPost/${state?.userId}`,
      );
      setSavedPost(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  const fetchUserLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/post/getUserLikes/${state?.userId}`,
      );
      console.log(response.data);
      setLikedByUser(response.data);
    } catch (error) {
      console.error("Error fetching likes:", error);
      setLikedByUser([]);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchUserPosts();
    fetchSavedPosts();
    fetchUserLike();
    console.log("Hello world");
    console.log("I am aditya");

  }, []);

  // Data from the api
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState([]);
  const [postByUser, setPostByUser] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [likedByUser, setLikedByUser] = useState([]);

  //States
  const state = useLocation().state;

  // profiles or navbar actions
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const [isSavedPostsVisible, setIsSavedPostsVisible] = useState(false);
  const [isLikedPostsVisible, setIsLikedPostsVisible] = useState(false);

  //constants
  const [isCaptionCardVisible, setIsCaptionCardVisible] = useState(false);

  return (
    <AppContext
      value={{
        fetchPost,fetchUser,
        userData,
        posts,
        isAddPostVisible,
        setIsAddPostVisible,
        isUserProfileVisible,
        setIsUserProfileVisible,
        postByUser,
        setPostByUser,
        fetchUserPosts,
        isSavedPostsVisible,
        savedPost,
        setSavedPost,
        setIsSavedPostsVisible,
        fetchSavedPosts,
        fetchUserLike,
        likedByUser,
        setLikedByUser,
<<<<<<< HEAD
        isLikedPostsVisible,
        setIsLikedPostsVisible,
=======
        isLikedPostsVisible, setIsLikedPostsVisible,
        isCaptionCardVisible, setIsCaptionCardVisible
>>>>>>> 4df90be2a09c8cdc3ec1f1dfe9857316cc529137
      }}
    >
      <div className={`Home flex flex-col h-screen w-screen `}>
        <Navbar />
        <h1>Hello world</h1>
        <h2>Hi am adiya</h2>
        <AnimatePresence>{isAddPostVisible && <AddPostCard />}</AnimatePresence>
        <AnimatePresence>
          {isUserProfileVisible && <Profile />}
          {isSavedPostsVisible && <Profile />}
        </AnimatePresence>
        <main className="flex-1 bg-linear-to-b from-gray-900 to-gray-800 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </div>
        </main>
      </div>
    </AppContext>
  );
}

export default Home;
