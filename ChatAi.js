import React, { useState } from "react";
import axios from "axios";
import {
    faPaperPlane,
  
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ChatAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: "client", text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });
      setMessages([...newMessages, { user: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { user: "bot", text: "Sorry, This Chatbot isn't available right now, try again Later!." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto p-1 shadow-lg rounded-md">
      <div className="h-56 overflow-y-auto mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 ${
              msg.user === "client" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-2 rounded-md ${
                msg.user === "client"
                  ? "bg-blue-200 text-gray-800 text-left"
                  : "bg-gray-200 text-gray-800 text-left"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <form
  onSubmit={(e) => {
    e.preventDefault(); // Prevent default form submission
    sendMessage(); // Trigger the sendMessage function
  }} 
>
  <div className="flex items-center">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1 border rounded-md p-2 focus:outline-none focus:border-2 focus:border-orange-500"
    />
      <button
           type="submit"
          className="chatbot-btn m-auto"
        >
           <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="h-6 w-6 text-orange-600 -ml-12 hover:text-orange-700 cursor-pointer"
                  title="Ask AI"
                />
        </button>
  </div>
</form>

    </div>
  );
};

export default ChatAi;
