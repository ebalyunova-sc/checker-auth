const Player = require('../Classes/Player');
const {checkerCanTakeEnemyChecker} = require('./checkIfCheckerCanTakeChecker');

playerCanTakeEnemyCheckers = (currentPlayer, waitingPlayer) => {
    let currentPlayerCheckers = currentPlayer.getCheckers();
    for (let i = 0; i < currentPlayerCheckers.length; i++) {
        if (currentPlayerCheckers[i] !== null)
        {
            let x = currentPlayerCheckers[i].x;
            let y = currentPlayerCheckers[i].y;
            if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y))
            {
                return true;
            }
        }
    }
    return false;
}
module.exports = {playerCanTakeEnemyCheckers};