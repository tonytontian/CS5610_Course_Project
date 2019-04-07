import React, {Component} from "react";

import "../style/style.css"
import UserServiceSingleton from "../Services/UserServiceSingleton";
import MovieThumbnails from "./MovieThumbnails";
import Review from './Review'
import ReviewTable from "./ReviewTable";
import FollowerList from "./FollowerList";
import FollowedCriticList from "./FollowedCriticList";

export default class EditProfile extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.currentUser);

        this.state = {
            //currentUser: this.props.currentUser,
            currentUser: {},
            likedMovies: [],
            reviews: [],
            followedCritics: [],
            profileUpdated: false,
            myLikes: [],
            myReviews: [],
            loggedIn: false
        }
        this.findUserById = this.findUserById.bind(this);
    }

    findUserById = id => {
        console.log(id)
    }

    componentDidMount() {
        UserServiceSingleton.profile().then(
            res => {
                if(res) {
                    this.setState({
                        currentUser: res,
                        loggedIn: true
                    })
                }
            }
        ).then(() => this.getUserData(this.state.currentUser._id))
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.currentUser !== null){
                this.getUserData(this.props.currentUser._id)
            }
        }
    }

    getUserData(id) {
        UserServiceSingleton.findLikedMoviesByUserId(id)
            .then(data => this.setState({myLikes: data}))
            .then(() => UserServiceSingleton.findReviewsByUserId(id))
            .then(data => this.setState({myReviews: data}))
    }

    updateProfile() {
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let description = document.getElementById("description").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let url = document.getElementById("url").value;

        let user = this.state.currentUser
        user.firstname = firstname;
        user.lastname = lastname;
        user.description = description;
        user.email = email;
        user.phone = phone;
        user.url = url;


        UserServiceSingleton.updateUser(user._id, user)
            .then(res => {
                this.setState({
                    currentUser: res,
                    profileUpdated: true
                })
            })
    }

    render() {
        let profile
        let likes
        let reviews
        if (this.props.currentUser !== null) {
            if (this.state.myReviews.length === 0){
                reviews = <p>Currently no reviews!</p>
            }
            else {
                reviews = <ReviewTable reviews={this.state.myReviews}
                                       inProfile="true"/>
            }
            if (this.state.myLikes.length === 0){
                likes = <p>Currently no likes!</p>
            }
            else {
                likes = this.state.myLikes.map(like => <MovieThumbnails movie={like.movie}/>)

            }

            let follow;
            if (this.state.currentUser === undefined) {
                follow = ""
            }
            else {
                if (this.state.currentUser.type === "CRITIC") {
                    follow =
                            <FollowerList cid={this.state.currentUser._id}
                                          refresh={this.state.refreshFollowersList}/>
                }
                else if (this.state.currentUser.type === "MOVIEGOER") {
                    follow =
                            <FollowedCriticList uid={this.state.currentUser._id}
                                                refresh={this.state.refreshFollowersList}/>
                }
            }


            profile =
                <div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-2 col-sm-0"></div>
                        <div className="col-md-8 col-sm-12">
                            <div className="text-center">
                                <h1 className="align-self-center">
                                    {this.props.currentUser.username}
                                </h1>
                            </div>
                            {
                                this.state.profileUpdated ?
                                    <div className="alert alert-success" role="alert">
                                        Profile updated successfully!
                                    </div>
                                    :
                                    ""
                            }
                            <div className="form-group">
                                <label>First Name</label>
                                <input className="form-control"
                                       id="firstname"
                                       placeholder="First Name"
                                       defaultValue={this.props.currentUser.firstname}>
                                </input>
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input className="form-control"
                                       id="lastname"
                                       placeholder="Last Name"
                                       defaultValue={this.props.currentUser.lastname}>
                                </input>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control fixed-textarea"
                                          rows="5"
                                          id="description"
                                          placeholder="Description"
                                          defaultValue={this.props.currentUser.description}>
                            </textarea>
                            </div>


                            <div className="text-center">
                                <h2>Contact Information</h2>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control"
                                       id="email"
                                       placeholder="Email"
                                       defaultValue={this.props.currentUser.email}>
                                </input>
                            </div>
                            <div className="form-group">

                                <label>Phone</label>
                                <input className="form-control"
                                       id="phone"
                                       placeholder="Phone"
                                       defaultValue={this.props.currentUser.phone}>
                                </input>
                            </div>
                            <div className="form-group">
                                <label>URL</label>
                                <input className="form-control"
                                       id="url"
                                       placeholder="URL (Twitter, Instagram, Github etc.)"
                                       defaultValue={this.props.currentUser.url}>
                                </input>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-success login-btn mt-2"
                                        onClick={() => this.updateProfile()}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-0">
                        </div>
                    </div>

                    <div className="row padded-content">
                        <div className="col-md-2 col-sm-0"></div>
                        <div className="col-md-10 col-sm-12">
                            <h2>Liked Movies</h2>
                            <div className="row">
                                {
                                   likes
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row padded-content">
                        <div className="col-md-2 col-sm-0"></div>
                        <div className="col-md-10 col-sm-12">
                            <h2>Reviews</h2>
                            <div className="row">
                                {
                                    reviews
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row padded-content">
                        <div className="col-md-2 col-sm-0"></div>
                        <div className="col-md-10 col-sm-12">
                            {this.state.currentUser.type === "CRITIC" ?
                                <h2>Followers</h2>
                            :
                                <h2>Critics followed</h2>}
                            <div className="row">
                        {
                            follow
                        }
                            </div>
                        </div>
                    </div>
                </div>
        }
        else {
            profile =
                <p>Must be logged in to view profile</p>
        }
        return (
            <div>
            {
                profile
            }
            </div>
        )
    }

}