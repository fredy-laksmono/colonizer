import RaceSelectCard from "./RaceSelectCard"
import { useEffect } from "react"

const GameSetup = ({ socket, races, updateRaceSelected }) => {
    let raceListRender = <div></div>

    const handleChooseRace = (e) => {
        console.log(e)
        updateRaceSelected(e.target.value)
    }

    if (races){
        raceListRender = (<select onChange={handleChooseRace}>
            {races.map((race) => (
                <RaceSelectCard key={race.id} race={race} />
            ))} 
        </select>)
    }
    

    let toRender = (<div>
        <div>Select your race</div>
        <div>{raceListRender}</div>
        <div><button>Create Game</button></div>
        <div><input placeholder="Room ID" type="text"/> <button>Join Game</button></div>
    </div>)
    return toRender
}
export default GameSetup