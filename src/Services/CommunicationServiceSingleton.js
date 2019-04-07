const API_URL = 'https://floating-anchorage-21763.herokuapp.com/api/';
// const API_URL = 'http://localhost:3000/api/';

export default class UserServiceSingleton {


    //--------------------- For Follow -----------------------//
    static followCritic = (uid, cid) => {
        return fetch(API_URL + "follow/moviegoer/" + uid + "/critic/" + cid, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST"
        }).then(res => res.json())
    };

    static unfollowCritic = (uid, cid) => {
        return fetch(API_URL + "unfollow/moviegoer/" + uid + "/critic/" + cid, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST"
        }).then(res => res.json())
    }

    static getFollowersByCritic = id => {
        return fetch(API_URL + "follow/critic/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(res => res.text())
            .then(res => res)
    };

    static getFollowsByMovieGoer = id => {
        return fetch(API_URL + "follow/moviegoer/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(res => res.text())
            .then(res => res)
    }

    //---------------------- For Update -----------------------//

    static getUpdatesByCritic = cid => {
        return fetch(API_URL + "update/user/" + cid, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(res => res.text())
            .then(res => {
                console.log(res)
                return res
            })
            .then(res => JSON.parse(res))
    }

    static getUpdateForMovieGoer = uid => {
        return fetch(API_URL + "update/moviegoer/" + uid, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(res => res.text())
            .then(res => JSON.parse(res))
    }

    static createUpdate = (cid, text) => {
        let reqBody = {
            text: text
        }
        return fetch(API_URL + "update/user/" + cid, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(reqBody),
            method: "POST"
        })
            .then(res => res.text())
    }

    static deleteUpdateById = (id) => {
        return fetch(API_URL + "update/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "DELETE"
        })
    }

}