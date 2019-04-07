import React, {Component} from 'react'
import MovieCard from './MovieCard'
import '../style/searchresult.style.css'
export default class MovieGrid extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="row movie-grid">{
                this.props.movies.map((movie, index) =>
                (<MovieCard movie={movie} key={index}/>))
            }
            </div>

    )
    }

}