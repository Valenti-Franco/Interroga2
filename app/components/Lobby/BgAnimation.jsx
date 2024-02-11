"use client";
import React, { useState, useEffect } from "react";
// Importa tus iconos aquí
import style from "./index.module.css";
import VideoGame from "../icons/VideoGame";
import { AnimatePresence, motion } from "framer-motion";
import World from "../icons/World";
import Movie from "../icons/Movie";
import Art from "../icons/Art";
import Ship from "../icons/Ship";
import Football from "../icons/Football";

// import OtherIcon from './icons/OtherIcon';
// ...

// Añade tus iconos a este array

const BgAnimation = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const icons = [
    <VideoGame key="videoGame" />,
    <World key="world" />,
    <Movie key="movie" />,
    <Art key="art" />,
    <Ship key="ship" />,
    <Football key="football" />,
  ];
  const [num, setNum] = useState(Math.floor(Math.random() * icons.length));
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const interval = setInterval(() => {
      setNum(Math.random());
    }, 10000);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const elements = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    x: Math.random() * width + num,
    y: Math.random() * height + num,
    icon: icons[Math.floor(Math.random() * icons.length)],
  }));

  return (
    <div>
      <AnimatePresence>
        {elements.map(({ id, x, y, icon }, index) => {
          return index % 2 === 0 ? (
            <motion.div
              initial={{ opacity: 1, scale: 1, x: "0vw", y: "-100vh" }}
              animate={{ opacity: 1, scale: 3, x: "20vw", y: "100vh" }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatDelay: 0,
              }}
              key={id}
              style={{
                position: "absolute",
                left: x,
                top: y,
              }}
              // className="w-10 h-10 z-[-1]"
              className={`${style.icon} w-5 h-5 z-[-1]`}
            >
              {icon}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 3, y: -360 }}
              exit={{ scale: 0, y: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
              key={id}
              style={{
                position: "absolute",
                left: x,
                top: y,
              }}
              // className="w-10 h-10 z-[-1]"
              className={`${style.icon} w-5 h-5 z-[-1]`}
            >
              {icon}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default BgAnimation;
