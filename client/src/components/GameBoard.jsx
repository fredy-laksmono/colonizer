import Planet from "./Planet"

const GameBoard = ({ socket, playersNumber, game, player, onMove, gameState, updateGameState, updatep1Counter, updatep2Counter }) => {
    
    let twoPlayerBoard = (<div id="game-board-wrapper-2">
        <div></div>
        <div></div>
        <div><Planet x={1} y={3} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div></div>
        <div></div>
        <div></div>
        <div><Planet x={2} y={2} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={2} y={3} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={2} y={4} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div></div>
        <div><Planet x={3} y={1} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={3} y={2} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={3} y={3} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={3} y={4} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={3} y={5} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div></div>
        <div><Planet x={4} y={2} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={4} y={3} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div><Planet x={4} y={4} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div></div>
        <div></div>
        <div></div>
        <div><Planet x={5} y={3} player={player} gameState={gameState} updateGameState={updateGameState} socket={socket} updatep1Counter={updatep1Counter} updatep2Counter={updatep2Counter}/></div>
        <div></div>
        <div></div>
    </div>)

    let threePlayerBoard = (<div id="game-board-wrapper-3">
        <div>1.1</div>
        <div>1.2</div>
        <div>1.3</div>
        <div>1.4</div>
        <div>1.5</div>
        <div>1.6</div>
        <div>2.1</div>
        <div>2.2</div>
        <div>2.3</div>
        <div>2.4</div>
        <div>2.5</div>
        <div>2.6</div>
        <div>3.1</div>
        <div>3.2</div>
        <div>3.3</div>
        <div>3.4</div>
        <div>3.5</div>
        <div>3.6</div>
        <div>4.1</div>
        <div>4.2</div>
        <div>4.3</div>
        <div>4.4</div>
        <div>4.5</div>
        <div>4.6</div>
        <div>5.1</div>
        <div>5.2</div>
        <div>5.3</div>
        <div>5.4</div>
        <div>5.5</div>
        <div>5.6</div>
        <div>6.1</div>
        <div>6.2</div>
        <div>6.3</div>
        <div>6.4</div>
        <div>6.5</div>
        <div>6.6</div>
    </div>)

    let fourPlayerBoard = (<div id="game-board-wrapper-4">
        <div>1.1</div>
        <div>1.2</div>
        <div>1.3</div>
        <div>1.4</div>
        <div>1.5</div>
        <div>1.6</div>
        <div>1.7</div>
        <div>2.1</div>
        <div>2.2</div>
        <div>2.3</div>
        <div>2.4</div>
        <div>2.5</div>
        <div>2.6</div>
        <div>2.7</div>
        <div>3.1</div>
        <div>3.2</div>
        <div>3.3</div>
        <div>3.4</div>
        <div>3.5</div>
        <div>3.6</div>
        <div>3.7</div>
        <div>4.1</div>
        <div>4.2</div>
        <div>4.3</div>
        <div>4.4</div>
        <div>4.5</div>
        <div>4.6</div>
        <div>4.7</div>
        <div>5.1</div>
        <div>5.2</div>
        <div>5.3</div>
        <div>5.4</div>
        <div>5.5</div>
        <div>5.6</div>
        <div>5.7</div>
        <div>6.1</div>
        <div>6.2</div>
        <div>6.3</div>
        <div>6.4</div>
        <div>6.5</div>
        <div>6.6</div>
        <div>6.7</div>
        <div>7.1</div>
        <div>7.2</div>
        <div>7.3</div>
        <div>7.4</div>
        <div>7.5</div>
        <div>7.6</div>
        <div>7.7</div>
    </div>)

    let boardRender = <div></div>
    if (playersNumber === 2) {
        boardRender = twoPlayerBoard;
    } else if (playersNumber === 3) {
        boardRender = threePlayerBoard;
    } else if (playersNumber === 4) {
        boardRender = fourPlayerBoard;
    }

    let toRender = (<div>
        <div>boardRender for {playersNumber}</div>
        <div>{boardRender}</div>
    </div>)
    return toRender
}

export default GameBoard;