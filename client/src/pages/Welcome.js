import { useNavigate } from "react-router-dom";

const Welcome = ({ authenticated }) => {
  const navigate = useNavigate();
  const handlePlayGame = () => {
    if (authenticated) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };
  let toRender = (
    <div className="title-wrapper">
      <div className="margin-10">Welcome to Battleship Chaos</div>
      <div className="margin-10">
        <img
          className="bc-logo border-radius-20"
          src="BattleshipChaos.jpg"
        ></img>
      </div>
      <button className="margin-10 border-radius-20" onClick={handlePlayGame}>
        Play Game
      </button>
    </div>
  );
  return toRender;
};

export default Welcome;
