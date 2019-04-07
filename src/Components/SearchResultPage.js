import React from 'react'
import MovieServiceSingleton from "../Services/MovieServiceSingleton"
import {Link} from 'react-router-dom'
import MovieGrid from "./MovieGrid";


export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            searchName: ""

        }
        //this.MovieService = new MovieService();
        this.search = this.search.bind(this);
        this.getSearchName = this.getSearchName.bind(this);
        this.setMovie = this.setMovie.bind(this);

    }

    componentDidMount() {
        if(this.props.location.search !==""){
            this.search(this.props.location.search)
        }
    }

    componentDidUpdate(prevProps) {

    }


    setMovie = (movies)=>{
        this.setState({movieList: movies})
    }

    search = (searchName) => {
        MovieServiceSingleton.search(searchName, this.setMovie)


    }

    getSearchName = (event) => {
        this.setState({
            searchName: event.target.value
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center text-center">
                    <h1 className="logo-text"><b>Husky</b>Movie</h1>
                </div>

                <div className="row justify-content-md-center home-content"><h1 className="main-heading">Find a
                    Movie</h1></div>
                <div className="row justify-content-md-center">
                    <div className="input-group col-sm-11 col-md-8 col-lg-6">
                        <input className="form-control" placeholder="Enter Movie Title" onChange={this.getSearchName}
                               id="CourseEditFld"/>
                        <div className="input-group-append">
                       <button onClick={() => this.search(this.state.searchName)}
                               className="btn btn-success search-btn"
                               aria-label="Plus">
                           <Link to={"/search/keyword?"+this.state.searchName}>
                        search
                           </Link>
                       </button>
                        </div>
                    </div>
                </div>

                    <div className="row justify-content-md-center">
                       <MovieGrid movies = {this.state.movieList}/>
                    </div>
            </div>
        )
    }

}





