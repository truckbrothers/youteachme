module.exports = {
    setMentorToggle: (req, res) => {
        console.log(req.session)
        req.session.mentorToggle = false
        console.log(req.session)
        res.status(200).send(req.session.mentorToggle)
    },
    changeMentorToggle: (req, res) => {
        console.log(req.session)
        req.session.mentorToggle = !req.session.mentorToggle
        console.log(req.session)
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
    }
}