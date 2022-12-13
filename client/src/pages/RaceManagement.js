import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RaceCard from "../components/RaceCard";
import { GetUserRaces } from "../services/RaceServices";

const RaceManagement = ({ user, userRaces, authenticated }) => {
  const navigate = useNavigate();
  const [races, updateRaces] = useState([]);
  const [needUpdate, toggleNeedUpdate] = useState(false);

  const handleCreateNewRace = () => {
    navigate("/races/new");
  };

  if (!authenticated) {
    navigate("/welcome");
  }

  // run when update needed
  useEffect(() => {
    if (userRaces && needUpdate) {
      updateRaces(userRaces);
    }
  }, [needUpdate]);

  // initialize when load
  useEffect(() => {
    if (userRaces) {
      updateRaces(userRaces);
    }
  }, []);

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
