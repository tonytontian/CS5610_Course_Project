import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../style/navbar.style.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../../node_modules/jquery/dist/jquery.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/react-bootstrap/lib/NavbarHeader'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.collapse = this.collapse.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    collapse() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let loginBtn
        if (this.props.currentUser !== null) {

            loginBtn =
                <ul className="navbar-nav">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    {
                        this.props.currentUser.type === "CRITIC" ?
                            <Link className="btn btn-link m-0 p-0"
                                  to={
                                      {
                                          pathname: "/critic_update/",
                                          currentUser: this.props.currentUser
                                      }}>
                                My Updates
                            </Link> : ""
                    }
                    </li>
                    <li className="nav-item dropdown py-0">
                        <button className="btn btn-link dropdown-toggle py-0" type="button" id="dropdownMenu"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.currentUser.username}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                            <div data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className="dropdown-item"
                                      to={"/profile"}>
                                    Profile
                                </Link>
                            </div>
                            <div data-toggle="collapse" data-target=".navbar-collapse.show">

                                <a className="dropdown-item"
                                   onClick={() =>
                                       this.props.logout()}>
                                    Log out
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
        }

        else {
            loginBtn = (
                <ul className="navbar-nav m-0">
                    <li className="nav-item"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show">
                        <Link to="/register">
                            Sign Up
                        </Link>
                    </li>

                    <li className="nav-item"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }
        const collapsed = this.state.collapsed;
        const navCollapsedContent = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const navMenu = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        return (

            <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
                <div className="container">
                    <li className="navbar-brand" data-toggle="collapse"
                        data-target=".navbar-collapse.show">
                        <Link to="/" className="brand"><b>Husky Movie</b></Link>
                    </li>
                    <button onClick={this.toggle} className={`${navMenu}`} type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={`${navCollapsedContent}`} id="navbarResponsive">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item horizontal-child" data-toggle="collapse"
                                data-target=".navbar-collapse.show">
                                <Link to="/update">Updates</Link>
                            </li>
                            <li className="nav-item horizontal-child" data-toggle="collapse"
                                data-target=".navbar-collapse.show">
                                <Link to="/user">Users</Link>
                            </li>
                        </ul>
                        {
                            loginBtn
                        }
                    </div>
                </div>
            </nav>
        );
    }

}

