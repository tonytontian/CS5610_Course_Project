import {Component} from "react";
import React from "react";
import CommunicationServiceSingleton from "../Services/CommunicationServiceSingleton";
import UserServiceSingleton from "../Services/UserServiceSingleton";
import UserCard from "./UserCard";


export default class FollowedCriticList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            critics: [],
            uid: this.props.uid
        }
    }

    componentDidMount() {
        let critics = []
        CommunicationServiceSingleton.getFollowsByMovieGoer(this.props.uid)
            .then(res => JSON.parse(res))
            .then(res => res.map(
                follow =>
                    UserServiceSingleton.findUserById(follow.critic)
                        .then(user => critics.push(user))
            ))
            .then(() => this.setState({
                critics: critics
            }))
            .then(() => console.log(this.state))
    }

    render() {
        if(this.state.critics.length === 0) {
            return (
                <div>
                    Currently no critic followed!
                </div>
            )
        }
        else {
            return (

                        this.state.critics.map(user => <UserCard user={user}/>)

            )
        }
    }
}