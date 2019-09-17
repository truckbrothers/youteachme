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
      tagNames: [],
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
  handleLanguage = obj => {
    if(this.state.tags.includes(obj) || this.state.tagNames.includes(obj.language_name)){
      console.log('already selected')
    }
    else{
      this.setState({
        tags: [...this.state.tags, obj.language_id],
        tagNames: [...this.state.tagNames, obj.language_name]
      })
    }
  }
  removeTag = i => {
    const newTags = this.state.tags
    const newTagNames = this.state.tagNames
    newTags.splice(i, 1)
    newTagNames.splice(i,1)
    this.setState({
      tags: newTags,
      tagNames: newTagNames
    })
  }
  render() {
    const tagMap = this.state.tagNames.map((el, i) =>
      <p onClick={() => this.removeTag(i)}>{el}</p>
      )
    const languageMap = this.state.languages.map(el => 
      <>{(this.state.tags.includes(el.language_id) === false ? (
        <option onClick={() => this.handleLanguage(el)} key={el.language_id}>{el.language_name}</option>)
        :
        null)}
        </>
      
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
          {tagMap}
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
