import Image from "next/image";
import { Button, Chip } from "@nextui-org/react";
import Lobby from "./components/Lobby";
import Chat from "./components/chat";
import Enter from "./components/Lobby/Enter";
import BgAnimation from "./components/Lobby/BgAnimation";
export default function Home() {
  return (
    <main className="bg-gradient-to-r from-slate-900 to-sky-100  m-auto  h-screen ">
      <div
        style={{ contain: "content" }}
        className="container contain m-auto" >
        <Enter />
        <BgAnimation />
      </div>
      {/* <Chat /> */}
    </main>
  );
}
