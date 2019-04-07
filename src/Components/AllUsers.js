import UserCard from "./UserCard";
import React, {Component} from "react";
import UserServiceSingleton from "../Services/UserServiceSingleton"

export default class AllUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.findAllUsers();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.findAllUsers();
        }
    }

    findAllUsers = () => {
        UserServiceSingleton.findAllUsers()
            .then(users =>
                this.setState({users: users}));

    }

    render() {
        return (
            <div className="row">
                {/*<ul className="card-columns">*/}
                    {
                        this.state.users.map((user, index) =>
                            (<UserCard user={user}
                                       key={index}
                                       currentUser={this.props.currentUser}
                            />))

                    }
                {/*</ul>*/}
            </div>
        )
    }
}