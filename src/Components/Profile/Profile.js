import React, {Component} from 'react'

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
            <div>
               <div className='general-section'>
                Profile Image
                Username
               </div>
               {/* Render the following component conditionally based on the mentorStatus from the database */}
               {/* The "thinking of mentoring" section will render if mentorStatus is false */}
               <div className='mentor-section'>
                <span>Thinking of Mentoring?</span>
                <button>Mentor Today</button>
               </div>
            </div>
        )
    }
}
export default Profile