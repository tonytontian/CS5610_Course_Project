import React, {Component} from 'react';
import {Link} from "react-router-dom";
import UserServiceSingleton from '../Services/UserServiceSingleton'
import Moment from '../../node_modules/moment';
import "../style/style.css"

export default class UpdateCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            critic: null
        }
    }

    componentDidMount() {
        if(this.props.critic) {
            this.setState({
                critic: this.props.critic
            })
        }
        else {
            UserServiceSingleton.findUserById(this.props.cid)
                .then(res => this.setState({
                    critic: res
                }))
        }
    }
    render() {
        //console.log(this.props.critic)
        if(!this.state.critic) {
            return <div>
                loading
            </div>
        }
        let deleteBtn = ""
        if(this.props.critic) {
            deleteBtn = <a className="pull-right"
                           onClick={() =>
                               this.props.deleteUpdate(this.props.update._id)
                           }>
                <i className="fa fa-times"></i>
            </a>
        }
        Moment.locale('en');
        return(
            <div className="card update-card shadow-sm m-3">
                <div className="card-header bg-white pl-2">
                    <img className="card-img-top profile-image mr-2"
                         src="https://image.flaticon.com/icons/svg/594/594596.svg"
                         alt={this.state.critic.username}
                         style={{width: 25, height: 25}}/>
                    <Link to={"/profile/" + this.state.critic._id}>{this.state.critic.username}</Link>
                    {deleteBtn}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>
                            {this.props.update.text}
                        </p>
                        <footer className="blockquote-footer">
                            {Moment(this.props.update.time).format('D/M/YY')}
                        </footer>
                    </blockquote>
                </div>
            </div>
        )
    }
}