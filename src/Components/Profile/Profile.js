import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";
import "./Profile.css";
import { Button } from 'antd';

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      mentorStatus: false,
      loading: false,
      skills: [],
      editImage: false,
      image: ""
    };
  }
  componentDidMount() {
    axios
      .get("/auth/me")
      .then(res => {
        if (res.data.user) {
          const { username, user_image, user_id } = res.data.user;
          this.props.setUser({ username, user_image, user_id });
          axios.get(`/users/mentor-status/${this.props.user_id}`)
          .then(res => {
              console.log(res.data[0].mentor_status)
              this.setState({
                  mentorStatus: res.data[0].mentor_status
              })
          })
          .catch(err => {
              console.log(err)
          })
        }
      })
      .catch(err => {
        alert(`couldn't find user info`, err);
      });
    // axios
    //   .get(`/users/mentor-status/${this.props.user_id}`)
    //   .then(res => {
    //     console.log(res.data[0].mentor_status)
    //     this.setState({
    //       mentorStatus: res.data[0].mentor_status
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    const skillsArr = [];
    axios.get("/mentors/languages").then(res => {
      res.data.map(el => {
        skillsArr.push(el.language_id);
        this.setState({
          skills: skillsArr
        });
      });
    });
  }

  componentDidUpdate(prevState) {
    if (this.state.mentor_status !== prevState.mentor_status) {
      axios
      .get(`/users/mentor-status/${this.props.user_id}`)
      .then(res => {
        console.log(res.data[0].mentor_status)
        this.setState({
          mentorStatus: res.data[0].mentor_status
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
   
  }

  toggleEdit() {
    this.setState({ editImage: !this.state.editImage });
  }
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }
  updateImage() {
    const { image: user_image } = this.state;
    axios
      .put(`/users/update-user-image`, {
        user_image,
        user_id: this.props.user_id
      })
      .then(res => {
        this.toggleEdit();
        this.props.setUser({
          username: this.props.username,
          user_id: this.props.user_id,
          user_image
        });
      })
      .catch(err => {
        alert("Sorry! Try Updating again.");
      });
    this.setState({
      image: ""
    });
  }

  updateMentorStatus = user_id => {
    axios.put(`/users/updated-mentor-status/${user_id}`).then(res => {
      console.log(res.data);
      this.setState({
        mentorStatus: true
      })

    });
  };

  addOrDeleteUserSkill = e => {
    const { user_id } = this.props;
    const language_id = e.target.value;
    const skillsArr = [];
    axios.get("/mentors/languages").then(res => {
      //   if user has no saved skills, add selected skill
      if (res.data.length === 0) {
        axios
          .post("/mentors", {
            user_id,
            language_id
          })
          .then(res => {
            res.data.map(el => {
              skillsArr.push(el.language_id);
              this.setState({
                skills: skillsArr
              });
            });
          });
      }
      // if user has 1 skill, check if that skill matches selected skill
      else if (res.data.length === 1) {
        const foundLanguage = res.data.find(el => {
          return el.language_id === +language_id;
        });
        if (foundLanguage) {
          axios
            .delete(`/mentors/languages/${foundLanguage.language_id}`)
            .then(res => {
              this.setState({
                skills: []
              });
            });
        } else {
          axios
            .post("/mentors", {
              user_id,
              language_id
            })
            .then(res => {
              res.data.map(el => {
                skillsArr.push(el.language_id);
                this.setState({
                  skills: skillsArr
                });
              });
            });
        }
      }
      // if user has 2+ skills, check if user already has selected skill
      else {
        const foundLanguage = res.data.find(el => {
          // if user has selected skill, delete that skill from db
          return el.language_id === +language_id;
        });
        if (foundLanguage) {
          axios
            .delete(`/mentors/languages/${foundLanguage.language_id}`)
            .then(res => {
              res.data.map(el => {
                skillsArr.push(el.language_id);
                this.setState({
                  skills: skillsArr
                });
              });
            });
        } else {
          axios
            .post("/mentors", {
              user_id,
              language_id
            })
            .then(res => {
              res.data.map(el => {
                skillsArr.push(el.language_id);
                this.setState({
                  skills: skillsArr
                });
              });
            });
        }
      }
    });
  };

  render() {
    let { editImage } = this.state;
    const editStyle = this.state.editImage ? {} : { display: "none" };
    return (
      <div className="profile-page">
        <div className="general-section">
          <div className="image-area">
            <img
              className="user-image"
              onClick={() => this.toggleEdit()}
              src={this.props.user_image}
              alt="profile-pic"
            />
            <p onClick={() => this.toggleEdit()} className="text">
              Edit Photo
            </p>
          </div>
          <div className="edit-image-section" style={editStyle}>
            <input
              type="text"
              onChange={e => this.handleChange(e, "image")}
              placeholder="New Img Url"
              value={this.state.image}
            />
            <div className="hidden-buttons">
              <button id="save-button" onClick={() => this.updateImage()}>
                Save
              </button>
              <button id="cancel-button" onClick={() => this.toggleEdit()}>
                Cancel
              </button>
            </div>
          </div>
          <span className="username-text">{this.props.username}</span>
        </div>
        {this.state.mentorStatus === false ? (
          <div className="learner-view">
            <span>Thinking of Mentoring?</span>
            <Button
              className='profile-mentor-check-button grow'
              onClick={async () =>
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
                  }
                })
              }
            >
              Mentor Today
            </Button>
          </div>
        ) : (
          <div className="mentor-view">
            <h1>Select Your Skills</h1>
            <div className="skills-buttons">
              <button
                className={
                  this.state.skills.includes(1) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="1"
              >
                JavaScript
              </button>
              <button
                className={
                  this.state.skills.includes(2) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="2"
              >
                HTML
              </button>
              <button
                className={
                  this.state.skills.includes(3) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="3"
              >
                CSS
              </button>
              <button
                className={
                  this.state.skills.includes(4) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="4"
              >
                React
              </button>
              <button
                className={
                  this.state.skills.includes(5) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="5"
              >
                SQL
              </button>
              <button
                className={
                  this.state.skills.includes(6) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="6"
              >
                Redux
              </button>
              <button
                className={
                  this.state.skills.includes(7) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="7"
              >
                Python
              </button>
              <button
                className={
                  this.state.skills.includes(8) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="8"
              >
                Angular
              </button>
              <button
                className={
                  this.state.skills.includes(9) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="9"
              >
                NodeJS
              </button>
              <button
                className={
                  this.state.skills.includes(10) ? "selected" : "unselected"
                }
                onClick={e => this.addOrDeleteUserSkill(e)}
                value="10"
              >
                TypeScript
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { user_id, username, user_image } = reduxState;
  return { user_id, username, user_image };
}
export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(Profile));
