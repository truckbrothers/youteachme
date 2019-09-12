import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import MentorCheck from './Components/MentorCheck/MentorCheck'
import Learner from './Components/Learner/Learner'
import Mentor from './Components/Mentor/Mentor'
import Profile from './Components/Profile/Profile'
import Request from './Components/Request/Request'
import Chat from './Components/Chat/Chat'


export default (
    <Switch>
        <Route exact path = '/' component = { Landing } />
        <Route path = '/mentor-check' component = { MentorCheck } />
        <Route path = '/learner' component = { Learner } />
        <Route path = '/mentor' component = { Mentor } />
        <Route path = '/profile' component = { Profile } />
        <Route path = '/request' component = { Request } />
        <Route path = '/chat' component = { Chat } />
    </Switch>
)