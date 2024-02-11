import React from "react";
import Users from "./User";
import Quests from "./Quests";
import Result from "./Result";

const Game = ({ player1, player2, name, quests, round, final }) => {
  return (
    <div className=" flex justify-center h-dvh">
      <Users
        round={round}
        final={final}
        name={name}
        player1={player1}
        player2={player2}
      />
      {!final ? (
        <Quests round={round} name={name} final={final} quests={quests} />
      ) : (
        <Result player1={player1} player2={player2} name={name} />
      )}
    </div>
  );
};

export default Game;
