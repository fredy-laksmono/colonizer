import { UpdateRace, DeleteRace } from "../services/RaceServices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const RaceCard = ({race, triggerUpdate}) => {
    const [raceForm, updateRaceForm] = useState({
        small: race.small,
        medium: race.medium,
        large: race.large
    })
    const [balance, updateBalance] = useState(-3);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()

    const deleteRace = async(e) => {
        await DeleteRace(race.id)
        triggerUpdate()
    }
    const editRace = async() => {
        await UpdateRace(race.id, raceForm)
        triggerUpdate()
    }

    const countBalance = () => {
      let checkBalance =
        parseInt(raceForm.small) +
        parseInt(raceForm.medium) +
        parseInt(raceForm.large) -
        3;
      updateBalance(checkBalance);
    };

    const handleUnitUpdate = (e) => {
      e.stopPropagation()
        updateRaceForm({ ...raceForm, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        let payload = { 
          small: raceForm.small,
          medium: raceForm.medium,
          large: raceForm.large,
        };
        await UpdateRace(race.id, payload)
        triggerUpdate()
      };

      useEffect(() => {
        countBalance();
      }, [raceForm]);

    let submitButtonRender = <button onClick={(e)=>e.stopPropagation()} type="button" disabled>Save</button>;

  if (balance === 0) {
    submitButtonRender = <button onClick={handleSubmit} type="button">Save</button>;
  }


    return (<div>
        <motion.div transition={{ layout: { duration: 1, type: "spring"}}} layout onClick={()=> setIsOpen(!isOpen)} className="card click-able" style={{borderRadius: "1rem",boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"}}>
            <motion.h3 layout="position">
                {race.name}
            </motion.h3>
            {isOpen && 
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="expand">
            <form>
              <div>
                <label>Balance: {balance}</label>
              </div>
              <div>
                <label>Small unit </label>
                <input 
                  onClick={(e)=>e.stopPropagation()}
                  onChange={handleUnitUpdate}
                  id="small"
                  value={raceForm.small}
                  type="number"
                  min="0"
                  max="3"
                />
              </div>
              <div>
                <label>Medium unit </label>
                <input
                  onClick={(e)=>e.stopPropagation()}
                  onChange={handleUnitUpdate}
                  id="medium"
                  value={raceForm.medium}
                  type="number"
                  min="0"
                  max="3"
                />
              </div>
              <div>
                <label>Large unit </label>
                <input
                  onClick={(e)=>e.stopPropagation()}
                  onChange={handleUnitUpdate}
                  id="large"
                  value={raceForm.large}
                  type="number"
                  min="0"
                  max="3"
                />
              </div>
              {submitButtonRender}
            </form>
                <button onClick={deleteRace} >Delete</button>
            </motion.div>
}
        </motion.div>
        
    </div>)
}

export default RaceCard