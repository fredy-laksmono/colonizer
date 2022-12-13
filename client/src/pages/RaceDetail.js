import { useState, useEffect } from "react";
import UniqueCard from "../components/UniqueCard";
import { GetUniques } from "../services/UniqueServices";

const RaceDetail = () => {
  const [raceForm, updateRaceForm] = useState({
    name: "",
    small: 1,
    medium: 1,
    large: 1,
    motherShip: 0
  });

  const [balance, updateBalance] = useState(-3);

  const countBalance = () => {
    let checkBalance =
      parseInt(raceForm.small) +
      parseInt(raceForm.medium) +
      parseInt(raceForm.large) -
      3;
    updateBalance(checkBalance);
  };

  const handleUnitUpdate = (e) => {
    updateRaceForm({ ...raceForm, [e.target.id]: e.target.value });
  };

  // Initial use effect
  useEffect(() => {
    countBalance();
  }, [raceForm]);

  let toRender = (
    <div>
      <form>
        <div>Create your first race</div>
        <div>
          <label>Name</label> <input type="text" />
        </div>
        <div>
          <label>Balance: {balance}</label>
        </div>
        <div>
          <label>Small unit</label>
          <input
            onChange={handleUnitUpdate}
            id="small"
            value={raceForm.small}
            type="number"
          />
        </div>
        <div>
          <label>Medium unit</label>
          <input
            onChange={handleUnitUpdate}
            id="medium"
            value={raceForm.medium}
            type="number"
          />
        </div>
        <div>
          <label>Large unit</label>
          <input
            onChange={handleUnitUpdate}
            id="large"
            value={raceForm.large}
            type="number"
          />
        </div>
        <div>
          <label>MotherShip</label>
          <input type="text" />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
  return toRender;
};
export default RaceDetail;
