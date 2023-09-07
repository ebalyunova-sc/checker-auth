const db = require('../db/config');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

let tokenDB = {
    userId: 0,
    refreshToken: '',
}

class UserService {
    async login(username, password) {
        const user = await db.query(`SELECT * FROM userdata WHERE username = $1;`,
                [username]);
        if (user.rowCount === 0)
        {
            throw ApiError.BadRequest('Пользователь не найден');
        }
        if (password !== user.rows[0].password)
        {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken, tokenDB);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await db.query(`SELECT * FROM userdata WHERE username = $1;`,
                [userData.username]);
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();