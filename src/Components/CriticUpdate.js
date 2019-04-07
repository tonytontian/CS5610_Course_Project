import React, {Component} from 'react';

import CommunicationServiceSingleton from "../Services/CommunicationServiceSingleton"
import UserServiceSingleton from "../Services/UserServiceSingleton"
import "../style/style.css"
import UpdateCard from "./UpdateCard";

export default class CriticUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            critic: null,
            currentUser: null,
            updates: []
        }
        this.getUpdatesForCritic = this.getUpdatesForCritic.bind(this)
        this.deleteUpdate = this.deleteUpdate.bind(this)
    }

    componentDidMount() {
        UserServiceSingleton.profile().then(
            res => {
                if (res) {
                    this.setState({
                        critic: res,
                        cid: res._id
                    })
                }
            }
        ).then(() => this.getUpdatesForCritic())
    }

    getUpdatesForCritic() {
        CommunicationServiceSingleton.getUpdatesByCritic(this.state.cid)
            .then(res => this.setState({
                updates: res
            }))
            .then(() => console.log(this.state))
    }

    postNewUpdate() {
        let updateContent = document.getElementById("update").value;
        console.log(updateContent)
        CommunicationServiceSingleton.createUpdate(
            this.state.cid, updateContent)
            .then(() => this.getUpdatesForCritic())
    }


    deleteUpdate(id) {
        CommunicationServiceSingleton.deleteUpdateById(id)
            .then(res => console.log(res))
            .then(() => this.getUpdatesForCritic())
    }

    render() {
        // if current user === critic, show a textarea for post new updates
        let postUpdate = ""
        if (this.props.currentUser !== null
            && this.props.currentUser._id === this.state.cid) {
            postUpdate =
                <div>
                    <textarea className="form-control mb-3 fixed-textarea"
                              id="update"
                              rows="4">
                    </textarea>
                    <button className="pull-right btn btn-success"
                            onClick={() => this.postNewUpdate()}>
                        Post
                    </button>
                </div>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 col-sm-0">
                    </div>
                    <div className="col-md-8 col-sm-0">
                        <br/>
                        {
                            postUpdate
                        }
                        <br/>
                        <br/>
                        <h3>My Updates</h3>
                        {
                            this.state.updates.length == 0 ?
                                <p>You haven't posted anything yet!</p>
                                :
                            this.state.updates.map((update, key) =>
                                <UpdateCard update={update}
                                            key={key}
                                            critic={this.state.critic}
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