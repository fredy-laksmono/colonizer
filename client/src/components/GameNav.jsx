const GameNav = ({ setPlayerNumber, game, user, handleLogout }) => {
    const handlePlayerNumber = (e) => {
        setPlayerNumber(e.target.value);
    }
    return (<div>
        Game Nav <button onClick={handlePlayerNumber} value="2">2 Players</button> <button onClick={handlePlayerNumber} value="3">3 Players</button> <button onClick={handlePlayerNumber} value="4">4 Players</button> 
    </div>)
}
export default GameNav;