"use client";
import { Button, Input, Spinner } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import Game from "../game/Game";
import { io } from "socket.io-client";
import { SocketContext } from "@/app/SocketContext";
import VideoGame from "../icons/VideoGame";
import BgAnimation from "./BgAnimation";
import Image from "next/image";
let socket;

const Enter = () => {
  const [name, setname] = useState("");
  const [players, setPlayers] = useState([]);
  const [quests, setQuests] = useState([]);
  const [round, setRound] = useState(0);
  const [final, setFinal] = useState(false);
  //loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // socket = io("https://endurable-saber-bee.glitch.me");

    socket = io("https://available-best-bison.glitch.me");

    socket.on("find", (e) => {
      setQuests(e.quests);
      setPlayers(e.lobbies);
      setFinal(e.final);
      setLoading(false);
    });
  }, []);

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (name !== "") {
      socket.emit("find", { name: name });
      setLoading(true);
    }
  };

  return (
    <SocketContext.Provider value={socket}>
      {players.length === 0 ? (
        loading ? (
          <div class="flex items-center flex-col w-full  text-white justify-center min-h-screen">
            <div class="flex items-center justify-center w-full  p-5 ">
              <div class="fixed top-0 right-0 h-screen w-full z-50 flex justify-center items-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
              </div>
              <div class="fixed top-0 right-0 h-screen w-full z-50 flex justify-center items-center">
                <div class=" animate-spinner-ease-spin rounded-full  h-40 w-40 border-t-2 border-b-2 border-gray-200"></div>
              </div>
            </div>
            <div className="flex absolute  flex-col">
              <p>Waiting Player</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-evenly h-dvh  w-full p-4   items-center">
              <div className=" flex flex-col justify-center items-center">
                <h1 className="text-2xl  w-full p-4  text-white text-center font-bold">
                  InterrogaDos
                </h1>
                <Image
                  className="flex justify-center w-1/2 md:w-full"
                  width={380}
                  height={380}
                  alt="InterrogaDos"
                  src="/logoP2.webp"
                />
              </div>
              <form
                onSubmit={(e) => handleJoinGame(e)}
                className="flex flex-col  text-black items-center justify-center "
              >
                <label className="text-1xl text-center uppercase font-bold text-white ">
                  Insert you Username:
                  <Input
                    value={name}
                    variant="faded"
                    className="w-60 p-2 m-2 text-black font-bold text-center  rounded-md"
                    onChange={(e) => setname(e.target.value)}
                    size={"xl"}
                    type="text"
                    // label="Username"
                  />
                </label>

                <Button
                  type="submit"
                  className="w-60 p-2 m-2 text-center border-2 border-gray-400 rounded-md"
                  color="secondary"
                  size="small"
                >
                  Search Game
                </Button>
              </form>
            </div>
          </>
        )
      ) : (
        <Game
          round={round}
          final={final}
          name={name}
          quests={quests}
          player1={players[0].players[0]}
          player2={players[0].players[1]}
        />
      )}
    </SocketContext.Provider>
  );
};

export default Enter;
