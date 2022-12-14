import { useEffect, useState } from "react";
import Game from "./Game";
import GameSetup from "../components/GameSetup";
import { useNavigate } from "react-router-dom";
import { GetUserRaces } from "../services/RaceServices";

const Home = ({ socket, authenticated, user, inGame, toggleInGame }) => {
  const [isRunCounter, updateIsRunCounter] = useState(false);
  const [counter, updateCounter] = useState(0);
  const [isHost, updateHost] = useState(false);
  const [races, updateRaces] = useState([]);
  const [raceSelected, updateRaceSelected] = useState(0);
  const [room, updateRoom] = useState("");

  const navigate = useNavigate();
  if (!authenticated) {
    navigate("/");
  }

  const toggleHost = () => {
    updateHost(!isHost);
    socket.emit("host_change", isHost);
  };

  const refreshData = async () => {
    if (user) {
      let payload = await GetUserRaces(user.id);
      updateRaces(payload);
    }
  };

  const startCounter = () => {
    updateIsRunCounter(true);
  };

  const stopCounter = () => {
    updateIsRunCounter(false);
  };

  const resetCounter = () => {
    updateCounter(0);
  };

  const removeHost = () => {
    updateHost(false);
  };

  // initialize data
  useEffect(() => {
    refreshData();
  }, [user]);

  useEffect(() => {
    if (isRunCounter) {
      const counterInterval = setInterval(() => {
        updateCounter((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(counterInterval);
      };
    }
  }, [isRunCounter]);

  useEffect(() => {
    if (isHost) {
      socket.emit("send_counter", counter);
    }
  }, [counter]);

  useEffect(() => {
    socket.on("change_host", (data) => {
      removeHost();
    });
    socket.on("receive_counter", (data) => {
      updateCounter(data);
      updateIsRunCounter(false);
    });
  }, [socket]);

  let gameTopMenuRender = (
    <div>
      <div>
        {/* <button onClick={toggleHost}>{isHost ? "Host" : "Make host"}</button> */}
        Room# {room}
      </div>
      <div>
        <label>{counter}</label>
      </div>
      <div>
        <button onClick={startCounter}>Play</button>
      </div>
      <div>
        <button onClick={stopCounter}>Pause</button>
      </div>
      <div>
        <button onClick={resetCounter}>Reset Counter</button>
      </div>
    </div>
  );

  let toRender = (
    <div>
      {inGame ? (
        <div>
          <div>{gameTopMenuRender}</div>
          <Game socket={socket} isHost={isHost} isRunCounter={isRunCounter} />
        </div>
      ) : (
        <div>
          <GameSetup
            socket={socket}
            races={races}
            raceSelected={raceSelected}
            toggleInGame={toggleInGame}
            room={room}
            updateRoom={updateRoom}
            updateRaceSelected={updateRaceSelected}
            updateHost={updateHost}
          />
        </div>
      )}
    </div>
  );
  return toRender;
};

export default Home;
