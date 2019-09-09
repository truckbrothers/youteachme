require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const ctrl = require('./controller');
const authCtrl = require('./authController');

const app = express();

app.use(express.json());

// Sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}));

// Endpoints


//  Listener and DB hookup
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        app.listen(PORT, () => console.log(`Motha truckin' on port ${PORT}`))
    });
