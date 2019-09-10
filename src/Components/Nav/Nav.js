import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../ducks/reducer'
import { withRouter, Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
    logout = () => {
        axios.post('/auth/logout').then(() => {
            this.props.logoutUser()
            this.props.history.push('/')
        })
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('/auth/me').then(res => {
            if (res.data.user) {
                const { username, user_image, user_id } = res.data.user
                this.props.setUser({ username, user_image, user_id })
            }
        })
            .catch(err => { alert(`couldn't find user info`, err) })
    }
    render() {
        const { pathname } = this.props.location
        return (
            <div className="Nav">
                {pathname === "/feed" || pathname === "/profile" || pathname === "/chat" ?
                    (<div className="nav-content" >
                        <img
                            className="user-image"
                            onClick={() => console.log(this.props)}
                            src={this.props.user_image}
                            alt='profile-pic'
                        />
                        <div className="nav-links nav-links-hidden">
                            <p>{this.props.username}</p>
                            <Link to='/profile'>Profile</Link>
                            <p onClick={this.logout}>Logout</p>
                        </div>
                    </div>
                    ) : null}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const { user_id, username, user_image } = reduxState
    return { user_id, username, user_image }
}

export default connect(mapStateToProps, { setUser, logoutUser })(withRouter(Nav))