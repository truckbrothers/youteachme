import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Learner.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'
import { Button } from 'antd';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

export class Learner extends Component {
  constructor() {
    super();

    this.state = {
      request: '',
      tags: [],
      languages: []

    };
  }
  componentDidMount() {
    axios.get('/languages')
    .then(languages => this.setState({
      languages: languages.data
    }))
    .catch(err=> console.log("couldn't get languages"))
  }
  submitRequest = () => {
    if(this.state.tags !== [] && this.state.request !== '') {
      axios.post('/request', {user_id:this.props.user_id, request_info: this.state.request, language_id: this.state.tags})
      .then( chat => {
        this.props.history.push(`/chat/${chat.data[0].chat_id}`)
      })
      .catch(err => console.log(`couldn't submit request`))
    }
    else {
      console.log(`make sure you add tags and request information`)
    }
  }
  handleChange = e => {
    this.setState({
      request: e.target.value
    })
  }
  handleLanguage = id => {
    if(this.state.tags.includes(id)){
      console.log('already selected')
    }
    else{
      this.setState({
        tags: [...this.state.tags, id]
      })
    }
  }
  render() {
    const languageMap = this.state.languages.map(el => 
      <option onClick={() => this.handleLanguage(el.language_id)} key={el.language_id}>{el.language_name}</option>
    )
    return (
      <div className="learner-section">
        <div className='header'>
          <span className='l-learner'>Learner</span>
          <span
            className='l-mentor'
            onClick={() => this.props.history.push('/mentor')}
          >Mentor</span>
        </div>
        <div className='message-container'>
          <h1>Ask a Mentor</h1>
          <form>
            <textarea onChange={e => this.handleChange(e)} placeholder='Some text...'></textarea>
            <select>{languageMap}</select>
            <Button onClick={this.submitRequest} className='submit' type="primary">Submit</Button>
          </form>
        </div>

      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { toggleStatus, user_id } = reduxState
  return { toggleStatus, user_id }
}

export default connect(mapStateToProps, { mentorToggle })(withRouter(Learner))
