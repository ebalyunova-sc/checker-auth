const Player = require('../classes/Player');
const {checkIfCellIsEmpty} = require('./checkIfCellIsEmpty');

moveChecker = (currentPlayer, waitingPlayer, x1, y1, x2, y2) => {
    if (currentPlayer.getCheckersType(x1, y1) === 'lady'
        && ladyCheckerCanMove(currentPlayer, waitingPlayer, x1, y1, x2, y2))
    {
        moveLadyChecker(currentPlayer, x1, y1, x2, y2);
    }
    else if (menCheckerCanMove(currentPlayer, x1, y1, x2, y2))
    {
        moveMenChecker(currentPlayer, x1, y1, x2, y2);
    }
}
module.exports = {moveChecker};


function ladyCheckerCanMove(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (x1 - x2 === y1 - y2 && x1 > x2)
    {
        for (let i = 1; i <= x1 - x2; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 - i) === false)
            {
                return false;
            }
        }
        return true;
    }
    else if (x2 - x1 === y1 - y2 && x2 > x1)
    {
        for (let i = 1; i <= x2 - x1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 - i) === false)
            {
                return false;
            }
        }
        return true;
    }
    else if (x1 - x2 === y2 - y1 && x1 > x2)
    {
        for (let i = 1; i <= x1 - x2; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 + i) === false)
            {
                return false;
            }
        }
        return true;
    }
    else if (x2 - x1 === y2 - y1 && x2 > x1)
    {
        for (let i = 1; i <= x2 - x1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 + i) === false)
            {
                return false;
            }
        }
        return true;
    }
    return false;
}

function moveLadyChecker(currentPlayer, x1, y1, x2, y2) {
    currentPlayer.changeCheckersCoordinates(x1, y1, x2, y2);
}

function menCheckerCanMove(currentPlayer, x1, y1, x2, y2) {
    if (currentPlayer.getColor() === 'white'
        && y1 - y2 === 1 && (x1 - x2 === 1 || x2 - x1 === 1))
    {
        return true;
    }
    else if (currentPlayer.getColor() === 'black'
        && y2 - y1 === 1 && (x1 - x2 === 1 || x2 - x1 === 1))
    {
        return true;
    }
    return false;
}

function moveMenChecker(currentPlayer, x1, y1, x2, y2) {
    currentPlayer.changeCheckersCoordinates(x1, y1, x2, y2);
    if (currentPlayer.getColor() === 'white' && y2 === 1)
    {
        currentPlayer.changeCheckersType(x2, y2);
    }
    else if (currentPlayer.getColor() === 'black' && y2 === 8)
    {
        currentPlayer.changeCheckersCoordinates(x1, y1, x2, y2);
        currentPlayer.changeCheckersType(x2, y2);
    }
}