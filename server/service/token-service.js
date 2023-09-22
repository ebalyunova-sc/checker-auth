const db = require('../db/config');
const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: 45 * 60})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: 45 * 60})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query(`SELECT * FROM tokens WHERE userId = $1;`,
                [userId]);
        if (tokenData.rowCount)
        {
            await db.query(`UPDATE tokens SET refreshToken = $2 WHERE userId = $1;`,
                    [userId, refreshToken]);
            return true;
        }
        await db.query(`INSERT INTO tokens (userId, refreshToken) VALUES ($1, $2);`,
                [userId, refreshToken]);
    }

    async removeToken(refreshToken) {
        await db.query(`DELETE FROM tokens WHERE refreshToken = $1;`,
                [refreshToken]);
    }

    async findToken(refreshToken) {
        const tokenData = await db.query(`SELECT * FROM tokens WHERE refreshToken = $1;`,
                [refreshToken]);
        return tokenData.rows[0];
    }
}

module.exports = new TokenService();