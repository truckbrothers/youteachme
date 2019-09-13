import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../ducks/reducer'
import { withRouter} from 'react-router-dom'
import './Profile.css'

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        // console.log(this.props)
        axios.get('/auth/me').then(res => {
            if (res.data.user) {
                const { username, user_image, user_id } = res.data.user
                this.props.setUser({ username, user_image, user_id })
            }
        })
            .catch(err => { alert(`couldn't find user info`, err) })
    }
    render() {
        return (
            <div className='profile-page'>
                <div className='general-section'>
                    <img
                            className="user-image"
                            onClick={() => console.log(this.props)}
                            src={this.props.user_image}
                            alt='profile-pic'
                        />
                    {this.props.username}
               </div>
                {/* Render the following component conditionally based on the mentorStatus from the database */}
                {/* The thinking of mentoring section will render if mentorStatus is false */}
                <div className='mentor-section'>
                    <span>Thinking of Mentoring?</span>
                    <button onClick={() => Swal.fire({
                        title: 'Are you sure?',
                        text: "Mentoring is for experts only!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, I wanna mentor!'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                "You're a mentor!",
                                'Be sure to select some skills.',
                                'success'
                                //toggle the mentorStatus for true at this point
                            )
                        }
                    })}>Mentor Today</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const { user_id, username, user_image } = reduxState
    return { user_id, username, user_image }
}
export default connect(mapStateToProps, {setUser})(withRouter(Profile))
