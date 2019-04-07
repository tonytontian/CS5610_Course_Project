import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../style/searchresult.style.css'

export default class MovieCard extends Component {
    constructor(props){
        super(props);
        this.state ={
            movie : {}
        }
    }


    render() {
        return (
            <div className="card grid-item  movie-card col-md-6 col-lg-3 col-sm-12">
                <img className="card-img-top movie-card-img" src={this.props.movie.Poster}/>
                <div className="card-body">
                    <Link to={"/details/"+this.props.movie.imdbID}><h5 className="card-title">{this.props.movie.Title}</h5></Link>
                    <p className="card-text">{this.props.movie.Year}</p>
                </div>
            </div>
        )
    }
}