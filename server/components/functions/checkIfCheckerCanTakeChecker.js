const Player = require('../Classes/Player');
const {checkIfCellIsEmpty} = require('./checkIfCellIsEmpty');

checkerCanTakeEnemyChecker = (currentPlayer, waitingPlayer, x, y) => {
    if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y - 2)
        && waitingPlayer.searchCheckerByCoordinates(x - 1, y - 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y - 2)
        && waitingPlayer.searchCheckerByCoordinates(x + 1, y - 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y + 2)
        && waitingPlayer.searchCheckerByCoordinates(x - 1, y + 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y + 2)
        && waitingPlayer.searchCheckerByCoordinates(x + 1, y + 1) !== null)
    {
        return true;
    }
    else if (currentPlayer.getCheckersType(x, y) === 'lady')
    {
        return ladyCheckerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y);
    }
    return false;
}
module.exports = {checkerCanTakeEnemyChecker};


function ladyCheckerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y) {
    if (x > 3 && y > 3
        && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1))
    {
        for (let i = 2; x - i > 1 && y - i > 1; i++) {
            if (waitingPlayer.searchCheckerByCoordinates(x - i, y - i) !== null
                && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - i - 1, y - i - 1))
            {
                return true;
            }
            else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - i, y - i))
            {
                continue;
            }
            else
            {
                break;
            }
        }
    }
    else if (x < 6 && y > 3
             && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1))
    {
        for (let i = 2; x + i < 8 && y - i > 1; i++) {
            if (waitingPlayer.searchCheckerByCoordinates(x + i, y - i) !== null
                && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + i + 1, y - i - 1))
            {
                return true;
            }
            else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + i, y - i))
            {
                continue;
            }
            else
            {
                break;
            }
        }
    }
    else if (x > 3 && y < 6
             && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1))
    {
        for (let i = 2; x - i > 1 && y + i < 8; i++) {
            if (waitingPlayer.searchCheckerByCoordinates(x - i, y + i) !== null
                && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - i - 1, y + i + 1))
            {
                return true;
            }
            else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - i, y + i))
            {
                continue;
            }
            else
            {
                break;
            }
        }
    }
    else if (x < 6 && y < 6
             && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1))
    {
        for (let i = 2; x + i < 8 && y + i < 8; i++) {
            if (waitingPlayer.searchCheckerByCoordinates(x + i, y + i) !== null
                && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + i + 1, y + i + 1))
            {
                return true;
            }
            else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + i, y + i))
            {
                continue;
            }
            else
            {
                break;
            }
        }
    }
    return false;
}