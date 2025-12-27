import {useContext, useState} from 'react';
import {FaImage, FaTimes} from 'react-icons/fa';
import AppContext from '../Context/AppContext.js';
import axios from 'axios';
import {motion} from 'framer-motion';

function AddPostCard() {
  const {userData, setIsAddPostVisible,fetchPost} = useContext(AppContext);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);
  formData.append("userId", userData?.user?._id);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (PNG, JPG, or JPEG)');
      }
    }
  };

  const handlePost = async () => {
    const result = await axios.post('http://localhost:8000/api/v1/post/addPost', formData)
    console.log(result)
    fetchPost();
    setIsAddPostVisible(false)
  }

  const handleCancel = () => {
    setImageFile(null);
    setImagePreview(null);
    setCaption('');
    setIsAddPostVisible(false)
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0, transition: {duration: 0.5, ease: 'easeInOut'}}}
      transition={{duration: 0.5, ease: 'easeInOut'}}
      className={'h-screen w-screen fixed top-0 flex justify-center items-center left-0 bg-gray-900 z-50'}>
      <div
        className="w-full max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Create New Post</h2>
          <button onClick={handleCancel} className="text-white hover:text-gray-300 transition-colors">
            <FaTimes size={24}/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Username Field (Read-only) */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Username</label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-lg p-3 border border-gray-600">
              <div
                className="h-10 w-10 rounded-full bg-gradient-to-t from-blue-900 to-purple-900 flex justify-center items-center">
                <p className="font-bold text-white">
                  {userData?.user?.username?.[0]?.toUpperCase() || 'U'}
                </p>
              </div>
              <input
                type="text"
                value={userData?.user?.username || ''}
                readOnly
                className="flex-1 bg-transparent text-white font-semibold outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Upload Image</label>
            <div className="relative">
              {!imagePreview ? (
                <label
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-700 hover:bg-gray-750">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaImage className="text-gray-400 text-6xl mb-3"/>
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                  >
                    <FaTimes/>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="4"
              className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-purple-500 focus:outline-none resize-none placeholder-gray-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handlePost}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Post
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 border border-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>

  );
}

export default AddPostCard;
