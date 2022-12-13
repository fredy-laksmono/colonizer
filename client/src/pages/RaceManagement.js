import { useNavigate } from "react-router-dom";
import RaceCard from "../components/RaceCard";

const RaceManagement = ({ userRaces }) => {
  const navigate = useNavigate();

  if (userRaces) {
    console.log("user race", userRaces);
  }

  const handleCreateNewRace = () => {
    navigate("/races/new");
  };
  let raceListRender = (
    <div>
      {userRaces ? (
        <div>
          {userRaces.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
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
