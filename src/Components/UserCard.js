import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profilePic
        let role
        let link

        if (this.props.user.type === 'CRITIC') {

            profilePic =
                <img className="card-img-top"
                     src="https://image.flaticon.com/icons/svg/594/594596.svg"
                     alt={this.props.user.username}/>

            role = "(Critic)"
        }
        else {
            profilePic =
                <img className="card-img-top"
                     src="https://image.flaticon.com/icons/svg/594/594590.svg"
                     alt={this.props.user.username}/>

            role = "(MovieGoer)"
        }

        if (this.props.currentUser === null || this.props.currentUser === undefined || this.props.currentUser._id !== this.props.user._id) {
            link =
                <Link className="card-body"
                      to={"/profile/" + this.props.user._id}>{this.props.user.username} {role}
                </Link>
        }
        //current user, so bring them to their own profile
        else {
            link =
                <Link className="card-body"
                      to={"/profile"}>{this.props.user.username} {role}
                </Link>
        }
        return (
            <div className="card border-0 m-3 col-md-2 col-sm-4 col-xs-4">
                {
                    profilePic
                }
                {
                    link
                }
            </div>
        )
    }


}

