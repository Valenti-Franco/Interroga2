"use client";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Lobby = () => {
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const socket = useRef(null);
  const [userCount, setcountUser] = useState(0);

  useEffect(() => {
    socket.current = io("https://available-best-bison.glitch.me");
    // console.log("se conecta?");
    // Set up event listeners
    socket.current.on("connect", () => {
      // console.log(socket.current.io);
    });
    socket.current.on("userCount", (count) => {
      // console.log("count", count);
      setcountUser(count);
    });

    socket.current.on("Menssage-recibe", (message) => {
      // console.log(message);
      setcountUser(message.countUser);
      setMessages((prevMessages) => [...prevMessages, message]);
      setLastMessages(message);
    });

    return () => {
      // Clean up socket connection when component unmounts
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  return (
    <div>
      {userCount > 0 ? (
        <div>
          <h1>Usuarios conectados: {userCount}</h1>
          <h2>Ultimo mensaje: {lastMessages.message}</h2>
        </div>
      ) : (
        <h1>Esperando usuarios...</h1>
      )}
    </div>
  );
};

export default Lobby;
