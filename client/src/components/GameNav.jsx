const GameNav = ({ setPlayersNumber, setPlayer, game, user, handleLogout }) => {
    const handlePlayersNumber = (e) => {
        setPlayersNumber(e.target.value);
    }
    const handlePlayer = (e) => {
        setPlayer(e.target.value);
    }
    return (<div>
        Game Nav <button onClick={handlePlayer} value="1" >Player 1</button> <button onClick={handlePlayer} value="2">Player 2</button> 
    </div>)
}
export default GameNav;