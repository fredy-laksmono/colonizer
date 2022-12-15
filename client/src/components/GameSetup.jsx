import RaceSelectCard from "./RaceSelectCard"
import { useEffect } from "react"
const uuid = require('uuid')

const GameSetup = ({ socket, races, updateRaceSelected, raceSelected, room, updateRoom, toggleInGame, updateHost}) => {
    let raceListRender = <div></div>

    const handleChooseRace = (e) => {
        updateRaceSelected(e.target.value)
    }

    const handleChangeRoom = (e) => {
        updateRoom(e.target.value)
    }

    const createGame = () => {
        let room = uuid.v4()
        room = room.slice(-4)
        console.log("creating game", room)
        socket.emit("create_game", room)
        updateRoom(room)
        updateHost(true)
        toggleInGame(true)
    }

    const joinGame = () => {
        console.log("joining game", room)
        socket.emit("join_game", room)
        updateHost(false)
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
        <div><input onChange={handleChangeRoom} placeholder="Room ID" type="text" value={room}/> <button onClick={joinGame}>Join Game</button></div>
    </div>)
    return toRender
}
export default GameSetup