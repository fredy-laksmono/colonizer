import "../styles/game.css";
import GameNav from "../components/GameNav";
import { useState } from "react";
import GameBoard from "../components/GameBoard";

const Game = ({ socket }) => {
  const [playersNumber, setPlayersNumber] = useState(2);
  const [player, setPlayer] = useState("1");
  const [gameState, updateGameState] = useState({
    post11: {
      type: "none",
      owner: "none",
      units: 0
    },
    post12: {
      type: "none",
      owner: "none",
      units: 0
    },
    post13: {
      type: "flag",
      owner: "none",
      units: 0
    },
    post14: {
      type: "none",
      owner: "none",
      units: 0
    },
    post15: {
      type: "none",
      owner: "none",
      units: 0
    },
    post21: {
      type: "none",
      owner: "none",
      units: 0
    },
    post22: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post23: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post24: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post25: {
      type: "none",
      owner: "none",
      units: 0
    },
    post31: {
      type: "base",
      owner: "p1",
      units: 1
    },
    post32: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post33: {
      type: "flag",
      owner: "none",
      units: 0
    },
    post34: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post35: {
      type: "base",
      owner: "p2",
      units: 1
    },
    post41: {
      type: "none",
      owner: "none",
      units: 0
    },
    post42: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post43: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post44: {
      type: "planet",
      owner: "none",
      units: 0
    },
    post45: {
      type: "none",
      owner: "none",
      units: 0
    },
    post51: {
      type: "none",
      owner: "none",
      units: 0
    },
    post52: {
      type: "none",
      owner: "none",
      units: 0
    },
    post53: {
      type: "flag",
      owner: "none",
      units: 0
    },
    post54: {
      type: "none",
      owner: "none",
      units: 0
    },
    post55: {
      type: "none",
      owner: "none",
      units: 0
    }
  });
  let gameWrapperRender = (
    <div>
      <div>The Game</div>
      <GameNav setPlayersNumber={setPlayersNumber} setPlayer={setPlayer} />
      <div id="gameWrapper">
        <div>Game Board</div>
        <GameBoard
          socket={socket}
          playersNumber={playersNumber}
          player={player}
          gameState={gameState}
        />
      </div>
    </div>
  );
  let toRender = (
    <div>
      <div>Game Screen</div>
      {gameWrapperRender}
    </div>
  );
  return toRender;
};

export default Game;
