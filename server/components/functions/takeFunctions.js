const Player = require('../Classes/Player');
const {checkIfCellIsEmpty} = require('./checkIfCellIsEmpty');

takeChecker = (currentPlayer, waitingPlayer, x1, y1, x2, y2) => {
    if (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 2
        && checkerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2))
    {
        checkerTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2);
    }
    else if (currentPlayer.getCheckersType(x1, y1) === 'lady'
        && Math.abs(x1 - x2) === Math.abs(y1 - y2)
        && ladyCheckerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2))
    {
        ladyCheckerTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2);
    }
}
module.exports = {takeChecker};


function checkerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (y1 - y2 === 2)
    {
        if (x1 - x2 === 2
            && waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 - 1) !== null)
        {
            return true;
        }
        else if (x2 - x1 === 2
                 && waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 - 1) !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (y2 - y1 === 2)
    {
        if (x1 - x2 === 2
            && waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 + 1) !== null)
        {
            return true;
        }
        else if (x2 - x1 === 2
                 && waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 + 1) !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false
    }
}

function checkerTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    currentPlayer.changeCheckersCoordinates(x1, y1, x2, y2);
    if (y1 > y2)
    {
        if (y2 === 1 && currentPlayer.getColor() === 'white')
        {
            currentPlayer.changeCheckersType(x2, y2);
        }
        if (x1 > x2)
        {
            waitingPlayer.deleteChecker(x2 + 1, y2 + 1);
        }
        else
        {
            waitingPlayer.deleteChecker(x2 - 1, y2 + 1);
        }
    }
    else
    {
        if (y2 === 8 && currentPlayer.getColor() === 'black')
        {
            currentPlayer.changeCheckersType(x2, y2);
        }
        if (x1 > x2)
        {
            waitingPlayer.deleteChecker(x2 + 1, y2 - 1);
        }
        else
        {
            waitingPlayer.deleteChecker(x2 - 1, y2 - 1);
        }
    }
}

function ladyCheckerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (x1 - x2 === y1 - y2 && x1 > x2)
    {
        for (let i = 1; i < (x1 - x2 - 1); i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 - i) === false)
            {
                return false;
            }
        }
        if (waitingPlayer.searchCheckerByCoordinates(x2 + 1, y2 + 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x2 - x1 === y1 - y2 && x1 < x2)
    {
        for (let i = 1; i < (x2 - x1 - 1); i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 - i) === false)
            {
                return false;
            }
        }
        if (waitingPlayer.searchCheckerByCoordinates(x2 - 1, y2 + 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x1 - x2 === y2 - y1 && x1 > x2)
    {
        for (let i = 1; i < (x1 - x2 - 1); i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 + i) === false)
            {
                return false;
            }
        }
        if (waitingPlayer.searchCheckerByCoordinates(x2 + 1, y2 - 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x2 - x1 === y2 - y1 && x1 < x2)
    {
        for (let i = 1; i < (x2 - x1 - 1); i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 + i) === false)
            {
                return false;
            }
        }
        if (waitingPlayer.searchCheckerByCoordinates(x2 - 1, y2 - 1) !== null)
        {
            return true;
        }
        return false;
    }
    return false;
}

function ladyCheckerTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    currentPlayer.changeCheckersCoordinates(x1, y1, x2, y2);
    if (y1 > y2)
    {
        if (x1 > x2)
        {
            waitingPlayer.deleteChecker(x2 + 1, y2 + 1);
        }
        else
        {
            waitingPlayer.deleteChecker(x2 - 1, y2 + 1);
        }
    }
    else
    {
        if (x1 > x2)
        {
            waitingPlayer.deleteChecker(x2 + 1, y2 - 1);
        }
        else
        {
            waitingPlayer.deleteChecker(x2 - 1, y2 - 1);
        }
    }
}