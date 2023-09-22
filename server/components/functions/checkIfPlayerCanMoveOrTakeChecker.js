const Player = require('../classes/Player');
const {playerCanTakeEnemyCheckers} = require('./checkIfPlayerCanTakeCheckers');
const {checkIfCellIsEmpty} = require('./checkIfCellIsEmpty');

playerCanMoveOrTakeEnemyChecker = (currentPlayer, waitingPlayer) => {
    if (playerCanTakeEnemyCheckers(currentPlayer, waitingPlayer))
    {
        return true;
    }
    else
    {
        let currentPlayerCheckers = currentPlayer.getCheckers();
        for (let i = 0; i < currentPlayerCheckers.length; i++) {
            if (currentPlayerCheckers[i] !== null)
            {
                let x = currentPlayerCheckers[i].x;
                let y = currentPlayerCheckers[i].y;
                if (checkerCanMove(currentPlayer, waitingPlayer, x, y))
                {
                    return true;
                }
            }
        }
        return false;
    }
}
module.exports = {playerCanMoveOrTakeEnemyChecker};


function checkerCanMove(currentPlayer, waitingPlayer, x, y) {
    if (currentPlayer.getCheckersType(x, y) === 'lady')
    {
        if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1))
        {
            return true;
        }
    }
    else if (currentPlayer.getColor(x, y) === 'white')
    {
        if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1))
        {
            return true;
        }
    }
    else {
        if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1))
        {
            return true;
        }
    }
    return false;
}