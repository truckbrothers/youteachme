require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env || 4200
const ctrl = require('./controller');
const authCtrl = require('./authController');

// Sockets stuff
const socket = require('socket.io')
const ssl = require('./socketsController')



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
app.put('/users/update-user-image', ctrl.updateImage)
app.put('/set-session', ctrl.changeMentorToggle)
app.post('/request', ctrl.makeRequest)
app.get('/request/:user_id', ctrl.getRequests)
app.delete('/mentors/languages/:language_id', ctrl.deleteLanguage)
app.get('/mentors/languages', ctrl.getUserLanguages)
app.get('/languages', ctrl.getLanguages)
app.delete('/request/:request_id', ctrl.deleteRequest)
app.get('/request/info/:chat_id', ctrl.getRequestInfo)
app.get('/messages/:chat_id', ctrl.getMessages)


//  Listener and DB hookup
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)

        const io = socket(app.listen(PORT, () => console.log(`Motha truckin' on port ${PORT}`)))

        //SOCKETS STUFF
        io.on('connection', socket => {
            console.log('A new user just connected');

            ssl.setSocketListeners(socket, db, io)
        })
    });
