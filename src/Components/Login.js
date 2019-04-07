import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import UserServiceSingleton from "../Services/UserServiceSingleton";
import '../style/style.css'
import history from '../history'

export default class Login extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     loggedIn: false
        // }
        // this.handleLogin = this.handleLogin.bind(this)
    }

    // handleLogin = (username, password) => {
    //     var user = {
    //         username: username,
    //         password: password
    //     };
    //     console.log(user);
    //     UserServiceSingleton.login(user)
    //         .then(() => {
    //             this.setState({
    //                 loggedIn: true
    //             })
    //         })
    // }

    render() {
        if (this.props.loggedIn === true) {
            console.log("logged in")
            return <Redirect to='/'/>
        }
        let wrongPasswordAlert =
            this.props.wrongPassword ?
                <div className="alertText form-group">
                    Username/Password incorrect!
                </div>
                :
                ""

        let username;
        let password;
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-3 col-sm-0">
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="text-center m-2 mb-3">
                            <h1 className="logo-text"><b>Husky</b>Movie</h1>
                        </div>
                        <div>
                            {
                                wrongPasswordAlert
                            }
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control"
                                       placeholder="Username"
                                       ref={node => username = node}>
                                </input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control"
                                       type="password"
                                       placeholder="Password"
                                       ref={node => password = node}>
                                </input>
                            </div>
                            <div className="text-center mt-2">
                                <button className="btn btn-success login-btn mt-2"
                                        onClick={() =>
                                            this.props.handleLogin(username.value, password.value)}>
                                    Sign In
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <Link className="mb-1 _underline" to="/register">
                                    Don't have an account yet? Click here to Register.
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-0">
                    </div>
                </div>
            </div>
        )
    }
}