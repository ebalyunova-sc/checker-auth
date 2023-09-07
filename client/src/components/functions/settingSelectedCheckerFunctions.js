import {searchCheckerByCoordinates,
        getCheckersType,
        checkIfCellIsEmpty,
        getCheckersColor} from './checkersFunctions';

export function playerCanTakeEnemyCheckers(currentPlayer, waitingPlayer) {
    for (let i = 0; i < currentPlayer.length; i++) {
        if (currentPlayer[i] !== null)
        {
            let x = currentPlayer[i].x;
            let y = currentPlayer[i].y;
            if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y))
            {
                return true;
            }
        }
    }
    return false;
}

export function checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y) {
    if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y - 2)
        && searchCheckerByCoordinates(waitingPlayer, x - 1, y - 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y - 2)
             && searchCheckerByCoordinates(waitingPlayer, x + 1, y - 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y + 2)
             && searchCheckerByCoordinates(waitingPlayer, x - 1, y + 1) !== null)
    {
        return true;
    }
    else if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y + 2)
             && searchCheckerByCoordinates(waitingPlayer, x + 1, y + 1) !== null)
    {
        return true;
    }
    else if (getCheckersType(currentPlayer, x, y) === 'lady')
    {
        return ladyCheckerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y);
    }
    return false;
}

function ladyCheckerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y) {
    if (x > 3 && y > 3
        && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1))
    {
        for (let i = 2; (x - i > 1) && (y - i > 1); i++) {
            if (searchCheckerByCoordinates(waitingPlayer, x - i, y - i) !== null
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
        for (let i = 2; (x + i < 8) && (y - i > 1); i++) {
            if (searchCheckerByCoordinates(waitingPlayer, x + i, y - i) !== null
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
        for (let i = 2; (x - i > 1) && (y + i < 8); i++) {
            if (searchCheckerByCoordinates(waitingPlayer, x - i, y + i) !== null
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
        for (let i = 2; (x + i < 8) && (y + i < 8); i++) {
            if (searchCheckerByCoordinates(waitingPlayer, x + i, y + i) !== null
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

export function checkerCanMoveAnywhere(currentPlayer, waitingPlayer, x, y) {
    if (getCheckersType(currentPlayer, x, y) === 'lady')
    {
        if (checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1)
            || checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1))
        {
            return true;
        }
    }
    else if (getCheckersColor(currentPlayer, x, y) === 'white')
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