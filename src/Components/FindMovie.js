import React from 'react';
import MovieRow from './MovieRow'
import MovieServiceSingleton from "../Services/MovieServiceSingleton";
import UserServiceSingleton from "../Services/UserServiceSingleton";
import UserCard from "./UserCard";
import MovieThumbnails from "./MovieThumbnails";
import '../style/home.style.css'
import {Link} from 'react-router-dom'


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            searchName: "",
            recentLikes: [],
            recentReviews: [],
            recentSignUps: [],
            myRecentLikes: [],
            myRecentReviews: [],
            myRecentUpdates: []

        }
        //this.MovieService = new MovieService();
        this.search = this.search.bind(this);
        this.getSearchName = this.getSearchName.bind(this);

    }

    componentDidMount() {
        this.getRecentData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getRecentData();
        }
    }

    getRecentData = () => {
        if (this.props.currentUser == null) {
            MovieServiceSingleton.getAllLikes()
                .then(data => this.setState({recentLikes: data}))
                .then(() => MovieServiceSingleton.getAllReviews())
                .then(data => this.setState({recentReviews: data}))
                .then(() => UserServiceSingleton.findAllUsers())
                .then(data => this.setState({recentSignUps: data}))

        } else {
            UserServiceSingleton.findLikedMoviesByUserId(this.props.currentUser._id)
                .then(data => this.setState({myRecentLikes: data}))
                .then(() => UserServiceSingleton.findReviewsByUserId(this.props.currentUser._id))
                .then(data => this.setState({myRecentReviews: data}))
        }
    }

    search = (searchName) => {
        MovieServiceSingleton.search(searchName)
            .then(data =>
                this.setState({movieList: data}))
            .catch(error => {
                console.log(error);
                alert("No movie titles match your search. Please try again.")
            });
    }

    getSearchName = (event) => {
        this.setState({
            searchName: event.target.value
        })
    }

    render() {
        let recentContent;
        let recentLikes;
        let recentReviews;
        let recentUsers;

        if (this.props.currentUser === null) {
            console.log("user not logged in, getting generic content")
            if (this.state.recentLikes.length === 0) {
                recentLikes = <p className="padded-left">No Recent Likes</p>
            } else {
                console.log(this.state.recentLikes)
                let l = Math.min(this.state.recentLikes.length, 3)
                recentLikes = this.state.recentLikes.slice(0, l).map((like, index) =>
                    <MovieThumbnails
                        movie={like.movie}
                        key={index}/>)
            }
            if (this.state.recentReviews.length === 0) {
                recentReviews = <p className="padded-left">No Recent Reviews</p>
            } else {
                console.log(this.state.recentReviews)
                let l = Math.min(this.state.recentReviews.length, 3)
                recentReviews = this.state.recentReviews.slice(0, l).map((like, index) =>
                    <MovieThumbnails
                        movie={like.movie}
                        key={index}/>)
            }
            if (this.state.recentSignUps.length === 0) {

                recentUsers = <p className="padded-left">No Recent Sign Ups</p>
            } else {

                let l = Math.min(this.state.recentSignUps.length, 3)
                recentUsers = this.state.recentSignUps.slice(0, l).map((user, index) =>
                    <UserCard
                        user={user}
                        key={index}/>)
            }

            recentContent =
                <div>
                    <div className="row justify-content-md-center home-content"><h1>Recent Activity By Users</h1></div>
                    <div className="home-content">
                        <h4>Most Recently Liked Movies</h4>
                        <div className="row">{recentLikes}</div>
                    </div>
                    <div className="home-content">
                        <h4>Most Recently Reviewed Movies</h4>
                        <div className="row">{recentReviews}</div>
                    </div>
                    <div className="home-content">
                        <h4>Newest Users</h4>
                        <div className="row card-group">{recentUsers}</div>
                    </div>
                </div>
        }
        else {
            let myRecentLikes;
            let myRecentReviews;
            if (this.state.myRecentLikes.length === 0) {

                myRecentLikes = <p className="padded-left">No Recent Likes</p>
            } else {
                let l = Math.min(this.state.myRecentLikes.length, 3)
                myRecentLikes = this.state.myRecentLikes.slice(0, l).map((like, index) =>
                    <MovieThumbnails
                        movie={like.movie}
                        key={index}/>)
            }
            if (this.state.myRecentReviews.length === 0) {
                myRecentReviews = <p className="padded-left">No Recent Reviews</p>
            } else {
                let l = Math.min(this.state.myRecentReviews.length, 3);
                myRecentReviews = this.state.myRecentReviews.slice(0, l).map((like, index) =>
                    <MovieThumbnails
                        movie={like.movie}
                        key={index}/>)
            }
            recentContent =
                <div>
                    <div className="row justify-content-md-center home-content"><h1>Your Recent Activity</h1></div>
                    <div className="home-content">
                        <h4>You Liked...</h4>
                        <div className="row">{myRecentLikes}</div>
                    </div>
                    <div className="home-content">
                        <h4>You Reviewed...</h4>
                        <div className="row">{myRecentReviews}</div>
                    </div>
                </div>

        }

        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center text-center">
                    <h1 className="logo-text"><b>Husky</b>Movie</h1>
                    <div className="col-10">
                        <p>Welcome to Husky Movie — a space for Moviegoers and Critics to find, browse, like, and review
                            movies. Curious whether the newest box office hit is worth a trip to the theater? Search for
                            it here to check out reviews and likes by both MovieGoers and Critics. </p>
                    </div>
                </div>
                <div className="row justify-content-md-center home-content"><h1 className="main-heading">Find a
                    Movie</h1></div>
                <div className="row justify-content-md-center">
                    <div className="input-group col-sm-11 col-md-8 col-lg-6">
                        <input className="form-control" placeholder="Enter Movie Title" onChange={this.getSearchName}
                               id="CourseEditFld"/>
                        <div className="input-group-append">
                            <button className="btn btn-success search-btn"
                                    aria-label="Plus"><Link to={'/search/keyword?' + this.state.searchName}>
                                search
                            </Link>
                            </button>
                        </div>
                    </div>


                </div>


                <div>
                    {
                        recentContent
                    }
                </div>
            </div>
        )
    }

}





