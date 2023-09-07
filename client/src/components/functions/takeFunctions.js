import {searchCheckerByCoordinates,
        getCheckersType,
        checkIfCellIsEmpty} from './checkersFunctions';

export function playerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 2)
    {
        return checkerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2);
    }
    else if (getCheckersType(currentPlayer, x1, y1) === 'lady'
             && Math.abs(x1 - x2) === Math.abs(y1 - y2))
    {
        return ladyCheckerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2);
    }
    return false;
}


function checkerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (y1 - y2 === 2)
    {
        if (x1 - x2 === 2 && searchCheckerByCoordinates(waitingPlayer, x1 - 1, y1 - 1) !== null)
        {
            return true;
        }
        else if (x2 - x1 === 2 && searchCheckerByCoordinates(waitingPlayer, x1 + 1, y1 - 1) !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (y2 - y1 === 2) {
        if (x1 - x2 === 2 && searchCheckerByCoordinates(waitingPlayer, x1 - 1, y1 + 1) !== null)
        {
            return true;
        }
        else if (x2 - x1 === 2 && searchCheckerByCoordinates(waitingPlayer, x1 + 1, y1 + 1) !== null)
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

function ladyCheckerCanTakeChecker(currentPlayer, waitingPlayer, x1, y1, x2, y2) {
    if (x1 - x2 === y1 - y2 && x1 > x2)
    {
        for (let i = 1; i < x1 - x2 - 1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 - i) === false) 
            {
                return false;
            }
        }
        if (searchCheckerByCoordinates(waitingPlayer, x2 + 1, y2 + 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x2 - x1 === y1 - y2 && x1 < x2)
    {
        for (let i = 1; i < x2 - x1 - 1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 - i) === false)
            {
                return false;
            }
        }
        if (searchCheckerByCoordinates(waitingPlayer, x2 - 1, y2 + 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x1 - x2 === y2 - y1 && x1 > x2)
    {
        for (let i = 1; i < x1 - x2 - 1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 - i, y1 + i) === false)
            {
                return false;
            }
        }
        if (searchCheckerByCoordinates(waitingPlayer, x2 + 1, y2 - 1) !== null)
        {
            return true;
        }
        return false;
    }
    else if (x2 - x1 === y2 - y1 && x1 < x2)
    {
        for (let i = 1; i < x2 - x1 - 1; i++) {
            if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x1 + i, y1 + i) === false)
            {
                return false;
            }
        }
        if (searchCheckerByCoordinates(waitingPlayer, x2 - 1, y2 - 1) !== null)
        {
            return true;
        }
        return false;
    }
    return false;
}