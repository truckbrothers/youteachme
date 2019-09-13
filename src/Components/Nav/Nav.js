import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../ducks/reducer'
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';


import './nav.css'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            navHide: `nav-links-hidden`
        }
    }
    logout = () => {
        axios.post('/auth/logout').then(() => {
            this.props.logoutUser()
            this.props.history.push('/')
            this.setState({
                navHide:'nav-links-hidden'
            })
        })
    }
    componentDidMount() {
        // console.log(this.props)
        axios.get('/auth/me').then(res => {
            if (res.data.user) {
                const {mentorToggle} = res.data
                const { username, user_image, user_id } = res.data.user
                this.props.setUser({ username, user_image, user_id, mentorToggle })
            }
        })
            .catch(err => { alert(`couldn't find user info`, err) })
    }
    render() {
        const { pathname } = this.props.location
        return (
            <div className="Nav">
                {pathname === "/learner" || pathname === "/mentor" || pathname === "/profile" || pathname === "/chat" ?
                    (<><div className="nav-content" >
                        <img
                        className="user-image nav-link"
                        onClick={this.state.navHide === 'nav-links-hidden' ? () => this.setState({navHide: `nav-links`}) : () => this.setState({navHide: `nav-links-hidden`})}
                        src={this.props.user_image}
                        alt='profile-pic'
                        />

                        <div className={`nav ${this.state.navHide}`}>
                            <p>{this.props.username}</p>
                            <Link className="profile-link nav-link" to='/profile'>Profile</Link>
                            <p className="logout nav-link" onClick={this.logout}>Logout</p>
                            <p className="nav-link" onClick={() => this.setState({navHide: `nav-links-hidden`})}><FontAwesomeIcon icon={faCaretLeft} /> Hide</p>
                        </div>
                    </div>
                    <div 
                    className={`dark ${this.state.navHide}`}
                    onClick={() => this.setState({navHide: `nav-links-hidden`})}
                    >
                        </div>
                        </>
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