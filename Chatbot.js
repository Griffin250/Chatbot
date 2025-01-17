import React, { useState } from "react";
import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chatbot = () => {
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
        { user: "bot", text: "Sorry, something went wrong." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-md ">
      <div className="h-52 overflow-y-auto mb-4">
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
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
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
      className="flex-1 border rounded-md p-2 focus:outline-none"
    />
      <button
           type="submit"
          className="chatbot-btn bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
        >
           <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="h-4 w-4"
                  title="Ask AI"
                />
        </button>
  </div>
</form>

    </div>
    
  );
};

export default Chatbot;
