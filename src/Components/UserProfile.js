import {Component} from "react";
import {Redirect} from "react-router-dom"
import React from "react";
import UserServiceSingleton from '../Services/UserServiceSingleton';
import CommunicationServiceSingleton from "../Services/CommunicationServiceSingleton"
import MovieThumbnails from './MovieThumbnails'
import '../style/profile.style.css'
import EditProfile from "./EditProfile";
import FollowerList from "./FollowerList";
import FollowedCriticList from "./FollowedCriticList";
import '../../node_modules/font-awesome/css/font-awesome.css';
import ReviewTable from "./ReviewTable";


export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.uid,
            user: {},
            likes: [],
            reviews: [],
            follows: [],
            followed: false,
            refreshFollowersList: false
        }
        this.findUserById = this.findUserById.bind(this);
    }

    componentDidMount() {
        this.findUserById(this.props.match.params.uid)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.findUserById(this.props.match.params.uid);
        }
    }

    refreshFollowersListComponent() {
        console.log(this.state.refreshFollowersList)
        this.setState({
            refreshFollowersList: !this.state.refreshFollowersList
        })
        this.forceUpdate()
    }

    findUserById = (userId) => {
        console.log("finding user by id " + userId);
        UserServiceSingleton.findUserById(userId)
            .then(data => this.setState({user: data}))
            .then(() => UserServiceSingleton.findLikedMoviesByUserId(userId))
            .then(data => this.setState({likes: data}))
            .then(() => UserServiceSingleton.findReviewsByUserId(userId))
            .then(data => this.setState({reviews: data}))
            .then(() => this.findFollower())
            .then(() => console.log(this.state))
    }

    findFollower = () => {
        if (this.state.user.type === "CRITIC") {
            CommunicationServiceSingleton.getFollowersByCritic(this.state.user._id)
                .then(data => this.setState({
                    follows: JSON.parse(data)
                }))
                .then(() => {
                    if (this.props.currentUser != null) {
                        if (this.isCriticFollowed(this.props.currentUser._id)) {
                            this.setState({
                                followed: true
                            })
                        }
                    }
                })
        }
    }

    followCritic = () => {
        let uid = this.props.currentUser._id
        let cid = this.state.user._id
        CommunicationServiceSingleton.followCritic(uid, cid)
            .then(() => this.findFollower())
            .then(() => this.setState({
                followed: true,
                refreshFollowersList: !this.state.refreshFollowersList
            }))
            .then(() => this.refreshFollowersListComponent())
    }

    unfollowCritic = () => {
        let uid = this.props.currentUser._id
        let cid = this.state.user._id
        CommunicationServiceSingleton.unfollowCritic(uid, cid)
            .then(() => this.findFollower())
            .then(() => this.setState({
                followed: false,
                refreshFollowersList: !this.state.refreshFollowersList
            }))
            .then(() => this.refreshFollowersListComponent())

    }

    isCriticFollowed = (uid) => {
        let follows = this.state.follows
        let i, len = follows.length
        for (i = 0; i < len; i++) {
            if (follows[i].moviegoer === uid) {
                return true
            }
        }
        return false
    }

    render() {
        let test_src = "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg";
        if (this.props.currentUser !== null &&
            this.state.user._id === this.props.currentUser._id) {
            return <Redirect to="/profile"/>
        }

        let follow;
        if (this.state.user === undefined) {
            follow = ""
        }
        else {
            if (this.state.user.type === "CRITIC") {
                follow =
                    <div>
                    <h2>Followers</h2>
                    <FollowerList cid={this.state.user._id}
                                  refresh={this.state.refreshFollowersList}/>
                </div>
            }
            else if (this.state.user.type === "MOVIEGOER") {
                follow =
                    <div>
                    <h2>Critics followed</h2>
                    <FollowedCriticList uid={this.state.user._id}
                                        refresh={this.state.refreshFollowersList}/>
                </div>
            }
        }

        let followButton;
        let likes;
        let reviews;
        if (this.props.currentUser !== null) {
            if (this.state.followed) {
                followButton =
                    <button className="btn btn-secondary follow-btn p-1"
                            onClick={() => this.unfollowCritic()}>
                        <i className="fa fa-check"> Followed</i>
                    </button>
            }
            else {
                followButton =
                    <button className="btn btn-warning follow-btn p-1"
                            onClick={() => this.followCritic()}>
                        <i className="fa fa-plus"> Follow</i>
                    </button>
            }
        }
        if (this.state.reviews.length === 0) {
            reviews = <p>Currently no reviews!</p>
        }
        else {
            reviews = <ReviewTable reviews={this.state.reviews}
                                   inProfile="true"/>
        }
        if (this.state.likes.length === 0) {
            likes = <p>Currently no likes!</p>
        }
        else {
            likes = this.state.likes.map((like, index) => <MovieThumbnails
                movie={like.movie}
                key={index}/>)

        }
        return (
            <div className="container-fluid">
                <div className="card p-2 text-center shadow-sm mb-3">
                    <h1 className="card-title">
                        {this.state.user.username}
                    </h1>
                    <div>
                        {
                            this.state.user.type === "CRITIC" ? followButton : ""
                        }
                    </div>
                    <h6 className="card-subtitle m-1">
                        {this.state.user.email}
                    </h6>
                    <a className="card-text m-1">
                        {this.state.user.description}
                    </a>
                </div>
                <div className="padded-content">
                    <div>
                        <h2>Liked Movies</h2>
                            {
                                likes
                            }
                    </div>
                </div>

                <div className="padded-content">
                    <div>
                        <h2>Reviews</h2>
                            {
                                reviews
                            }
                    </div>
                </div>

                <div className="padded-content">
                    {
                        follow
                    }
                </div>
            </div>
        )
    }
}
