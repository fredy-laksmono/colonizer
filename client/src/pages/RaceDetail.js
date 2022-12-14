import { useState, useEffect } from "react";
import UniqueCard from "../components/UniqueCard";
import { GetUniques } from "../services/UniqueServices";
import { CreateRace } from "../services/RaceServices";
import { useNavigate } from "react-router-dom";

const RaceDetail = ({ user, authenticated }) => {
  const [raceForm, updateRaceForm] = useState({
    name: "",
    small: 1,
    medium: 1,
    large: 1
  });
  const [mothership, updateMothership] = useState(0);

  const [balance, updateBalance] = useState(-3);
  const [uniques, updateUniques] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      name: raceForm.name,
      small: raceForm.small,
      medium: raceForm.medium,
      large: raceForm.large,
      unique_id: mothership,
      owner_id: user.id
    };
    await CreateRace(payload);
    updateRaceForm({
      name: "",
      small: 1,
      medium: 1,
      large: 1
    });
    updateMothership(0);
    navigate("/races");
  };

  const getUniqueData = async () => {
    const payload = await GetUniques();
    updateUniques(payload);
  };

  // Initial use effect
  useEffect(() => {
    getUniqueData();
  }, []);

  useEffect(() => {
    countBalance();
  }, [raceForm]);

  let motherShipRender = (
    <div>
      <label>MotherShip</label>
      {uniques ? (
        <div className="race-list">
          <div></div>
          <div>
            {uniques.map((unique) => (
              <UniqueCard
                key={unique.id}
                unique={unique}
                updateMothership={updateMothership}
                mothership={mothership}
              />
            ))}
          </div>
          <div></div>
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );

  let submitButtonRender = <button disabled>Save</button>;

  if (balance === 0 && mothership !== 0 && raceForm.name !== "") {
    submitButtonRender = <button>Save</button>;
  }

  let raceFormRender = (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>{" "}
          <input
            onChange={handleUnitUpdate}
            id="name"
            value={raceForm.name}
            type="text"
          />
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
        <div>{motherShipRender}</div>
        {submitButtonRender}
      </form>
    </div>
  );

  let toRender = (
    <div>
      <div></div>
      {raceFormRender}
      <div></div>
    </div>
  );
  return toRender;
};
export default RaceDetail;
