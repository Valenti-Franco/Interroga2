import { User } from "@nextui-org/react";
import React from "react";
import CountUp from "react-countup";

const Users = ({ player1, player2, name }) => {
  const truncateName = (name) => {
    if (name.length > 10) {
      return name.substring(0, 10) + "...";
    }
    return name;
  };

  return (
    <div className="container absolute  h-20 ">
      <div className="flex justify-between items-center h-full">
        <div className="flex w-2/5 md:w-1/4 justify-center   items-center p-4">
          {player1 && (
            <>
              <div className="flex flex-col mx-5   items-center">
                {name === player1.name ? (
                  <User
                    className="bg-slate-900 border  p-2  items-center"
                    name={truncateName(player1.name)}
                    description="YOU"
                    avatarProps={{
                      src: "",
                    }}
                  />
                ) : (
                  <User
                    className="bg-slate-600 p-2  items-center"
                    name={truncateName(player1.name)}
                    description="Rival"
                    avatarProps={{
                      src: "",
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col  bg-slate-700 rounded-full p-4  items-center">
                <h1 className="text-white ">
                  <CountUp end={player1.score} duration={4.5} />
                </h1>
              </div>
            </>
          )}
        </div>
        <div className="flex w-2/5 md:w-1/4 justify-center   items-center p-4">
          {player2 && (
            <>
              <div className="flex flex-col  bg-slate-700 rounded-full p-4  items-center">
                <h1 className="text-white ">
                  <CountUp end={player2.score} duration={4.5} />
                </h1>
              </div>
              <div className="flex flex-col mx-5   items-center">
                {name === player2.name ? (
                  <User
                    className="bg-slate-900  p-2  border items-center"
                    name={truncateName(player2.name)}
                    description="YOU"
                    avatarProps={{
                      src: "",
                    }}
                  />
                ) : (
                  <User
                    className="bg-slate-600 p-2  items-center"
                    name={truncateName(player2.name)}
                    description="Rival"
                    avatarProps={{
                      src: "",
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
