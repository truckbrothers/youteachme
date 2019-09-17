const bcrypt = require('bcryptjs');
const axios = require('axios');

module.exports = {
    setSocketListeners: function (socket, db, io) {
        // JOIN ROOM
        socket.on('join room', async data => {
            // console.log(data)
            // console.log('feed the baby')
            socket.join(data)
            io.in(data).emit('room joined', data)
        })
        // socket.on('join room?', async data => {
        //     const { roomId, userId, creatorId, roomImg } = data
        //     let confirmedRoom = await db.find_room(roomId)
        //     if (!confirmedRoom.length) {
        //         let messages = await db.create_room(roomId, +userId, +creatorId, roomImg)
        //         socket.join(roomId)
        //         io.in(roomId).emit('room joined', messages)
        //     } else {
        //         socket.join(confirmedRoom[0].room_id)
        //         io.in(confirmedRoom[0].room_id).emit('room joined', confirmedRoom)
        //     }
        //     console.log('User subscribed to:', data);
        // })
        socket.on('get existing messages', async data => {

            let messages = await db.find_messages(data)
            io.to(data).emit('message sent', messages)
        })

        // GET ROOMS
        socket.on('get rooms', async id => {
            let foundRooms = await db.get_user_rooms(id)
            socket.emit('found rooms', foundRooms)
        })
        // NEW MESSAGE
        socket.on('send message', async data => {
            // console.log('console-message is: ', data);
            const { from, message_text,  createdAt, user_id, chat_id } = data
            // console.log('data room:', chat_id);
            await db.insert_message({chat_id, user_id, message_text})
            let messages = await db.find_messages(chat_id)
            // console.log('coming from db:', messages, from);
            io.to(chat_id).emit('message sent', {messages})
            // io.to(roomId).emit('message sent', generateMessage(from, text, roomId, createdAt, userId))
        });
        // NEW USER
        socket.on('user signed on', () => {
            console.log('hello new user');
        })
        // LOCATION
        // socket.on('createLocationMessage', coords => {
        //     console.log('location listen:', coords);
        //     io.to(coords.roomId).emit('location message sent',
        //         generateLocationMessage(coords.username, coords.lat, coords.lng))
        // })

        // DISCONNECTED
        socket.on('disconnect', roomId => {
            console.log('user disconnected');
            socket.leave(roomId)
        });
        socket.on('leave all', () => {
            socket.leaveAll()
        })
    }
}