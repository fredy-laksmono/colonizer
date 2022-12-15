import { useEffect } from 'react';
const Planet = ({player, gameState, updateGameState, x, y, socket, updatep1Counter, updatep2Counter}) => {

    let type = gameState[x][y].type;
    let units = gameState[x][y].units;
    let owner = gameState[x][y].owner;

    const handleClick = () => {

        // Calculate the number of units to be sent
        let originUnit = 0;
        if(player === "p1"){
            originUnit = gameState[3][1].units;
        }
        else if(player === "p2"){
            originUnit = gameState[3][5].units;
        }
        let unitsToSend = Math.floor(originUnit/2);
        let unitsLeft = originUnit - unitsToSend;
        if(player === "p1"){
            updatep1Counter(unitsLeft);
            if (x !== 3){
                updateGameState({ ...gameState, 
                    3: { ...gameState[3], 
                        1: { ...gameState[3][1],
                            units: unitsLeft
                        }  
                    },
                    [x]: { ...gameState[x], 
                        [y]: { ...gameState[x][y],
                            owner: player,
                            units: unitsToSend
                        }
                    }
                });
            }
            else{
                updateGameState({ ...gameState, 
                    3: { ...gameState[3], 
                        1: { ...gameState[3][1],
                            units: unitsLeft
                        },
                        [y]: { ...gameState[3][y],
                            owner: player,
                            units: unitsToSend
                        }
                    }
                });
            }

        }
        else if(player === "p2"){
            updatep2Counter(unitsLeft);
            if (x !== 3){
                updateGameState({ ...gameState, 
                    3: { ...gameState[3], 
                        5: { ...gameState[3][5],
                            units: unitsLeft
                        }  
                    },
                    [x]: { ...gameState[x], 
                        [y]: { ...gameState[x][y],
                            owner: player,
                            units: unitsToSend
                        }
                    }
                });
            }
            else{
                updateGameState({ ...gameState, 
                    3: { ...gameState[3], 
                        5: { ...gameState[3][5],
                            units: unitsLeft
                        },
                        [y]: { ...gameState[3][y],
                            owner: player,
                            units: unitsToSend
                        }
                    }
                });
            }
        }

        // Send the data to the server
        socket.emit('planet_click', {x, y, player, unitsToSend, unitsLeft});
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