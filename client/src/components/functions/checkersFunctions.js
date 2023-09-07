export function searchCheckerByCoordinates(checkers, x, y) {
    for (let i = 0; i < checkers.length; i++) {
        if (checkers[i] !== null && checkers[i].x === x && checkers[i].y === y)
        {
            return checkers[i];
        }
    }
    return null;
}

export function getCheckersType(checkers, x, y) {
    if (searchCheckerByCoordinates(checkers, x, y))
    {
        return searchCheckerByCoordinates(checkers, x, y).type;
    }
}
export function getCheckersColor(checkers, x, y) {
    if (searchCheckerByCoordinates(checkers, x, y))
    {
        return searchCheckerByCoordinates(checkers, x, y).color;
    }
}

export function checkIfCellIsEmpty(firstPlayer, secondPlayer, x, y) {
    if (x >= 1 && x <= 8 && y >= 1 && y <= 8
        && searchCheckerByCoordinates(firstPlayer, x, y) === null
        && searchCheckerByCoordinates(secondPlayer, x, y) === null)
    {
        return true;
    }
    return false;
}