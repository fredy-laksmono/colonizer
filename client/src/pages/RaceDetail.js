import { useState } from "react";
const RaceDetail = () => {
  const [raceForm, updateRaceForm] = useState({
    name: "",
    grow: 1,
    damage: 1,
    health: 1,
    uniqueAbility: 0
  });
  let toRender = (
    <div>
      <div>Create your first race</div>
      <div>
        <label>Name</label>
        <input />
      </div>
    </div>
  );
  return;
};
export default RaceDetail;
