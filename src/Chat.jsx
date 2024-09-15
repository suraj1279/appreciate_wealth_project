import React from "react";
import { RiMessageLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Chat() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e === "click") navigate("/Chatbot");
  };
  return (
    <>
    <div className="w-full h-[100vh] flex justify-center items-center">
    <div className="w-full sm:w-[60%] md:w-[50%] h-[73%] border border-black flex flex-col justify-center items-start p-4 rounded-[5%]">
        <RiMessageLine className="text-[30px] text-violet-500" />
        <h1 className="text-[40px]">Hello</h1>
        <h2 className="text-[40px] font-bold text-violet-500 font-Dosis">
          Chat
        </h2>
        <p>This last chat app you'll ever need.</p>
        <button
          onClick={() => handleClick("click")}
          className="mt-4 border border-white text-gray-600 rounded-lg px-6 py-1 font-bold hover:bg-gray-800 transition duration-300"
        >
          Click
        </button>
      </div>
    </div>
      
    </>
  );
}

export default Chat;