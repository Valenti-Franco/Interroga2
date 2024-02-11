"use client";

import React, { useEffect, useState } from "react";
import { SocketContext } from "@/app/SocketContext";
import { Progress } from "@nextui-org/react";
import CountUp from "react-countup";

const Quests = ({ quests, name, final }) => {
  const socket = React.useContext(SocketContext);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [round, setRound] = useState(0);
  const [resultQuest, setResultQuest] = useState(0);
  const [cont, setCont] = useState(15);
  useEffect(() => {
    const timer = setInterval(() => {
      setCont((prevCont) => prevCont - 0.1);
    }, 100);

    const interval = setInterval(() => {
      if (!final || round < 10) {
        setRound((prevRound) => prevRound + 1); // Increment round by 1
      } else {
        clearInterval(interval); // Stop the interval after 10 rounds
      }
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (round <= 10) {
      let shuffled = [...quests.results[round].incorrect_answers];
      shuffled.push(quests.results[round].correct_answer);
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      if (round !== 0) {
        socket.emit("round", { result: resultQuest, name: name, round: round });
        setSelected(null);
        setResultQuest(0);
        setCont(15);
      }
    }
  }, [round]);
  const [selected, setSelected] = useState(null);
  const handlerOption = (e) => {
    setSelected(e);
    if (quests.results[round].correct_answer === e) {
      if (quests.results[round].difficulty === "easy") {
        setResultQuest(1);
      }
      if (quests.results[round].difficulty === "medium") {
        setResultQuest(2);
      }
      if (quests.results[round].difficulty === "hard") {
        setResultQuest(3);
      }
    } else {
      setResultQuest(0);
    }
  };

  useEffect(() => {}, [final]);
  return final || round > 10 ? (
    <div className="absolute top-0 w-full pb-4 m-2   px-4 justify-center items-center flex flex-col"></div>
  ) : (
    <>
      <div className="absolute  bottom-9 md:bottom-auto md:top-0 w-full pb-4 m-2   px-4 justify-center items-center flex flex-col">
        <h1 className="text-white  text-3xl text-center bg-slate-600 p-2 rounded-2xl  ">
          <CountUp end={round + 1} start={round} duration={4.5} /> / 10
        </h1>
        <Progress
          size="xl"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-green-100 to-red-900",
            label: "tracking-wider font-medium text-default-200",
            value: "text-white",
          }}
          label="Question time"
          // value={100 - (100 / 10) * cont} esto no es para 15 segundos
          value={100 - (100 / 15) * cont}
          showValueLabel={true}
        />
      </div>
      <div className="w-full h-dvh ">
        <div className="flex w-full justify-center items-end h-full">
          <div className="flex flex-col h-3/4 justify-center  rounded-t-3xl w-full  bg-gradient-to-b from-sky-200 to-slate-900 items-center p-4">
            <div className="flex flex-col h-full justify-center items-center p-5 bg-gradient-to-b from-sky-900 to-tranparent w-full rounded-t-3xl ">
              <h1
                className="text-white m-2  font-extrabold p-2 rounded-md uppercase bg-blue-900 "
                dangerouslySetInnerHTML={{
                  __html: quests.results[round].category,
                }}
              ></h1>
              <h1
                className=" inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white   transition bg-gray-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none "
                dangerouslySetInnerHTML={{
                  __html: quests.results[round].question,
                }}
              ></h1>
            </div>

            <div className="grid h-full w-full  md:w-1/2  grid-cols-2 justify-items-center">
              {shuffledAnswers.map((e, i) => (
                <>
                  <div class="my-2 w-9/12  rounded-md   group relative inline-block overflow-hidden border border-gray-100 bg-gray-100   px-12 py-3 text-sm font-medium text-slate-800 hover:text-violet-800 focus:outline-none focus:ring active:bg-indigo-100 active:text-blue">
                    <span class="ease rounded-full absolute left-0 top-0 h-0 w-0 border-t-3 border-violet-900  transition-all duration-600 group-hover:w-full"></span>
                    <span class="ease absolute right-0 top-0 h-0 w-0 border-r-3 border-violet-900 transition-all duration-600 group-hover:h-full"></span>
                    <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-3 border-violet-900 transition-all duration-600 group-hover:w-full"></span>
                    <span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-3 border-violet-900 transition-all duration-600 group-hover:h-full"></span>
                    <button
                      key={i}
                      onClick={() => handlerOption(e)}
                      className="absolute top-0 left-0 overflow-y-auto scrollbar  scrollbar-thumb-white scrollbar-track-blue-800    w-full h-full p-2   inline-block  text-xs font-medium leading-6 text-center  uppercase transition   shadow ripple hover:shadow-lg  focus:outline-none"
                      style={{
                        color: selected === e && "white",
                        backgroundColor: selected === e && "blue",
                      }}
                      dangerouslySetInnerHTML={{ __html: e }}
                    ></button>
                  </div>
                </>
              ))}
            </div>

            <div className="flex w-full justify-center items-end h-full">
              <p>
                Difficulty:{" "}
                <b className=" uppercase">
                  {quests.results[round].difficulty}{" "}
                </b>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quests;
