const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const gameController = require('../controllers/game-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/check-auth', authMiddleware, userController.isLogin);

router.get('/init-game', authMiddleware, gameController.initGame);
router.post('/take', authMiddleware, gameController.take);
router.post('/move', authMiddleware, gameController.move);

module.exports = router;