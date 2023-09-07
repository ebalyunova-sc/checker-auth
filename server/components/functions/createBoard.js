const Player = require('../Classes/Player');

createBoard = (whitePlayer, blackPlayer) => {
    let board = [];
    let x, y, color,checker;

    for (let i = 1; i < 9; i++) {
        let row = [];
        y = i;
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 === 0)
            {
                color = 'white';
            }
            else
            {
                color = 'black';
            }
            x = j;
            if (whitePlayer.searchCheckerByCoordinates(x, y) !== null)
            {
                checker = whitePlayer.searchCheckerByCoordinates(x, y);
            }
            else if (blackPlayer.searchCheckerByCoordinates(x, y) !== null)
            {
                checker = blackPlayer.searchCheckerByCoordinates(x, y);
            }
            else
            {
                checker = null;
            }
            row.push({x, y, color, checker});
        }
        board.push(row);
    }
    return board;
}

module.exports = {createBoard};