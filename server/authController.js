const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password, user_image, mentor_status } = req.body
        const db = req.app.get('db')
        const checkName = await db.find_username([username])
        if (checkName.length > 0) {
            return res.status(400).send({ message: `Username in use.` })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.insert_user({ username, hash, user_image, mentor_status })
        req.session.user = newUser[0]
        return res.status(200).send({ message: 'Logged in', user: req.session.user, loggedIn: true })
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const user = await db.find_username([username])
        if (user.length === 0) {
            return res.status(400).send({ message: `Username not found` })
        }
        const result = bcrypt.compareSync(password, user[0].hash)
        if (result) {
            req.session.user = user[0]
            return res.status(200).send({ message: `Logged In`, user: req.session.user, loggedIn: true })
        } else {
            return res.status(400).send({ message: `Incorrect Password` })
        }
    },
    authMe: async (req, res) => {
        return res.status(200).send({ user: req.session.user, loggedIn: true })
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({ message: 'Logged Out', loggedIn: false })
    }
}