import React, {Component} from 'react';
import UserServiceSingleton from "../Services/UserServiceSingleton";
import {Link} from "react-router-dom";
import MovieServiceSingleton from "../Services/MovieServiceSingleton";
import Moment from '../../node_modules/moment';
import { Star } from "@material-ui/icons";

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            movie: {}
        }
    }

    componentDidMount() {
        UserServiceSingleton.findUserById(this.props.review.user).then(user => this.setState({user: user}))
            .then(() => MovieServiceSingleton.getMovieById(this.props.review.movie))
            .then(movie => this.setState({movie: movie}))
            .then(() => console.log(this.state.movie))
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            UserServiceSingleton.findUserById(this.props.review.user)
                .then(user => this.setState({user: user}))
                .then(() => MovieServiceSingleton.getMovieById(this.props.review.movie))
                .then(movie => this.setState({movie: movie}))
        }
    }

    /*
    <div className="card m-2">
                <div className="card-body">
                    <h3 className="card-title"><a>{this.state.user.username}</a></h3>
                    <h6 className="card-subtitle mb-2 text-muted">{Moment(this.props.review.time).format('D/M/YY')}</h6>
                    <p className="card-text">{this.props.review.explanation}</p>

                    {this.props.ownReview === true?
                        <div>
                            <a href="#" className="card-link" onClick={()=>this.props.editReview(this.props.review)}>Edit</a>
                            <a href="#" className="card-link" onClick={()=>this.props.deleteReview()}>Delete</a>
                        </div> : <div></div>
                    }
                    </div>
            </div>
     */

    render() {
        Moment.locale('en');
        return (
            <div className="card m-2 border-0">
                <div className="card-body">
                    <h3 className="card-title">
                        {
                            this.props.inProfile === "true" ?
                                <Link to={"/details/" + this.state.movie.imdbID}>{this.state.movie.Title}
                                </Link>
                                :
                                <Link
                                    to={"/profile/" + this.state.user._id}>{this.state.user.username}
                                </Link>
                        }

                    </h3>
                    <h6 className="card-subtitle mb-2 text-muted">{Moment(this.props.review.time).format('D/M/YY')}</h6>
                    {Array(this.props.review.rating).fill(<Star className="star" />)}

                    <p className="card-text">{this.props.review.explanation}</p>


                    {this.props.ownReview === true ?
                        <div>
                            <a href="#" className="card-link"
                               onClick={() => this.props.editReview(this.props.review)}>Edit</a>
                            <a href="#" className="card-link" onClick={() => this.props.deleteReview()}>Delete</a>
                        </div> : <div></div>
                    }
                </div>
            </div>

    )
    }


    }