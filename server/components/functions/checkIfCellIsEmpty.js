const Player = require('../Classes/Player');

checkIfCellIsEmpty = (firstPlayer, secondPlayer, x, y) => {
    if (x >= 1 && x <= 8 && y >= 1 && y <= 8
        && firstPlayer.searchCheckerByCoordinates(x, y) === null
        && secondPlayer.searchCheckerByCoordinates(x, y) === null)
    {
        return true;
    }
    return false;
}

module.exports = {checkIfCellIsEmpty};