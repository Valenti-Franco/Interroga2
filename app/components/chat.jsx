"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
// import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
// import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
// import ButtonChat from "./ButtonChat";
// import useStore from "@/app/ChatContext";
const Chat = () => {
  // const { isChat, setIsChat } = useStore();
  // const { theme, setTheme } = useTheme("dark");
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    // Función que se ejecutará al cargar la página y cuando cambie el tamaño de la ventana

    const handleResize = () => {
      // Verificar el ancho de la pantalla
      const screenWidth = window.innerWidth;

      // Actualizar el estado de isChat según el ancho de la pantalla
      if (screenWidth < 1280 && !document.activeElement.matches("form")) {
        if (!isMobile) {
          setisMobile(true);
        }
      }
    };

    // Agregar un listener para el evento resize
    window.addEventListener("resize", handleResize);

    // Llamada inicial para establecer el estado inicial
    handleResize();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // const { data: session, status } = useSession();
  // const socket = io("http://localhost:5000");
  const socket = useRef(null);
  const [lastMessages, setLastMessages] = useState(false);
  const [countUser, setcountUser] = useState(0);
  useEffect(() => {
    socket.current = io("https://fast-judicious-fight.glitch.me/");
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

  const [user, setuser] = useState(false);
  const [messages, setMessages] = useState([]);

  const getUser = async () => {
    try {
      const dataUser = await axios.post(`/api/player/getByEmail`, {
        email: session.user.email,
      });

      setuser(dataUser.data);

      // console.log(dataUser.data);
    } catch (error) {
      console.log("no se pudo");
    }
  };

  // async function socketInitializer() {
  //   socket.on("connect", () => {
  //     console.log(socket.io);
  //   });

  //   socket.on("Menssage-recibe", (message) => {
  //     console.log(message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }
  const [newMessage, setNewMessage] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      socket.current.emit("MenssageNew", { user, newMessage });
    }
    // else if (!session?.user?.email) {
    //   signIn();
    // }
    setNewMessage("");
  };
  const ref = useRef(null);
  useEffect(() => {
    if (messages.length) {
      if (lastMessages?.obj?.user?.data?._id === user?.data?._id) {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }
  }, [messages.length]);

  const containerRef = useRef(null);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 15 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.6 }}
          className="h-dvh w-[calc(100vw-4rem)] z-20 absolute xl:sticky xl:w-full "
        >
          <div
            // style={{
            //   background: theme === "light" ? "#fff" : "#222",
            //   color: theme === "light" ? "#000" : "#fff",
            // }}
            class=" bottom-[calc(4rem+1.5rem)]  text-gray-800 vh:h-3/4 h-dvh  right-0 xl:mr-4  p-6 rounded-lg border border-[#e5e7eb] "
          >
            <div className="block  xl:hidden   absolute  right-10">
              <Button
                onClick={() => setIsChat(!isChat)}
                isIconOnly
                color="danger"
                aria-label="Like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-back"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                </svg>
              </Button>
            </div>
            <div class="flex flex-col space-y-1.5 pb-6">
              <p class="font-semibold flex gap-4 text-lg tracking-tight">
                Chat Online{" "}
                <span class="flex items-center text-sm  gap-2 leading-3">
                  {" "}
                  <svg
                    className="w-6"
                    fill="#8bc34a"
                    viewBox="0 -2.2 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="Layer_2" data-name="Layer 2">
                        {" "}
                        <g id="Layer_1-2" data-name="Layer 1">
                          {" "}
                          <path d="M8,7.8a2,2,0,1,1,2-2A2,2,0,0,1,8,7.8Zm0-3a1,1,0,1,0,1,1A1,1,0,0,0,8,4.8Zm5.66,6.66a8,8,0,0,0,0-11.31.5.5,0,0,0-.71,0,.48.48,0,0,0,0,.7,7,7,0,0,1,0,9.9.5.5,0,0,0,0,.71.49.49,0,0,0,.35.15A.51.51,0,0,0,13.66,11.46ZM11.54,9.34a5,5,0,0,0,0-7.07.5.5,0,0,0-.71,0,.48.48,0,0,0,0,.7,4,4,0,0,1,0,5.66.5.5,0,0,0,0,.71.49.49,0,0,0,.35.15A.51.51,0,0,0,11.54,9.34Zm-6.37,0a.5.5,0,0,0,0-.71A4,4,0,0,1,5.17,3a.48.48,0,0,0,0-.7.5.5,0,0,0-.71,0,5,5,0,0,0,0,7.07.51.51,0,0,0,.36.15A.49.49,0,0,0,5.17,9.34ZM3.05,11.46a.5.5,0,0,0,0-.71,7,7,0,0,1,0-9.9.48.48,0,0,0,0-.7.5.5,0,0,0-.71,0,8,8,0,0,0,0,11.31.51.51,0,0,0,.36.15A.49.49,0,0,0,3.05,11.46Z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <b className="">{countUser}</b>
                </span>
              </p>
            </div>

            <div
              ref={containerRef}
              id="div"
              class="xl:pr-4 flex flex-col h-3/4 overflow-auto"
            >
              {messages.map((message, index) =>
                message.obj.user.data?._id === user.data?._id ? (
                  <div key={index} class="flex justify-end mb-4">
                    <div class="ml-2 py-3 px-4 text-right  max-w-52 bg-sky-500 rounded-bl-3xl rounded-br-3xl rounded-tl-xl text-white  break-words">
                      <span class="block font-extrabold text-right ">
                        {message.obj.user.data?.name}{" "}
                      </span>
                      {message.obj.newMessage}
                      <p className="text-xs text-gray-200">{message.time}</p>
                    </div>

                    {/* <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <Image
                        alt="imagen de Perfil"
                        className=" object-cover"
                        width={100}
                        height={100}
                        src={message.obj.user.data?.url}
                      />
                    </span> */}
                  </div>
                ) : (
                  // <div
                  //   key={index}
                  //   class="flex flex-row-reverse gap-3 my-4 self-end justify-self-end text-right  text-gray-600 text-sm flex-1"
                  // >
                  //   <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  //     <Image
                  //       alt="imagen de Perfil"
                  //       className=" object-cover"
                  //       width={100}
                  //       height={100}
                  //       src={message.obj.user.data.url}
                  //     />
                  //   </span>
                  //   <p class="leading-relaxed">
                  //     <span class="block font-bold text-gray-700">YO </span>
                  //     {message.obj.newMessage}
                  //   </p>
                  // </div>
                  <div key={index} class="flex justify-start mb-4">
                    {/* <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <Image
                        alt="imagen de Perfil"
                        className=" object-cover"
                        width={100}
                        height={100}
                        src={message.obj.user.data.url}
                      />
                    </span> */}
                    <div class="ml-2 py-3 px-4  max-w-52 bg-gray-200 rounded-br-3xl rounded-br-3xl rounded-tl-xl text-gray-800  break-words">
                      <span class="block font-bold text-gray-700">
                        {message.obj.user.data.name}{" "}
                      </span>
                      {message.obj.newMessage}
                      <p>{message.time}</p>
                    </div>
                  </div>
                )
              )}

              <div ref={ref} />
            </div>

            <div class="flex items-center pt-0">
              <form
                onSubmit={handlerSubmit}
                class="flex items-center justify-center w-full space-x-2"
              >
                <input
                  name="message"
                  onChange={(e) => setNewMessage(e.target.value)}
                  class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50  focus-visible:ring-offset-2"
                  placeholder="Type your message"
                  value={newMessage}
                />
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
                  Send
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Chat;
