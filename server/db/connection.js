const db = require('./config');

module.exports = async function () {
    try {
        await db.connect(() => {
            const firstQuery = 
                `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='userdata';`;
            db
            .query(firstQuery)
            .then((res) => {
                if (JSON.stringify(res.rows) === `[]`)
                {
                    createUserdataTable();
                }
            });
            const secondQuery = 
                `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='tokens';`;
            db
            .query(secondQuery)
            .then((res) => {
                if (JSON.stringify(res.rows) === `[]`)
                {
                    createTokensTable();
                }
            });
        });
    } catch (e) {
        return next(ApiError.BadRequest('Ошибка при попытке подключения к БД'))
    }
}

async function createUserdataTable() {
    const query = 
        `CREATE TABLE IF NOT EXISTS userdata
           (id serial PRIMARY KEY,
            username VARCHAR(20) UNIQUE,
            password VARCHAR(20) NOT NULL);
        INSERT INTO userdata (username, password) VALUES ('white', 'white');
        INSERT INTO userdata (username, password) VALUES ('black', 'black');`;
    await db
        .query(query)
        .then(() => {
            console.log('userdata table created successfully!');
        });
}

async function createTokensTable() {
    const query = 
        `CREATE TABLE IF NOT EXISTS tokens
           (userId int PRIMARY KEY,
            refreshToken VARCHAR(250) UNIQUE NOT NULL);`;
    await db
        .query(query)
        .then(() => {
            console.log('tokens table created successfully!');
        });
}