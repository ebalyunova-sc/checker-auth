import {getCheckersType,
        getCheckersColor,
        checkIfCellIsEmpty} from './checkersFunctions';

export function checkerCanMove(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (getCheckersType(currentPlayer, x1, y1) === 'lady')
    {
        return ladyCheckerCanMove(currentPlayer, waitingPlayer, x1, y1, x2, y2);
    }
    else
    {
        return menCheckerCanMove(currentPlayer, x1, y1, x2, y2);
    }
}


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

function menCheckerCanMove(currentPlayer, x1, y1, x2, y2) {
    if (getCheckersColor(currentPlayer, x1, y1) === 'white'
        && y1 - y2 === 1 && (x1 - x2 === 1 || x2 - x1 === 1))
    {
        return true;
    }
    else if (getCheckersColor(currentPlayer, x1, y1) === 'black'
        && y2 - y1 === 1 && (x1 - x2 === 1 || x2 - x1 === 1))
    {
        return true;
    }
    return false;
}