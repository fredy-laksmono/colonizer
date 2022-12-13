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
    <div>
      <div>Welcome to Colonizer</div>
      <div>Video</div>
      <button onClick={handlePlayGame}>Play Game</button>
    </div>
  );
  return toRender;
};

export default Welcome;
