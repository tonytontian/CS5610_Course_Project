import React from 'react';
import { Router, Route} from 'react-router-dom'
import MoviePage from '../Components/MoviePage'
import Login from "../Components/Login";
import Register from "../Components/Register";
import NavBar from "../Components/NavBar";
import UserProfile from "../Components/UserProfile"
import AllUsers from "../Components/AllUsers"
import UpdatePage from "../Components/UpdatePage"
import UserServiceSingleton from "../Services/UserServiceSingleton";
import FindMovie from "../Components/FindMovie"
import EditProfile from "../Components/EditProfile"
import history from "../history"
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import CriticUpdate from "../Components/CriticUpdate";
import SearchResultPage from "../Components/SearchResultPage"


export default class MovieAppContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: null,
            loggedIn: false,
            usernameTaken: false,
            wrongPassword: false
        }
    }

    componentDidMount() {
        UserServiceSingleton.profile().then(
            res => {
                if(res) {
                    this.setState({
                        currentUser: res,
                        loggedIn: true
                    })
                }
            }
        )
    }

    handleLogin = (username, password) => {
        var user = {
            username: username,
            password: password
        };
        console.log(user);
        UserServiceSingleton.login(user)
            .then(() => {
                this.setState({
                    loggedIn: true,
                })
            })
            .then(
                () =>
                    UserServiceSingleton.profile()
                        .then(res => this.setState({
                            currentUser: res
                        }))
            )
            .catch(error => {
                console.log(error)
                this.setState({
                    wrongPassword:true
                })
            })
    }

    register = (newUser) => {
        UserServiceSingleton.register(newUser)
            .then((user) => {
                console.log(user)
                this.setState({
                    currentUser: user,
                    loggedIn: true
                })
            })
            .catch(error => {
                this.setState({
                    usernameTaken: true
                })
                // alert(error);
            })
    }

    logout = () => {
        console.log("logout")
        UserServiceSingleton.logout()
            .then(
                () => this.setState({
                    currentUser: null,
                    loggedIn: false
                })
            )
            .then(() => history.push('/'))
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <NavBar currentUser={this.state.currentUser}
                                logout={this.logout}/>
                        <Route exact path="/"
                               render={(props) =>
                                   <FindMovie {...props}
                                              loggedIn={this.state.loggedIn}
                                              currentUser={this.state.currentUser}/>}/>

                        <Route exact path="/details/:movieId"
                               render={(props) =>
                                   <MoviePage {...props}
                                              loggedIn={this.state.loggedIn}
                                              currentUser={this.state.currentUser}/>}
                        />
                        <Route exact path="/login"
                               render={() =>
                                   <Login loggedIn={this.state.loggedIn}
                                          handleLogin={this.handleLogin}
                                          wrongPassword={this.state.wrongPassword}/>}
                               />
                        <Route exact path="/register"
                               render={() =>
                                   <Register loggedIn={this.state.loggedIn}
                                             usernameTaken={this.state.usernameTaken}
                                             register={this.register}/>}/>
                        <Route exact path="/profile/:uid"
                               render={(props) =>
                                   <UserProfile {...props}
                                                loggedIn={this.state.loggedIn}
                                                currentUser={this.state.currentUser}/>}/>

                        <Route exact path="/profile"
                               render={(props) =>
                                   <EditProfile {...props}
                                                loggedIn={this.state.loggedIn}
                                                currentUser={this.state.currentUser}/>}/>
                        <Route exact path="/user"
                               render={(props) =>
                                   <AllUsers {...props}
                                                currentUser={this.state.currentUser}/>}/>
                        <Route exact path="/critic_update"
                               render={(props) =>
                               <CriticUpdate {...props}
                                             currentUser={this.state.currentUser}/>}/>

                        <Route exact path="/update"
                               render={(props) =>
                               <UpdatePage {...props}
                                           currentUser={this.state.currentUser}/>}/>
                        <Route  path = "/search"
                               render={(props) =>
                                   <SearchResultPage {...props}/>}/>

                    </div>
                </Router>
            </div>
        )
    }
}