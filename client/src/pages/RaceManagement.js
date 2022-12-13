import { useNavigate } from "react-router-dom";

const RaceManagement = () => {
  const navigate = useNavigate();

  const handleCreateNewRace = () => {
    navigate("/races/new");
  };
  let raceListRender = (
    <div>
      <div>Race List</div>
      <div>Race a</div>
    </div>
  );
  let toRender = (
    <div>
      <div>Manage your race</div>
      {raceListRender}
      <button onClick={handleCreateNewRace}>Create new race</button>
    </div>
  );
  return toRender;
};

export default RaceManagement;
