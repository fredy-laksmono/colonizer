const GameSetup = ({socket}) => {

    let toRender = (<div>
        <div>Select your race</div>
        <div>drop down</div>
        <div><button>Create Game</button></div>
        <div><input placeholder="Room ID" type="text"/> <button>Join Game</button></div>
    </div>)
    return toRender
}
export default GameSetup