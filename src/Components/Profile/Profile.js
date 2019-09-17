import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";
import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      mentorStatus: "",
      loading: false,
      skills: []
    };
  }
  componentDidMount() {
    axios
      .get("/auth/me")
      .then(res => {
        if (res.data.user) {
          const { username, user_image, user_id } = res.data.user;
          this.props.setUser({ username, user_image, user_id });
        }
      })
      .catch(err => {
        alert(`couldn't find user info`, err);
      });
    axios
      .get(`/users/mentor-status/${this.props.user_id}`)
      .then(res => {
        this.setState({
          mentorStatus: res.data[0].mentor_status
        });
      })
      .catch(err => {
        console.log(err);
      });
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

  updateMentorStatus = user_id => {
    axios.put(`/users/updated-mentor-status/${user_id}`).then(res => {
      console.log(res.data);
    });
  };

  addOrDeleteUserSkill = e => {
    const { user_id } = this.props;
    const language_id = e.target.value;
    const skillsArr = [];
    axios.get("/mentors/languages").then(res => {
      //   if user has no saved skills, add selected skill
      if (res.data.length === 0) {
        axios.post("/mentors", {
          user_id,
          language_id
        }).then(res => {
          res.data.map(el => {
            console.log(el.language_id)
            skillsArr.push(el.language_id)
            this.setState({
              skills: skillsArr
            })
          })
        })
        // if user has 1+ skills, check if user already has selected skill
      } else {
        const foundLanguage = res.data.find(el => {
          // if user has selected skill, delete that skill from db
          return el.language_id === +language_id;
        });
        if (foundLanguage) {
          axios.delete(`/mentors/languages/${foundLanguage.language_id}`).then(res => {
            console.log(res.data)
            res.data.map(el => {
              skillsArr.push(el.language_id)
              this.setState({
                skills: skillsArr
              })
            })
          });
        } else {
          axios.post("/mentors", {
            user_id,
            language_id
          }).then(res => {
            res.data.map(el => {
              skillsArr.push(el.language_id)
              this.setState({
                skills: skillsArr
              })
            })
          })
        }
      }
    });
  };

  render() {
    return (
      <div className="profile-page">
        <div className="general-section">
          <img
            className="user-image"
            onClick={() => console.log(this.props)}
            src={this.props.user_image}
            alt="profile-pic"
          />
          {this.props.username}
        </div>
        {this.state.loading ? (
          <div className="loading-spinner">
            <img
              src="https://icon-library.net//images/spinner-icon-gif/spinner-icon-gif-1.jpg"
              width="150"
            />
          </div>
        ) : null}
        {this.state.mentorStatus === false ? (
          <div className="mentor-section">
            <span>Thinking of Mentoring?</span>
            <button
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
                    this.setState({
                      loading: true
                    });
                    Swal.fire(
                      "You're a mentor!",
                      "Be sure to select some skills.",
                      "success"
                    );
                    this.updateMentorStatus(this.props.user_id);
                    setTimeout(() => window.location.reload(), 10000);
                  }
                })
              }
            >
              Mentor Today
            </button>
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
