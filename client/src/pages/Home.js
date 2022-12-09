import { useEffect, useState } from "react";

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

  const handleButtonUpdate = (e) => {
    toggleButtonStatus({
      ...buttonStatus,
      [e.target.id]: !buttonStatus[e.target.id]
    });
  };

  useEffect(() => {
    socket.emit("Update Button", buttonStatus);
  }, buttonStatus);

  let createRoomRender = (
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
  );
  let toRender = <div>{createRoomRender}</div>;
  return toRender;
};

export default Home;
