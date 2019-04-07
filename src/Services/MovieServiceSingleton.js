import {Component} from 'react';

const API_URL = 'https://floating-anchorage-21763.herokuapp.com/api/';
// const API_URL = 'http://localhost:3000/api/';
let url = 'https://www.omdbapi.com?apikey=a98a0710';

export default class MovieServiceSingleton extends Component {


    static search(searchName, func) {
        let movies = [];
        let keywordURLs = [
            url + '&s=' + searchName +'&page=1',
            url + '&s=' + searchName +'&page=2']

        function concat (movies, promise, CatchError = func) {
            if (promise.Response === 'True') {

                movies = movies.concat(promise.Search);
                return movies;

            } else {
                CatchError([]);
                throw Error("no movies match search");

            }
        }

        function Concat(results, movies){
            movies = results.reduce(concat, movies)
            func(movies)
        }


        let promises = keywordURLs.map(keywordURL =>fetch(keywordURL).then(res => res.json()));

        Promise.all(promises).then(results => Concat(results, movies))

    }


    static getMovieById(imdbId) {
        let idURL = url + "&i=" + imdbId;
        return fetch(idURL).then(res => res.json())
    }

    static getLikesByIMDBMovieId = (mid) => {
        return fetch(API_URL + "movie/" + mid + "/like")
            .then(response =>
                response.json())

    }

    static getAllLikes = () => {
        return fetch(API_URL + "like")
            .then(response =>
                response.json())
    }




    static getMovieByDatabaseId = (id) => {
        return fetch(API_URL + "movie/db/" + id)
            .then(response =>
                response.json())

    }

    static likeMovie = (movie, uid) => {
        return fetch(API_URL + "like/user/" + uid, {
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST"
        }).then(res => res.json())
    }

    static deleteLike = (mid, uid) =>{
        return fetch(API_URL + "like/user/" + uid +"/movie/" + mid, {
            method: "DELETE"
        }).then(res => res.json())
    }


//------------------ reviews --------------------//


    static getAllReviews = () => {
        return fetch(API_URL + "review")
            .then(response =>
                response.json())
    }

    static getAllReviewsForMovie = (movieId) =>{
        return fetch(API_URL +"movie/"+ movieId + "/review").then(response =>response.json())
    }


    static createReviewForMovie = (movieId, userId, reviewBody) => {
        return fetch(API_URL + "movie/" + movieId + "/user/" + userId + "/review",{
            body:JSON.stringify(reviewBody),
                headers: {
                    'Content-Type': 'application/json'
                },
            method:"POST"
        }).then(response =>console.log(response))
    }

    static deleteReview = (movieId, userId) =>{
        return fetch(API_URL + "review/user/" + userId + "/movie/"+movieId, {
            method: "DELETE"
        }).then(res => res.json()).catch(error =>console.log(error))
    }



}


