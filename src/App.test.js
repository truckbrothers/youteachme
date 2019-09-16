// import React from 'react';
import ReactDOM from 'react-dom';
// import Landing from './Components/Landing/Landing';

import React, { Component } from "react";
// import axios from 'axios';
// import { setUser } from './ducks/reducer'
// import { connect } from 'react-redux'
import { shallow } from 'enzyme';
import { Landing } from './Components/Landing/Landing'

const functions = require('./function');

test('Testing handlechange updates correctly', () => {
  expect(functions.handleChange({ target: { value: 'wyatt' } }, 'name')).toBe('wyatt');
});
test('Testing handlechange updates correctly', () => {
  expect(functions.handleChange({ target: { value: 'David' } }, 'name')).not.toBe('wyatt');
});
test('Testing to see if the state of nav links is exact string below', () => {
  expect(functions.navHide()).toBe('nav-links-hidden');
});
test('Testing to see if state of nav links is opposite', () => {
  expect(functions.navHide()).not.toBe('nav-links');
});
test('Testing to see mentorstatus is an empty string', () => {
  expect(functions.mentorStatusValue()).toBe('');
});
test('Testing to see mentorstatus is an empty string', () => {
  expect(functions.mentorStatusValue()).not.toBe(true);
});
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<Landing />);
   });
 });

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<Landing />);
   });
});

// class Landing extends Component {
//   constructor() {
//     super();

//     this.state = {
//       usernameInput: "",
//       passwordInput: "",
//       register: false,
//     };
//   }

//   handleChange(e, key) {
//     this.setState({
//       [key]: e.target.value
//     });
//   }

//   login = () => {
//     const {
//       usernameInput: username,
//       passwordInput: password
//     } = this.state
//     axios.post('/auth/login', { username, password })
//       .then(res => {
//         const { username, user_id, user_image } = res.data.user
//         this.props.setUser({ username, user_id, user_image })
//           this.props.history.push(`/mentor-check`)
//       })
//       .catch(err => { alert('login failed') })
//   }
//   register = () => {
//     const {
//       usernameInput: username,
//       passwordInput: password
//     } = this.state
//     axios.post('/auth/register', { username, password, user_image: `https://i.pinimg.com/originals/c6/79/ec/c679ecb1779699dac5edfdbc607eba39.jpg`, mentor_status: false })
//       .then(res => {
//         console.log(res)
//         const { username, user_id, user_image } = res.data.user
//         this.props.setUser({ username, user_id, user_image })
//         this.props.history.push('/mentor-check')
//       }
//       )
//       .catch(err => { alert('register failed', err) })
//   }

//   render() {
//     return (
//       <div>
//         <header className="login-header">
//           <h1>youTeachMe</h1>
//         </header>
//         <div className="login-input-container">
//           {this.state.register === false ?
//             (
//             <div>
//               <p>Username:</p>
//               <input
//                 onChange={e => this.handleChange(e, "usernameInput")}
//                 type="text"
//               />
//               <p>Password:</p>
//               <input
//                 onChange={e => this.handleChange(e, "passwordInput")}
//                 type="password"
//               />
//               <button onClick={this.login}>login</button>
//             </div>) : (
              
//               <div>
//               <p>Username:</p>
//               <input
//                 onChange={e => this.handleChange(e, "usernameInput")}
//                 type="text"
//               />
//               <p>Password:</p>
//               <input
//                 onChange={e => this.handleChange(e, "passwordInput")}
//                 type="password"
//               />
//               <button onClick={this.register}>register</button>
//             </div>
            
//             )}
//           <button onClick={() => { this.setState({ register: !this.state.register }) }}>{this.state.register === false ? 'register' : 'cancel'}</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(null, { setUser })(Landing)


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


