import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import '../style/style.css'

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_status: false,
            user: {},
            emptyUsername: false,
            emptyPassword: false,
            emptyValue: false,
            passwordsMatch: true,
            usernameTaken: false
        }
    }

    conditionalRegister = () => {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var password_verify = document.getElementById("password-verify").value;
        var userType = document.getElementById("user-type").value;
        var email = document.getElementById("email").value;
        var emptyValues = (password !== "" && username !== "");
        var passwordsMatch = (password === password_verify);

        if (emptyValues && passwordsMatch) {
            this.setState({
                emptyValue: false,
                passwordsMatch: true
            })
            var newUser = {
                username: username,
                password: password,
                email: email,
                type: userType
            }
            this.props.register(newUser)

        }
        else if(!emptyValues){
            if(password === "") {
                this.setState({
                    emptyPassword: true
                })
            }
            if(username === "") {
                this.setState({
                    emptyUsername: true
                })
            }
        }
        else if(!passwordsMatch) {
            this.setState({
                passwordsMatch: false
            })
        }
    }

    render() {
        if (this.props.loggedIn === true) {
            return <Redirect to='/'/>
        }
        let usernameTakenAlert =
            this.props.usernameTaken ?
                <div className="alertText form-group row">
                    Username is already taken!
                </div>
                :
                ""
        let emptyUsernameAlert =
            this.state.emptyUsername ?
            <div className="alertText form-group row">
                Username can not be empty!
            </div>
                :
                ""

        let emptyPasswordAlert =
            this.state.emptyPassword ?
                <div className="alertText form-group row">
                    Password can not be empty!
                </div>
                :
                ""

        let unmatchAlert =
            this.state.passwordsMatch ?
                ""
                :
                <div className="alertText form-group row">
                    Passwords do not match!
                </div>

        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-sm-0">
                </div>
                <div className="col-md-6 col-sm-12">

                    <div className="text-center m-2 mb-3">
                        <h1 className="logo-text"><b>Husky</b>Movie</h1>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input className="form-control"
                                   id="username"
                                   placeholder="Enter Username"/>
                    </div>

                    {
                        emptyUsernameAlert
                    }

                    {
                        usernameTakenAlert
                    }
                    <div className="form-group row">
                        <label htmlFor="password">
                            Password </label>
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="password"
                                   placeholder="Enter Password"/>
                    </div>
                    {
                        emptyPasswordAlert
                    }

                    <div className="form-group row">
                        <label htmlFor="password-verify">
                            Verify Password </label>
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="password-verify"
                                   placeholder="Verify Password"/>
                    </div>
                    {
                        unmatchAlert
                    }
                    <div className="form-group row">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input className="form-control"
                               id="email"
                               placeholder="Enter Email Address"/>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="user-type">
                            I am a... </label>
                        <select className="custom-select"
                                id="user-type">
                            <option value="MOVIEGOER">Movie Goer</option>
                            <option value="CRITIC">Critic</option>
                        </select>
                    </div>

                    <div className="text-center mt-2">
                        <button className="btn btn-success login-btn mt-2"
                                onClick={() => this.conditionalRegister()}>
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <Link className="mb-1 _underline" to="/login">
                            Already have an account? Click here to Sign In.
                        </Link>
                    </div>
                </div>
                <div className="col-md-3 col-sm-0">
                </div>
            </div>
            </div>
        )
    }
}