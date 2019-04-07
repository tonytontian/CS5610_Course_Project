import {Component} from "react";
import React from "react";
import CommunicationServiceSingleton from "../Services/CommunicationServiceSingleton"
import UserCard from "./UserCard";
import UserServiceSingleton from "../Services/UserServiceSingleton";

export default class FollowerList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            followers: [],
            cid: this.props.cid
        }
        this.getFollowers()
    }

    componentWillReceiveProps(props) {
        if(this.props.refresh !== props.refresh) {
            this.getFollowers()
        }
    }

    componentDidMount() {
        this.getFollowers()
    }

    getFollowers() {
        let followers = []
        CommunicationServiceSingleton.getFollowersByCritic(this.props.cid)
            .then(res => JSON.parse(res))
            .then(res => res.map(
                follow =>
                    UserServiceSingleton.findUserById(follow.moviegoer)
                        .then(user => followers.push(user))
            ))
            .then(() => this.setState({
                followers: followers
            }))
    }

    render() {
        if(this.state.followers.length === 0) {
            return (
                <div>
                    <h5>
                        Currently no followers!
                    </h5>
                </div>
            )
        }
        return (


                    this.state.followers.map(user => <UserCard user={user}/>)


        )
    }

}