import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Learner.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'
import { Button } from 'antd';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Swal from "sweetalert2";

export class Learner extends Component {
  constructor() {
    super();

    this.state = {
      request: '',
      tags: [],
      tagNames: [],
      languages: [],
      mentorStatus: false
    };
  }
  componentDidMount() {
    axios.get(`/users/mentor-status/${this.props.user_id}`)
          .then(res => {
              console.log('learner', res.data[0].mentor_status)
              this.setState({
                  mentorStatus: res.data[0].mentor_status
              })
          })
          .catch(err => {
              console.log(err)
          })
    axios.get('/languages')
      .then(languages => this.setState({
        languages: languages.data
      }))
      .catch(err => console.log("couldn't get languages"))
  }
  submitRequest = () => {
    if (this.state.tags !== [] && this.state.request !== '') {
      axios.post('/request', { user_id: this.props.user_id, request_info: this.state.request, language_id: this.state.tags })
        .then(chat => {
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
    if (this.state.tags.includes(obj) || this.state.tagNames.includes(obj.language_name)) {
      console.log('already selected')
    }
    else {
      this.setState({
        tags: [...this.state.tags, obj.language_id],
        tagNames: [...this.state.tagNames, obj.language_name]
      })
    }
  }
  removeTag = el => {
    const newTags = this.state.tags
    const newTagNames = this.state.tagNames
    newTags.splice(this.state.tags.indexOf(el.language_id), 1)
    newTagNames.splice(this.state.tagNames.indexOf(el.language_name), 1)
    this.setState({
      tags: newTags,
      tagNames: newTagNames
    })
  }

  updateMentorStatus = user_id => {
    axios.put(`/users/updated-mentor-status/${user_id}`).then(res => {
      console.log(res.data);
    });
  };

  render() {
    // const tagMap = this.state.tagNames.map((el, i) =>
    //   <p onClick={() => this.removeTag(i)}>{el}</p>
    //   )
    const languageMap = this.state.languages.map((el, i) =>
      <>
        {(this.state.tags.includes(el.language_id) === false ? (
          <button className="unselected"
            onClick={() => this.handleLanguage(el)}
            // value={el}
            key={el.language_id}>{el.language_name}</button>
        ) :
          <button className="selected"
            onClick={() => this.removeTag(el)}
            // value={el}
            key={el.language_id}>{el.language_name}</button>)}
      </>

    )
    return (
      <div className="learner-section">
        <div className='header'>
          <span className='l-learner'>Learn</span>
          {this.state.mentorStatus === false ? (
          <span
            className='l-mentor'
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                text: "Mentoring is for experts only!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I wanna mentor!"
              }).then(result => {
                if (result.value) {
                  Swal.fire(
                    "You're a mentor!",
                    "Be sure to select some skills.",
                    "success"
                  );
                  this.updateMentorStatus(this.props.user_id);
                  this.props.history.push('/profile')
                }
              })
            }
            // onClick={() => this.props.history.push('/mentor')}
          >Mentor</span>) : (
            <span className='l-mentor' onClick={() => this.props.history.push('/mentor')}>Mentor</span>
          )}
        </div>
        <div className='learn-container'>
          <h1>Ask a Mentor</h1>
          <hr></hr>
          <form>
            <textarea onChange={e => this.handleChange(e)} placeholder='Prefix @@@ on any code to maintain formatting...'></textarea>
            <div className='learner-language-container'>
              {languageMap}
            </div>

            <Button onClick={this.submitRequest} className='submit' type="primary">Submit</Button>
          </form>
          {/* {tagMap} */}
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
