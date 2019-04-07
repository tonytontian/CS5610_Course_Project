import React, {Component} from 'react';
import MovieServiceSingleton from "../Services/MovieServiceSingleton";
import UserServiceSingleton from "../Services/UserServiceSingleton";
import UserCard from "../Components/UserCard"
import ReviewCard from "../Components/ReviewCard"
import '../style/details.style.css'
import Row from "react-bootstrap/es/Row";
import Grid from "react-bootstrap/es/Grid";
import Col from "react-bootstrap/es/Col";
import Image from "react-bootstrap/es/Image";
import ReviewTable from "./ReviewTable";
import {Link} from "react-router-dom";
import Rate from "./Rate";

export default class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            likes: [],
            reviews: [],
            rating: 5,
            explanation: "",
            ifliked: false,
            ifreviewed: false,
            edit: false
        }
        //this.MovieService = new MovieService();
        this.getMovieById = this.getMovieById.bind(this);
        this.getLikersByIMDBMovieId = this.getLikersByIMDBMovieId.bind(this);
        this.getLikersByIMDBMovieId_helper = this.getLikersByIMDBMovieId_helper.bind(this);
        this.getAllReviewsForMovie = this.getAllReviewsForMovie.bind(this);
        this.getReviewExplanation = this.getReviewExplanation.bind(this);
        this.getReviewRating = this.getReviewRating.bind(this);
        this.createReviewForMovie = this.createReviewForMovie.bind(this);
        this.cancelLike = this.cancelLike.bind(this);
        this.editReview = this.editReview.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
        this.rateMovie = this.rateMovie.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getMovieById();
            this.getAllReviewsForMovie();
        }
    }


    componentDidMount() {
        this.getMovieById();
        this.getLikersByIMDBMovieId();
        this.getAllReviewsForMovie();
    }

    getMovieById = () => {
        MovieServiceSingleton.getMovieById(this.props.match.params.movieId)
            .then(data => this.setState({movie: data}))
    }

    getLikersByIMDBMovieId = () => {
        this.setState({likes: []}, this.getLikersByIMDBMovieId_helper);
    }


    getLikersByIMDBMovieId_helper = () => {
        console.log(this.state.likes)
        MovieServiceSingleton.getLikesByIMDBMovieId(this.props.match.params.movieId)
            .then(likes =>
                likes.map(like => {
                    UserServiceSingleton.findUserById(like.user)
                        .then(liker => {
                            if (this.props.currentUser !== null && liker._id === this.props.currentUser._id) {
                                this.setState({ifliked: true})
                            }
                            var joined = this.state.likes.concat(liker);
                            this.setState({likes: joined})
                        })
                }))
    }

    getAllReviewsForMovie = () => {
        MovieServiceSingleton.getAllReviewsForMovie(this.props.match.params.movieId)
            .then(reviews => {
                    this.setState({reviews: reviews});
                    console.log(this.state)
                    if (this.props.currentUser !== null) {
                        for (var i in reviews) {
                            if (reviews[i].user === this.props.currentUser._id) {
                                this.setState({ifreviewed: true})
                            }
                        }
                    }
                }
            )

    }

    editReview = (reviewBody) => {
        console.log(reviewBody)
        this.setState({
            edit: true,
            explanation: reviewBody.explanation,
            rating: reviewBody.rating
        }, console.log(this.state))
    }


    likeMovie() {
        if (this.props.currentUser === null) {
            alert("like this movie? Log in first!")
        } else {
            MovieServiceSingleton.likeMovie({
                imdbID: this.state.movie.imdbID,
                Title: this.state.movie.Title,
                Poster: this.state.movie.Poster
            }, this.props.currentUser._id)
                .then(response => this.getLikersByIMDBMovieId());
            this.setState({ifliked: true})
        }
    }


    getReviewExplanation(event) {
        this.setState({explanation: event.target.value})
    }

    getReviewRating(event) {
        this.setState({rating: event.target.value})
    }

    createReviewForMovie() {
        if (this.props.currentUser !== null) {
            let reviewBody = {rating: this.state.rating, explanation: this.state.explanation}
            MovieServiceSingleton.createReviewForMovie(this.props.match.params.movieId, this.props.currentUser._id, reviewBody)
                .then(() => this.getAllReviewsForMovie())
            this.setState({
                rating: 5,
                explanation: "",
                edit: false
            })
        } else {
            alert("please login to review movie")
        }


    }

    cancelLike() {
        MovieServiceSingleton.deleteLike(this.state.movie.imdbID, this.props.currentUser._id)
            .then(response => {
                this.setState({ifliked: false});
                this.getLikersByIMDBMovieId()
            })
    }

    deleteReview() {
        MovieServiceSingleton.deleteReview(this.state.movie.imdbID, this.props.currentUser._id)
            .then(response => {
                this.setState({ifreviewed: false, edit: true});
                this.getAllReviewsForMovie()
            })

    }

    rateMovie(rate) {
        this.setState({rating: rate})
    }

    render() {
        let likeButton;
        let ownReview = [];
        let otherReview = [];
        let likes;
        let reviewSection;

        if (this.props.currentUser !== null && this.props.currentUser._id !== undefined) {
            ownReview =
                this.state.reviews.filter((review) => {
                    if (review.user === this.props.currentUser._id) return review
                })
            otherReview = this.state.reviews.filter((review) => {
                if (review.user !== this.props.currentUser._id) return review
            })
        } else {
            otherReview = this.state.reviews;
        }


        if (this.state.ifliked === true) {
            likeButton = <button className="btn btn-danger"
                                 onClick={() => this.cancelLike()}>Cancel like</button>
        }
        else {

            likeButton = <button className="btn btn-success"
                                 onClick={() => this.likeMovie()}>Like</button>
        }

        if (this.state.likes.length === 0) {
            likes = <p>No users have liked this movie.</p>
        }
        else {
            likes =
                this.state.likes.map((user, index) =>
                    (<UserCard user={user}
                               key={index}
                    />))
        }
        if (this.props.currentUser !== null) {
            if (this.state.ifreviewed === false || this.state.edit === true) {
                reviewSection =
                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Create a New Review:</label>
                            <Rate rateMovie={this.rateMovie}/>
                            <textarea id="explanationInput"
                                      className="form-control"
                                      rows="3"
                                      onChange={this.getReviewExplanation}
                                      value={this.state.explanation}
                            />
                        </div>
                        <button className="btn btn-primary mb-2"
                                onClick={() => this.createReviewForMovie()}>Submit Review
                        </button>
                    </div>
            } else {
                reviewSection =
                    <p className="slight-upper-padding"><i>You already reviewed this movie.<br/>Find another movie if
                        you'd like to submit a review!</i></p>
            }
        }
        else {
            reviewSection =
                <div>
                    <p>
                        You must register or login to post reviews.
                    </p>
                    <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-outline-primary my-2 my-sm-0 mr-2"
                                type="submit">
                            <Link to="/register" className='register-btn'>
                                REGISTER
                            </Link>
                        </button>
                        <button className="btn btn-primary my-2 my-sm-0"
                                type="submit">
                            <Link to="/login" className='login-btn'>
                                LOGIN
                            </Link>
                        </button>
                    </form>
                </div>
        }

        return (

            <div className="container-fluid">
                <Grid>
                    <Row className="justify-content-center">
                        <h1>{this.state.movie.Title}</h1>
                    </Row>

                    <Row className="justify-content-center align-content-center mb-2">
                        {
                            likeButton
                        }
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <Image className="padded-image my-2 mr-2" src={this.state.movie.Poster} thumbnail/>
                        </Col>
                        <Col>
                            <table className="table my-2 ml-2">
                                <tbody>
                                <tr>
                                    <td><b>Year</b></td><td>{this.state.movie.Year}</td>
                                </tr>
                                <tr>
                                    <td><b>Rated</b></td><td>{this.state.movie.Rated}</td>
                                </tr>
                                <tr>
                                    <td><b>Runtime</b></td><td>{this.state.movie.Runtime}</td>
                                </tr>
                                <tr>
                                    <td><b>Genre</b></td><td>{this.state.movie.Genre}</td>
                                </tr>
                                <tr>
                                    <td><b>Director</b></td><td>{this.state.movie.Director}</td>
                                </tr>
                                <tr>
                                    <td><b>Metascore</b></td><td>{this.state.movie.Meatscore || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><b>IMDbRating</b></td><td>{this.state.movie.imdbRating || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><b>IMDbVotes</b></td><td>{this.state.movie.imdbVotes}</td>
                                </tr>
                                </tbody>
                            </table>

                        </Col>
                    </Row>
                    <hr/>
                    <Row className="padded-content">
                        <h4>Likes</h4>
                    </Row>
                    <Row>
                        {
                            likes
                        }
                    </Row>
                    <Row className="padded-content">
                        <h4>Reviews</h4>
                    </Row>
                    <Row className="padded-content">
                        <h6>By Others</h6>
                    </Row>
                    <Row className="indented-content">
                        {
                            <ReviewTable reviews={otherReview}/>
                        }
                    </Row>
                    <Row className="padded-content">
                        <h6>By Me</h6>
                    </Row>
                    <Row>
                        {ownReview.map((review, index) =>
                            <ReviewCard
                                review={review}
                                key={index}
                                ownReview={true}
                                editReview={this.editReview}
                                deleteReview={this.deleteReview}

                            />
                        )
                        }
                    </Row>
                    <Row>
                        {
                            reviewSection
                        }

                    </Row>
                </Grid>
            </div>
        )
    }
}
