const Player = require('./Player');
const {addCheckersToPlayers} = require('../functions/addCheckersToPlayers');
const {createBoard} = require('../functions/createBoard');
const {takeChecker} = require('../functions/takeFunctions');
const {playerCanMoveOrTakeEnemyChecker} = require('../functions/checkIfPlayerCanMoveOrTakeChecker');
const {checkerCanTakeEnemyChecker} = require('../functions/checkIfCheckerCanTakeChecker');
const {playerCanTakeEnemyCheckers} = require('../functions/checkIfPlayerCanTakeCheckers');
const {moveChecker} = require('../functions/moveFunctions');

class Game {
    constructor() {
        this.whitePlayer = new Player('white player', 'white');
        this.blackPlayer = new Player('black player', 'black');
        addCheckersToPlayers(this.whitePlayer, this.blackPlayer);

        this.board = createBoard(this.whitePlayer, this.blackPlayer);

        this.currentPlayer = 'white player';

        this.gameStatus = 'game in progress';
    }

    getBoard() {
        return this.board;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getWhiteCheckers() {
        return this.whitePlayer.getCheckers();
    }

    getBlackCheckers() {
        return this.blackPlayer.getCheckers();
    }

    getGameStatus() {
        return this.gameStatus;
    }

    changeCurrentPlayer() {
        if (this.currentPlayer === 'white player')
        {
            this.currentPlayer = 'black player';
        }
        else
        {
            this.currentPlayer = 'white player';
        }
    }
    
    take(x1, y1, x2, y2) {
        if (this.currentPlayer === 'white player')
        {
            takeChecker(this.whitePlayer, this.blackPlayer, x1, y1, x2, y2);
            if (checkerCanTakeEnemyChecker(this.whitePlayer, this.blackPlayer, x2, y2) === false
                && playerCanMoveOrTakeEnemyChecker(this.blackPlayer, this.whitePlayer))
            {
                this.changeCurrentPlayer();
            }
            else if (playerCanMoveOrTakeEnemyChecker(this.blackPlayer, this.whitePlayer) === false)
            {
                this.gameStatus = 'game over';
            }
        }
        else
        {
            takeChecker(this.blackPlayer, this.whitePlayer, x1, y1, x2, y2);
            if (checkerCanTakeEnemyChecker(this.blackPlayer, this.whitePlayer, x2, y2) === false
                && playerCanMoveOrTakeEnemyChecker(this.whitePlayer, this.blackPlayer))
            {
                this.changeCurrentPlayer();
            }
            else if (playerCanMoveOrTakeEnemyChecker(this.whitePlayer, this.blackPlayer) === false)
            {
                this.gameStatus = 'game over';
            }
        }
        this.board = createBoard(this.whitePlayer, this.blackPlayer);
    }

    move(x1, y1, x2, y2) {
        if (this.currentPlayer === 'white player')
        {
            if (playerCanTakeEnemyCheckers(this.whitePlayer, this.blackPlayer) === false)
            {
                moveChecker(this.whitePlayer, this.blackPlayer, x1, y1, x2, y2);
                if (playerCanMoveOrTakeEnemyChecker(this.blackPlayer, this.whitePlayer))
                {
                    this.changeCurrentPlayer();
                }
                else
                {
                    this.gameStatus = 'game over';
                }
            }
        }
        else
        {
            if (playerCanTakeEnemyCheckers(this.blackPlayer, this.whitePlayer) === false)
            {
                moveChecker(this.blackPlayer, this.whitePlayer, x1, y1, x2, y2);
                if (playerCanMoveOrTakeEnemyChecker(this.whitePlayer, this.blackPlayer))
                {
                    this.changeCurrentPlayer();
                }
                else
                {
                    this.gameStatus = 'game over';
                }
            }
        }
        this.board = createBoard(this.whitePlayer, this.blackPlayer);
    }
    
    reloadBoard() {
        this.whitePlayer = new Player('white player', 'white');
        this.blackPlayer = new Player('black player', 'black');
        addCheckersToPlayers(this.whitePlayer, this.blackPlayer);

        this.board = createBoard(this.whitePlayer, this.blackPlayer);

        this.currentPlayer = 'white player';

        this.gameStatus = 'game in progress';
    }
}

module.exports = Game;