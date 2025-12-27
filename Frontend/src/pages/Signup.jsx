import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const handleSignup = async () =>{
    const result = await axios.post("http://localhost:8000/api/v1/user/addUser",{
      username,
      email,
      password
    })
    console.log(result);
    navigate("/")
    
  }
  return (
    <div className="login bg-[url(public/Nature.jpg)] bg-cover bg-center flex h-screen w-screen justify-center items-center">
      <div className="login-card backdrop-blur-lg w-130 h-150 shadow-lg shadow-black border-white p-5 justify-center items-center rounded-[50px]">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl mt-10 mb-10 font-black text-white">Signup</h1>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-center items-center mt-5 w-full">
            <input
              type="text"
              className="border-b-2 focus:outline-none p-3 text-2xl text-white font-semibold  w-80 placeholder:text-[20px] border-white placeholder:text-white/70"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-5 w-full">
            <input
              type="text"
              className="border-b-2 focus:outline-none p-3 text-2xl text-white font-semibold  w-80 placeholder:text-[20px] border-white placeholder:text-white/70"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-5 w-full">
            <input
              type="password"
              className="border-b-2 focus:outline-none p-3 text-2xl text-white font-semibold w-80 placeholder:text-[20px] border-white placeholder:text-white/70"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-5">
            <button onClick={handleSignup} className="border p-2 w-50 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300">
              Signup
            </button>
          </div>
          <div className="flex justify-center items-center mt-3">
            <p className="text-white text-[17px]">
              Already have an account ? 
              <Link className="text-purple-300 font-bold ml-2" to={"/"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
