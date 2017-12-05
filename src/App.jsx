import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';

import UserList from './components/UserList';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Signout from './components/Signout';
import UserProfile from './components/UserProfile';


class App extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            title: 'ezasdf',
            isAuthenticated: false
        };
    }

    componentWillMount() {
        if (window.localStorage.getItem('token')) {
            this.setState({
                isAuthenticated: true
            });
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                console.log(res);
                this.setState({
                    users: res.data.data.users
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    signoutUser() {
        window.localStorage.clear();
        this.setState({
            isAuthenticated: false
        });
    }

    signinUser(token) {
        window.localStorage.setItem('token', token);
        this.setState({
            isAuthenticated: true
        });
        this.getUsers();
    }

    render() {
        return (
            <div>
                <NavBar
                    title={this.state.title}
                    isAuthenticated={this.state.isAuthenticated}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <br/>
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <UserList
                                        users={this.state.users}
                                    />
                                )}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/signup' render={() => (
                                    <Form
                                        formType={'signup'}
                                        isAuthenticated={this.state.isAuthenticated}
                                        signinUser={this.signinUser.bind(this)}
                                    />
                                )}/>
                                <Route exact path='/signin' render={() => (
                                    <Form
                                        formType={'signin'}
                                        isAuthenticated={this.state.isAuthenticated}
                                        signinUser={this.signinUser.bind(this)}
                                    />
                                )}/>
                                <Route exact path='/signout' render={() => (
                                    <Signout
                                        isAuthenticated={this.state.isAuthenticated}
                                        signoutUser={this.signoutUser.bind(this)}
                                    />
                                )}/>
                                <Route exact path='/profile' render={() => (
                                    <UserProfile
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App