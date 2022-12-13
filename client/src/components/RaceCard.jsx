import { DeleteRace } from "../services/RaceServices";

const RaceCard = ({race, needUpdate}) => {
    const deleteRace = () => {
        deleteRace(race.id)
        needUpdate()
    }
    return (<div>
        {race.name} <button onClick={deleteRace} >Delete</button>
    </div>)
}

export default RaceCard