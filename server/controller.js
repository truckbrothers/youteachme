module.exports = {
    setMentorToggle: (req, res) => {
        // console.log(req.session)
        req.session.mentorToggle = false
        // console.log(req.session)
        res.status(200).send(req.session.mentorToggle)
    },
    changeMentorToggle: (req, res) => {
        // console.log(req.session)
        req.session.mentorToggle = !req.session.mentorToggle
        // console.log(req.session)
        res.status(200).send(req.session.mentorToggle)
    },
    getMentorStatus: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.params
            const mentorStatus = await db.find_mentor_status([user_id])
            res.status(200).send(mentorStatus)
        }
        catch(err) {
            res.status(500).send(`Error in retrieving mentor status: ${err}`)
        }
    },
    makeRequest: async (req,res) => {
        try{
            const db = req.app.get('db')
            const { user_id, request_info, language_id } = req.body
            const request = await db.insert_request({user_id, request_info})
            const { request_id } = request[0]
            await language_id.map((el => db.insert_request_tags({request_id: request_id, language_id: el})))
            const chat = await db.insert_chat({request_id: request_id, title: request_info })
            res.status(200).send(chat)
        }
        catch(err) {
            res.status(500).send(`error in making a new request: ${err}`)
        }
    },
    getRequests: async (req,res) => {
        try{

            const db = req.app.get('db')
            const {user_id} = req.params
            const requests = await db.find_request(user_id)
            res.status(200).send(requests)
        }
        catch(err) {
            res.status(500).send(`couldn't get requests: ${err}`)
        }
    },
    addMentor: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id, language_id } = req.body
            const mentor = await db.insert_mentor({user_id, language_id})
            res.status(200).send(mentor)
        }
        catch(err) {
            res.status(500).send(`Error in adding mentor: ${err}`)
        }
    },
    updateMentorStatus: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.params
            const updatedMentorStatus = await db.update_mentor_status([user_id])
            res.status(200).send(updatedMentorStatus)
        }
        catch(err) {
            res.status(500).send(`Error in updating mentor status: ${err}`)
        }
    },
    updateImage: async (req,res) => {
        try{const { user_image, user_id } = req.body
        const db = req.app.get('db')
        const imageToUpdate = await db.update_image([user_image, user_id])
        req.session.user.user_image = user_image
        console.log('mtest:',req.session.user)
        res.status(200).send(imageToUpdate)
    }
    catch
            {
                res.status(400).send('messed up while attempting to edit image')
            }
    },
    deleteLanguage: async (req, res) => {
        try {
            const { user_id } = req.session.user
            const { language_id } = req.params
            const db = req.app.get('db')
            const updatedLanguages = await db.delete_language({user_id, language_id})
            res.status(200).send(updatedLanguages)

        }
        catch(err) {
            res.status(500).send(`Error in deleting language: ${err}`)
        }
    },
    getUserLanguages: async (req, res) => {
        try {
            const { user_id } = req.session.user
            const db = req.app.get('db')
            const user_languages = await db.get_user_languages([user_id])
            res.status(200).send(user_languages)
        }
        catch(err) {
            res.status(500).send(`Error in retrieving user languages: ${err}`)
        }
    },
    getLanguages: async (req, res) => {
        try {
            const db = req.app.get('db')
            const languages = await db.find_languages()
            res.status(200).send(languages)
        }
        catch(err) {
            res.status(500).send(`Couldn't get languages: ${err}`)
        }
    }
}