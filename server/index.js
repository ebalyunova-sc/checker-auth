require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const dbConnection = require('./db/connection')

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);

const start = async () => {
    try {
        await dbConnection();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
    } catch (e) {
        console.log(e);
    }
}

start();