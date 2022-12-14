import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RaceCard from "../components/RaceCard";
import { GetUserRaces } from "../services/RaceServices";

const RaceManagement = ({ user, userRaces, authenticated }) => {
  const navigate = useNavigate();
  const [races, updateRaces] = useState([]);
  const [needUpdate, toggleNeedUpdate] = useState(true);
  const [needCheckSession, toggleNeedCheckSession] = useState(false);
  console.log("needUpdate = ", needUpdate);

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
    console.log("triggerUpdate");
    toggleNeedUpdate(true);
  };

  // check for session
  useEffect(() => {
    if (needCheckSession) {
      checkForSession();
    }
  }, [needCheckSession]);

  useEffect(() => {
    console.log("Checking for length");
    if (races.length === 0) {
      console.log("Checking for length true");
      toggleNeedUpdate(true);
    }
  });

  // run when update needed
  useEffect(() => {
    const getUserRace = async () => {
      console.log("needUpdateUseEffect", needUpdate);
      if (needUpdate && user) {
        console.log("needUpdate Updating", needUpdate);
        let payload = await GetUserRaces(user.id);
        updateRaces(payload);
        toggleNeedUpdate(false);
      }
    };
    getUserRace();
  }, [needUpdate]);

  // initialize data
  useEffect(() => {
    console.log("initial useEffect");
    if (userRaces.length !== 0) {
      console.log("initial useEffect update");
      updateRaces(userRaces);
    }
  }, []);

  console.log("race", races);
  console.log("userRace", userRaces);
  let raceListRender = (
    <div className="race-list">
      <div></div>
      {races.length !== 0 ? (
        <div>
          {races.map((race) => (
            <RaceCard key={race.id} race={race} triggerUpdate={triggerUpdate} />
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
      <div></div>
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
