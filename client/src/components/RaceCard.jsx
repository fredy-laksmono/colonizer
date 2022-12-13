import { DeleteRace } from "../services/RaceServices";

const RaceCard = ({race, triggerUpdate}) => {
    const deleteRace = async() => {
        await DeleteRace(race.id)
        triggerUpdate()
    }
    return (<div>
        {race.name} <button onClick={deleteRace} >Delete</button>
    </div>)
}

export default RaceCard