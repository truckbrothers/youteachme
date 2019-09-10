import React, { Component } from 'react'
import Swal from 'sweetalert2'
import './Profile.css'

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='profile-page'>
                <div className='general-section'>
                    <img src="https://i.pinimg.com/originals/83/1d/fc/831dfc803d8ed73168d9d5212a156932.jpg" />
                    Test Username
               </div>
                {/* Render the following component conditionally based on the mentorStatus from the database */}
                {/* The "thinking of mentoring" section will render if mentorStatus is false */}
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
export default Profile