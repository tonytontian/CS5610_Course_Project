import React, {Component} from 'react';
import UpdateCard from "./UpdateCard";

import CommunicationServiceSingleton from "../Services/CommunicationServiceSingleton"
import UserServiceSingleton from "../Services/UserServiceSingleton";
import {Link} from "react-router-dom";

export default class UpdatePage extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.currentUser)
        this.state = {
            currentUser: null,
            updates: [],
            critics: []
        }
        console.log(this.state)
    }

    componentDidMount() {
        // get current user
        UserServiceSingleton.profile().then(
            res => {
                if (res) {
                    this.setState({
                        currentUser: res
                    })
                }
            }
        )
            .then(() => {
                // get updates from users followed by current user
                if (this.state.currentUser) {
                    CommunicationServiceSingleton.getUpdateForMovieGoer(this.state.currentUser._id)
                        .then(res => this.setState({
                            updates: res
                        }))
                }
            })
    }

    render() {
        if (this.state.currentUser == null) {
            return (
                <div>
                    <p>
                        You must register or login to view updates from Critics.
                    </p>
                    <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-outline-primary my-2 my-sm-0 mr-2"
                                type="submit">
                            <Link to="/register" className='register-btn'>
                                REGISTER
                            </Link>
                        </button>
                        <button className="btn btn-primary my-2 my-sm-0"
                                type="submit">
                            <Link to="/login" className='login-btn'>
                                LOGIN
                            </Link>
                        </button>
                    </form>
                </div>

            )
        }
        console.log(this.state)

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 col-sm-0">
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <h2>Updates</h2>
                        <br/>
                        {
                            this.state.updates.length === 0 ?
                                <p>Currently no updates!</p>
                                :
                            this.state.updates.map((update, key) =>
                                <UpdateCard update={update}
                                            key={key}
                                            cid={update.user}
                                            deleteUpdate={this.deleteUpdate}/>)
                        }
                    </div>
                    <div className="col-md-2 col-sm-0">
                    </div>
                </div>
            </div>
        )
    }

}