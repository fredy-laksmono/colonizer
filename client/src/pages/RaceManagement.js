import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RaceCard from "../components/RaceCard";
import { GetUserRaces } from "../services/RaceServices";

const RaceManagement = ({ user, userRaces, authenticated }) => {
  const navigate = useNavigate();
  const [races, updateRaces] = useState([]);
  const [needUpdate, toggleNeedUpdate] = useState(false);
  const [needCheckSession, toggleNeedCheckSession] = useState(false);

  const checkForSession = () => {
    if (!user) {
      navigate("/signin");
    } else {
      toggleNeedCheckSession(false);
    }
  };
  if (!authenticated) {
    setTimeout(() => {
      toggleNeedCheckSession(true);
    }, 5000);
  }

  const handleCreateNewRace = () => {
    navigate("/races/new");
  };

  const triggerUpdate = () => {
    toggleNeedUpdate(true);
  };

  // check for session
  useEffect(() => {
    if (needCheckSession) {
      checkForSession();
    }
  }, [needCheckSession]);

  // run when update needed
  useEffect(() => {
    if (userRaces && needUpdate) {
      updateRaces(userRaces);
      toggleNeedUpdate(false);
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
            <RaceCard key={race.id} race={race} needUpdate={triggerUpdate} />
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
  let toRender = (
    <div>
      {!authenticated ? (
        <div>
          Checking for login data.. You will be forwarded to login page if no
          session found.
        </div>
      ) : (
        <div>
          <div>Manage your race</div>
          {raceListRender}
          <button onClick={handleCreateNewRace}>Create new race</button>
        </div>
      )}
    </div>
  );
  return toRender;
};

export default RaceManagement;
