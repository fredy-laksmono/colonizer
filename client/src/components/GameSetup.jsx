import RaceSelectCard from "./RaceSelectCard"
import { useEffect } from "react"
const uuid = require('uuid')

const GameSetup = ({ socket, races, updateRaceSelected, raceSelected, updateRoom, toggleInGame, updateHost}) => {
    let raceListRender = <div></div>

    const handleChooseRace = (e) => {
        updateRaceSelected(e.target.value)
    }

    const createGame = () => {
        let room = uuid.v4()
        room = room.slice(-4)
        console.log("creating game", room)
        socket.emit("create_game", {room})
        updateRoom(room)
        updateHost(true)
        toggleInGame(true)
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
        <div><button onClick={createGame}>Create Game</button></div>
        <div><input placeholder="Room ID" type="text"/> <button>Join Game</button></div>
    </div>)
    return toRender
}
export default GameSetup