const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/', authMiddleware, userController.isLogin);

module.exports = router;