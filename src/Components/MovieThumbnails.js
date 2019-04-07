import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import MovieServiceSingleton from "../Services/MovieServiceSingleton";

export default class MovieThumbnails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            movie: {},
        }
    }

    componentDidMount() {
        this.getMovie(this.props.movie);
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getMovie(this.props.movie);
        }
    }

    getMovie = (imdbID) => {
        MovieServiceSingleton.getMovieById(imdbID)
            .then(data => this.setState({movie: data}))
    }

    render() {
        //console.log(this.state.movie)
        return (
            <div className="card col-lg-2 col-md-3 col-sm-4 col-xs-4 border-0">
                <img className="card-img-top movie-card-img"
                     src={this.state.movie.Poster} alt="cannot get movie poster"/>
                <Link className="card-body"
                      to={"/details/" + this.state.movie.imdbID}>{this.state.movie.Title}
                </Link>
            </div>
        )
    }

}