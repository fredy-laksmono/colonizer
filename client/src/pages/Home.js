import { useEffect, useState } from "react";
import Game from "./Game";

const Home = ({ socket }) => {
  const [buttonStatus, toggleButtonStatus] = useState({
    but1: false,
    but2: false,
    but3: false,
    but4: false,
    but5: false,
    but6: false,
    but7: false,
    but8: false,
    but9: false
  });

  const [isRunCounter, updateIsRunCounter] = useState(false);

  const [counter, updateCounter] = useState(0);

  const [isHost, updateHost] = useState(false);

  const [isNewUpdate, updateIsNewUpdate] = useState(false);

  const handleButtonUpdate = (e) => {
    toggleButtonStatus({
      ...buttonStatus,
      [e.target.id]: !buttonStatus[e.target.id]
    });
    updateIsNewUpdate(true);
  };

  const toggleHost = () => {
    updateHost(!isHost);
    socket.emit("host_change", isHost);
    socket.emit("update_button", buttonStatus);
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
      socket.emit("update_button", buttonStatus);
    }
  }, [buttonStatus]);

  useEffect(() => {
    if (isHost) {
      socket.emit("send_counter", counter);
    }
  }, [counter]);

  useEffect(() => {
    socket.on("receive_button_update", (data) => {
      toggleButtonStatus(data);
    });
    socket.on("change_host", (data) => {
      removeHost();
    });
    socket.on("receive_counter", (data) => {
      updateCounter(data);
      updateIsRunCounter(false);
    });
  }, [socket]);

  useEffect(() => {
    if (isNewUpdate) {
      socket.emit("update_button", buttonStatus);
      updateIsNewUpdate(false);
    }
  }, [isNewUpdate]);

  let createRoomRender = (
    <div>
      <div>
        <button id="but1" onClick={handleButtonUpdate}>
          {buttonStatus["but1"] ? "On" : "Off"}
        </button>
        <button id="but2" onClick={handleButtonUpdate}>
          {buttonStatus["but2"] ? "On" : "Off"}
        </button>
        <button id="but3" onClick={handleButtonUpdate}>
          {buttonStatus["but3"] ? "On" : "Off"}
        </button>
        <button id="but4" onClick={handleButtonUpdate}>
          {buttonStatus["but4"] ? "On" : "Off"}
        </button>
        <button id="but5" onClick={handleButtonUpdate}>
          {buttonStatus["but5"] ? "On" : "Off"}
        </button>
        <button id="but6" onClick={handleButtonUpdate}>
          {buttonStatus["but6"] ? "On" : "Off"}
        </button>
        <button id="but7" onClick={handleButtonUpdate}>
          {buttonStatus["but7"] ? "On" : "Off"}
        </button>
        <button id="but8" onClick={handleButtonUpdate}>
          {buttonStatus["but8"] ? "On" : "Off"}
        </button>
        <button id="but9" onClick={handleButtonUpdate}>
          {buttonStatus["but9"] ? "On" : "Off"}
        </button>
      </div>
      <div>
        <button onClick={toggleHost}>{isHost ? "Host" : "Make host"}</button>
      </div>
      <div>
        <label>{counter}</label>
      </div>
      <div>
        <button onClick={startCounter}>Start Counter</button>
      </div>
      <div>
        <button onClick={stopCounter}>Stop Counter</button>
      </div>
      <div>
        <button onClick={resetCounter}>Reset Counter</button>
      </div>
    </div>
  );

  let toRender = (
    <div>
      <div>{createRoomRender}</div>
      <Game />
    </div>
  );
  return toRender;
};

export default Home;
