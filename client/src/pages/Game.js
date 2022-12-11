import "../styles/game.css";
import GameNav from "../components/GameNav";
import { useState } from "react";
import GameBoard from "../components/GameBoard";

const Game = ({ socket }) => {
  const [playersNumber, setPlayersNumber] = useState(2);
  const [player, setPlayer] = useState("1");
  const [gameState, updateGameState] = useState({
    planet: {
      1: {
        1: {
          type: "none",
          owner: "none",
          units: 0
        },
        2: {
          type: "none",
          owner: "none",
          units: 0
        },
        3: {
          type: "flag",
          owner: "none",
          units: 0
        },
        4: {
          type: "none",
          owner: "none",
          units: 0
        },
        5: {
          type: "none",
          owner: "none",
          units: 0
        }
      },
      2: {
        1: {
          type: "none",
          owner: "none",
          units: 0
        },
        2: {
          type: "planet",
          owner: "none",
          units: 0
        },
        3: {
          type: "planet",
          owner: "none",
          units: 0
        },
        4: {
          type: "planet",
          owner: "none",
          units: 0
        },
        5: {
          type: "none",
          owner: "none",
          units: 0
        }
      },
      3: {
        1: {
          type: "base",
          owner: "none",
          units: 0
        },
        2: {
          type: "planet",
          owner: "none",
          units: 0
        },
        3: {
          type: "flag",
          owner: "none",
          units: 0
        },
        4: {
          type: "planet",
          owner: "none",
          units: 0
        },
        5: {
          type: "base",
          owner: "none",
          units: 0
        }
      },
      4: {
        1: {
          type: "none",
          owner: "none",
          units: 0
        },
        2: {
          type: "planet",
          owner: "none",
          units: 0
        },
        3: {
          type: "planet",
          owner: "none",
          units: 0
        },
        4: {
          type: "planet",
          owner: "none",
          units: 0
        },
        5: {
          type: "none",
          owner: "none",
          units: 0
        }
      },
      5: {
        1: {
          type: "none",
          owner: "none",
          units: 0
        },
        2: {
          type: "none",
          owner: "none",
          units: 0
        },
        3: {
          type: "flag",
          owner: "none",
          units: 0
        },
        4: {
          type: "none",
          owner: "none",
          units: 0
        },
        5: {
          type: "none",
          owner: "none",
          units: 0
        }
      }
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
          updateGameState={updateGameState}
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
