import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import MentorCheck from './Components/MentorCheck/MentorCheck'
import Feed from './Components/Feed/Feed'
import Profile from './Components/Profile/Profile'
import Request from './Components/Request/Request'
import Chat from './Components/Chat/Chat'


export default (
    <Switch>
        <Route exact path = '/' component = { Login } />
        <Route path = '/register' component = { Register } />
        <Route path = '/mentor-check' component = { MentorCheck } />
        <Route path = '/feed' component = { Feed } />
        <Route path = '/profile' component = { Profile } />
        <Route path = '/request' component = { Request } />
        <Route path = '/chat' component = { Chat } />
    </Switch>
)