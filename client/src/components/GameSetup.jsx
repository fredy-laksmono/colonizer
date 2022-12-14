import RaceSelectCard from "./RaceSelectCard"
import { useEffect } from "react"

const GameSetup = ({ socket, races, updateRaceSelected, raceSelected}) => {
    let raceListRender = <div></div>

    const handleChooseRace = (e) => {
        console.log(e)
        updateRaceSelected(e.target.value)
    }


    useEffect(() => {
        if(races.length>0 && raceSelected === 0){
            let firstRaceId = races[0].id

            updateRaceSelected(firstRaceId.toString())
        }
        
    },[races])

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