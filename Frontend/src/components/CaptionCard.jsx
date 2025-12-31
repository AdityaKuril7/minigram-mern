import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion"
import AppContext from "../Context/AppContext.js";
import axios from "axios";

export function CaptionCard() {

  const { isCaptionCardVisible, setIsCaptionCardVisible, fetchUser, userData } = useContext(AppContext)
  const [caption, setCaption] = useState("")
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current)
      textRef.current.focus()
  }, []);

  const handleUpdateBio = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/user/updateUser/${userData?.user?._id}`, {
        bio: caption
      })
      console.log(response.data)
      fetchUser()
      setIsCaptionCardVisible(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={'h-screen w-screen fixed flex justify-center items-center bg-black/50'}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={'card flex flex-col w-100 h-100 bg-white rounded-3xl shadow-md shadow-black'}>
        <p className={'pt-5 text-3xl text-center font-bold text-purple-500'}>Enter New Bio</p>
        <div className={'flex justify-center items-center '}>
          <textarea onChange={(e) => setCaption(e.target.value)} onKeyUp={(e) => e.key === "Enter" && handleUpdateBio()} ref={textRef} className={'border h-60 mt-5 w-90 rounded-3xl resize-none focus:outline-none p-5 font-semibold '} />
        </div>
        <div className={'h-full flex justify-center items-center gap-x-5'}>
          <button className={'bg-blue-900 hover:bg-blue-500 transition-all duration-300 w-40 h-10 font-bold rounded-3xl text-white '}>Add / Update</button>
          <button className={'bg-red-900 hover:bg-red-500 transition-all duration-300 w-40 h-10 font-bold rounded-3xl text-white '} onClick={() => setIsCaptionCardVisible(false)}>Cancel</button>
        </div>
      </motion.div>
    </div>
  )
}