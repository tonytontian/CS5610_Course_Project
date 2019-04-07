const API_URL = 'https://floating-anchorage-21763.herokuapp.com/api/';
// const API_URL = 'http://localhost:3000/api/';

export default class UserServiceSingleton {
    static register = (user) => {
        return fetch((API_URL + "register"), {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
                console.log("Username is already taken")
                throw new Error("Username is already taken")
            }
        })
    }

    static login = (user) => {
        return fetch((API_URL + "login"), {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST'
        })
            .then(function(response) {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Username/Password do not match!")
                    throw new Error("Username/Password do not match!")
                }
            })
            /*.then(function(response) {
                if (response.ok) {
                    //return response.json()
                    return response;
                }
                throw Error(response.statusText);
            }).then(function(response) {
            return response.json();
        }).then(function(json){
            console.log('Request succeeded with JSON response:', json);
        }).catch(function(error) {
            console.log('Request failed:', error.message);
        });*/
    }

    static logout = () => {
        return fetch((API_URL + "logout"), {
            body: '',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST'
        })
    }


    static profile = () => {
        return fetch(API_URL + "profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(response => response.text())
            .then(res => {
                if(res === "") {
                    return null
                }
                return JSON.parse(res)
            })
    }


    static findAllUsers = () => {
        return fetch(API_URL + "user")
            .then(response =>
                response.json())
    }

    static findUserById = (id) => {
        return fetch(API_URL + "user/" + id)
            .then(response =>
                response.json())
    }

    static findUserByCredentials = (username, password) => {
        return fetch(API_URL + "user/" + username + "/" + password)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("User not found")
                    throw new Error("User not found")
                }
            })

    }

    static updateUser = (id, user) => {
        return fetch((API_URL + "user/" + id), {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(response =>
            response.json())

    }

    static findLikedMoviesByUserId = id =>
        fetch((API_URL + "like/user/" + id), {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(res => res.json())

    static findReviewsByUserId = id =>
        fetch((API_URL + "review/user/" + id), {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(res => res.json())
}
