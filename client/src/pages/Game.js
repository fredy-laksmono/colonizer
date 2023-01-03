import "../styles/game.css";
import GameNav from "../components/GameNav";
import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import BattleshipBoard from "../components/BattleshipBoard";
import PlayerLobbyCard from "../components/PlayerLobbyCard";

const Game = ({ socket, isHost, isRunCounter, user }) => {
  const [playerList, updatePlayerList] = useState([]);
  const [p1Counter, updatep1Counter] = useState(10);
  const [p2Counter, updatep2Counter] = useState(10);
  const [serverGameTime, updateServerGameTime] = useState(0);
  const [playersNumber, setPlayersNumber] = useState(2);
  const [player, setPlayer] = useState("p1");
  const [currentPhase, setCurrentPhase] = useState("lobby");
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

  console.log("current playerList", playerList);
  socket.on("planet_update", (data) => {
    if (data.x !== 3) {
      updateGameState({
        ...gameState,
        [data.x]: {
          ...gameState[data.x],
          [data.y]: {
            ...gameState[data.x][data.y],
            owner: data.player,
            units: data.unitsToSend
          }
        },
        3: {
          ...gameState[3],
          [5]: { ...gameState[3][5], units: data.unitsLeft }
        }
      });
    } else if (data.x === 3) {
      updateGameState({
        ...gameState,
        [data.x]: {
          ...gameState[data.x],
          [data.y]: {
            ...gameState[data.x][data.y],
            owner: data.player,
            units: data.unitsToSend
          },
          [5]: { ...gameState[3][5], units: data.unitsLeft }
        }
      });
    }

    updatep2Counter(data.unitsLeft);
  });

  // game state to pause/run
  useEffect(() => {
    if (isRunCounter) {
      const baseCounter = setInterval(() => {
        updatep1Counter((prev1) => prev1 + 1);
        updatep2Counter((prev2) => prev2 + 1);
      }, 1000);

      return () => {
        clearInterval(baseCounter);
      };
    }
  }, [isRunCounter]);

  // global sync
  useEffect(() => {
    console.log("playerList outside", playerList);
    socket.on("recieve_game_state", (gameState) => {
      updateGameState(gameState);
    });
    socket.on("player_joined", (data) => {
      console.log("player joined", data);
      updatePlayerList((pList) => [
        ...pList,
        {
          name: data.name,
          id: data.id,
          email: data.email
        }
      ]);
    });

    return () => {
      socket.off("recieve_game_state");
      socket.off("player_joined");
    };
  }, [socket]);

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
  }, [p1Counter]);

  // triggered game sync
  useEffect(() => {
    if (isHost) {
      socket.emit("send_game_state", gameState);
    }
  }, [serverGameTime]);

  useEffect(() => {
    // const serverCounter = setInterval(() => {
    //   updateServerGameTime((prev) => prev + 1);
    // }, 50);

    if (isHost) {
      console.log("player become host");
      updatePlayerList([
        ...playerList,
        {
          name: user.name,
          id: user.id,
          email: user.email
        }
      ]);
    }

    // return () => {
    //   clearInterval(serverCounter);
    // };
  }, []);

  let gameWrapperRender = (
    <div>
      <div>The Game</div>
      <GameNav setPlayersNumber={setPlayersNumber} setPlayer={setPlayer} />
      <div id="gameWrapper">
        <div>Game Board</div>
        <BattleshipBoard />
      </div>
    </div>
  );

  let lobbyRender = <div>Lobby</div>;

  if (playerList.length > 0) {
    lobbyRender = (
      <div>
        <div>Lobby</div>
        {playerList.map((player) => (
          <PlayerLobbyCard player={player} />
        ))}
      </div>
    );
  }

  let toRender = <div></div>;

  if (currentPhase === "lobby") {
    toRender = lobbyRender;
  } else if (currentPhase === "setup") {
  } else if (currentPhase === "game") {
    toRender = gameWrapperRender;
  } else if (currentPhase === "end") {
  }
  return toRender;
};

export default Game;
