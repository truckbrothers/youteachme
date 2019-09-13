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
            await db.insert_chat({request_id: request_id, title: request_info })
            res.status(200).send(request)
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
    }
}