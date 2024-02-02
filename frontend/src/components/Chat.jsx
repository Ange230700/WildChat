import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`); // Backend URL

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat([...chat, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div>
      <ul id="messages">
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li> // eslint-disable-line
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
