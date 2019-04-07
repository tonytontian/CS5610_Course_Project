import React, {Component} from 'react';
import UserServiceSingleton from "../Services/UserServiceSingleton";
import {Link} from "react-router-dom";
import MovieServiceSingleton from "../Services/MovieServiceSingleton";
import Moment from '../../node_modules/moment';


export default class Review extends Component {
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
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            UserServiceSingleton.findUserById(this.props.review.user)
                .then(user => this.setState({user: user}))
                .then(() => MovieServiceSingleton.getMovieById(this.props.review.movie))
                .then(movie => this.setState({movie: movie}))
        }
    }

    render() {
        Moment.locale('en');
        return (
            <tr>
                <td className="d-none d-sm-block">{Moment(this.props.review.time).format('D/M/YY')}</td>
                <td>
                    <Link to={"/details/" + this.state.movie.imdbID}>{this.state.movie.Title}</Link>
                </td>
                <td>{this.props.review.rating}</td>
                <td className="d-none d-sm-block">{this.props.review.explanation}</td>
            </tr>
        )
    }


}