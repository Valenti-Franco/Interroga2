import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Confetti from "react-confetti";

const Result = ({ player1, player2, name }) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col justify-center items-center h-dvh w-full"
      >
        {player1.score > player2.score && player1.name === name ? (
          <Confetti width={width} height={height} />
        ) : player2.score > player1.score && player2.name === name ? (
          <Confetti width={width} height={height} />
        ) : (
          <></>
        )}
        <h1 className="m-3 text-3xl">END</h1>
        {player1.score > player2.score ? (
          <>
            <h2>WIN</h2>
            <motion.h1
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className=" font-extrabold  text-5xl"
            >
              {player1.name}{" "}
            </motion.h1>
            <h3 className=" font-extrabold  text-3xl">
              {" "}
              {player1.score} - {player2.score}
            </h3>
          </>
        ) : player1.score < player2.score ? (
          <>
            <h2>WIN</h2>

            <motion.h1
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className=" font-extrabold  text-5xl"
            >
              {player2.name}{" "}
            </motion.h1>
            <h3 className=" font-extrabold  text-3xl">
              {" "}
              {player1.score} - {player2.score}
            </h3>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center p-2">
            <h1 className=" font-extrabold  text-5xl">DRAW</h1>
            {player1.score} - {player2.score}
          </div>
        )}
        <Link href="/">
          <Button className="m-4" color="primary" variant="shadow">
            Try Again
          </Button>
        </Link>
      </motion.div>
      {/* se verifica si name es igual al jugador ganador con mas score sea igual al name */}
    </>
  );
};

export default Result;
