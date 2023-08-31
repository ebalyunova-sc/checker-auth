const userService = require('../service/user-service');

class UserController {
    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await userService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 45 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 45 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async isLogin(req, res, next) {
        try {
            return res.json(true);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();