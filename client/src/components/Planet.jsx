import { useEffect } from 'react';
const Planet = ({player, gameState, updateGameState, x, y, socket}) => {
    // console.log(x, y)
    // console.log(gameState)
    // console.log(gameState[x])
    // console.log(gameState[x][y])
    // console.log(gameState[x][y].owner)
    // console.log(player)

    let type = gameState[x][y].type;
    let units = gameState[x][y].units;
    let owner = gameState[x][y].owner;

    const handleClick = () => {

        updateGameState({ ...gameState, [x]: { ...gameState[x], 
            [y]: { ...gameState[x][y],
                owner: player
            }
        }});
        socket.emit('planet_click', {x, y, player, gameState});
    }

    

    let toRender = (<div>
        <button onClick={handleClick}>
            <div>{type}</div>
            <div>{owner}</div>
            <div>{units}</div>
        </button>
    </div>);
    return toRender;
}

export default Planet;