import "../styles/game.css";
import GameNav from "../components/GameNav";
import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";

const Game = ({ socket, isHost, isRunCounter }) => {
  const [p1Counter, updatep1Counter] = useState(10);
  const [p2Counter, updatep2Counter] = useState(10);
  const [playersNumber, setPlayersNumber] = useState(2);
  const [player, setPlayer] = useState("p1");
  const [gameState, updateGameState] = useState({
    1: {
      1: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      2: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      3: {
        type: "flag",
        owner: "neutral",
        units: 0
      },
      4: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      5: {
        type: "none",
        owner: "neutral",
        units: 0
      }
    },
    2: {
      1: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      2: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      3: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      4: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      5: {
        type: "none",
        owner: "neutral",
        units: 0
      }
    },
    3: {
      1: {
        type: "base",
        owner: "p1",
        units: p1Counter
      },
      2: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      3: {
        type: "flag",
        owner: "neutral",
        units: 0
      },
      4: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      5: {
        type: "base",
        owner: "p2",
        units: p2Counter
      }
    },
    4: {
      1: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      2: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      3: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      4: {
        type: "planet",
        owner: "neutral",
        units: 0
      },
      5: {
        type: "none",
        owner: "neutral",
        units: 0
      }
    },
    5: {
      1: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      2: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      3: {
        type: "flag",
        owner: "neutral",
        units: 0
      },
      4: {
        type: "none",
        owner: "neutral",
        units: 0
      },
      5: {
        type: "none",
        owner: "neutral",
        units: 0
      }
    }
  });

  // triggered when player update a planet
  useEffect(() => {
    socket.on("planet_update", (data) => {
      updateGameState({
        ...gameState,
        [data.x]: {
          ...gameState[data.x],
          [data.y]: { ...gameState[data.x][data.y], owner: data.player }
        }
      });
    });
  });

  // game state to pause/run
  console.log("isRunCounter", isRunCounter);
  useEffect(() => {
    console.log("use effect isRunCounter", isRunCounter);
    if (isRunCounter) {
      const baseCounter = setInterval(() => {
        updatep1Counter((prev1) => prev1 + 1);
        updatep2Counter((prev2) => prev2 + 1);
      }, 1000);

      return () => {
        clearInterval(baseCounter);
      };
    }
    socket.on("game_sync_update", (data) => {
      updateGameState(data.gameState);
    });
  }, [isRunCounter]);

  // triggered gameState update
  useEffect(() => {
    updateGameState({
      ...gameState,
      [3]: {
        ...gameState[3],
        [1]: { ...gameState[3][1], units: p1Counter },
        [5]: { ...gameState[3][5], units: p2Counter }
      }
    });
    if (isHost) {
      socket.emit("game_sync_update", gameState);
    }
  }, [p1Counter]);

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
