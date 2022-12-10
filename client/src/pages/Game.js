import "../styles/game.css";
import GameNav from "../components/GameNav";
import { useState } from "react";
import GameBoard from "../components/GameBoard";

const Game = () => {
  const [playerNumber, setPlayerNumber] = useState(3);
  let gameWrapperRender = (
    <div>
      <div>The Game</div>
      <GameNav setPlayerNumber={setPlayerNumber} />
      <div id="gameWrapper">
        <div>Game Board</div>
        <GameBoard playerNumber={playerNumber} />
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
