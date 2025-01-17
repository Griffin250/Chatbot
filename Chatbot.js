import {
  faClose,
  faMinus,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatAi from "./ChatAi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    AOS.init({
      duration:3000,
      once:false,
    });
  }, []);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-14 right-8 z-50">
      {/* Chatbot Popup */}
      {isOpen && (
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-80 h-auto border border-orange-500" data-aos="fade-left" data-aos-duration="2000">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl text-white text-center m-auto">
              SAM-IT AI Bot
            </h2>
            <button
              onClick={toggleChat}
              className="text-gray-900 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={faMinus}
                className="h-6 w-6 text-orange-700 px-2"
                title="Minimize Chat Window"
              />
              <FontAwesomeIcon
                icon={faClose}
                className="h-6 w-6 text-orange-700 px-2"
                title="End Chat"
              />
            </button>
          </div>

          <div className="mt-4 overflow-y-auto h-80">
            <p className="text-sm text-white">
              Hello! How can I assist you today?
            </p>
            {/* <p className='mt-4 overflow-y-auto p-4 rounded-t-3xl bg-gray-200'> Thank you for contacting GriffinTechs. 
              By continuing you agree to our privacy policy <a href='#privacy' className='text-blue-400'>https://newfold.com/privacy-center </a> </p>*/}
            {/* Chat messages would go here */}
            <ChatAi/>
          </div>

         
          <div className="relative flex items-center w-full">
             {/* ...............Send Button 
            <form method="get" className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 pr-14 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
             
              <button
                className="absolute right-0 h-full px-4 text-orange-600 flex items-center justify-center"
                type="submit"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="h-6 w-6"
                  title="Ask AI"
                />
              </button>
            </form> ...................*/}
          </div>
          <p className="text-white">
            Your use of this Chatbot is governed by this{" "}
            <a href="#discalimer" className="text-blue-400">
              {" "}
              disclaimer.{" "}
            </a>
          </p>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="bg-orange-700 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none"
        data-aos="fade-up" data-aos-duration="3000">
          <FontAwesomeIcon icon={faRobot} className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
