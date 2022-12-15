const BattleshipBoard = ({ board, onCellClick }) => {
    const boardSize = board.length;
    const boardCells = board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            const cellId = `${rowIndex + 1}.${colIndex + 1}`;
            return (
                <div
                    key={cellId}
                    id={cellId}
                    className={cell}
                    onClick={onCellClick}
                />
            );
        });
    });
    return (
        <div id="game-board-wrapper">
            {boardCells}
        </div>
    );
}

export default BattleshipBoard