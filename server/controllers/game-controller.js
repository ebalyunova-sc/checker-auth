const Game = require('../components/classes/Game');
let game;

class GameController {
    initGame(req, res) {
        game = new Game();
        return res.json({
            board: game.getBoard(),
            currentPlayer: game.getCurrentPlayer(),
            whiteCheckers: game.getWhiteCheckers(),
            blackCheckers: game.getBlackCheckers(),
            gameStatus: game.getGameStatus(),
        });
    }

    take(req, res) {
        game.take(req.body.x1, req.body.y1, req.body.x2, req.body.y2);
        return res.json({
            board: game.getBoard(),
            currentPlayer: game.getCurrentPlayer(),
            whiteCheckers: game.getWhiteCheckers(),
            blackCheckers: game.getBlackCheckers(),
            gameStatus: game.getGameStatus(),
        });
    }

    move(req, res) {
        game.move(req.body.x1, req.body.y1, req.body.x2, req.body.y2);
        return res.json({
            board: game.getBoard(),
            currentPlayer: game.getCurrentPlayer(),
            whiteCheckers: game.getWhiteCheckers(),
            blackCheckers: game.getBlackCheckers(),
            gameStatus: game.getGameStatus(),
        });
    }
}

module.exports = new GameController();