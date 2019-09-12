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
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/me', authCtrl.authMe);
app.post('/auth/logout', authCtrl.logout);
app.get('/users/mentor-status/:user_id', ctrl.getMentorStatus)
app.get('/mentor-toggle', ctrl.setMentorToggle)
app.post('/mentors', ctrl.addMentor)
app.put('/users/updated-mentor-status/:user_id', ctrl.updateMentorStatus)
app.put('/set-session', ctrl.changeMentorToggle)
app.delete('/mentors/languages/:language_id', ctrl.deleteLanguage)


//  Listener and DB hookup
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        app.listen(PORT, () => console.log(`Motha truckin' on port ${PORT}`))
    });
