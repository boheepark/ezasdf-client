import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import UserList from './components/UserList'
import About from './components/About'
import NavBar from './components/NavBar'
import Form from './components/Form'
import Signout from './components/Signout'
import UserProfile from './components/UserProfile'


class App extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: '',
            title: 'ezasdf',
            formData: {
                username: '',
                email: '',
                password: ''
            },
            isAuthenticated: false
        };
    }

    componentWillMount() {
        if (window.localStorage.getItem('token')) {
            this.setState({ isAuthenticated: true });
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                this.setState({ users: res.data.data.users });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    addUser(event) {
        event.preventDefault();
        axios.post(
            `${process.env.REACT_APP_USERS_SERVICE_URL}/users`,
            {
                username: this.state.username,
                email: this.state.email
            })
            .then((res) => {
                this.getUsers();
                this.setState({
                    username: '',
                    email: ''
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj)
    }

    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    handleUserFormSubmit(event) {
        event.preventDefault();
        const formType = window.location.href.split('/').reverse()[0];
        let data;
        if (formType === 'signin') {
            data = {
                username: this.state.formData.username,
                password: this.state.formData.password
            }
        }
        if (formType === 'signup') {
            data = {
                username: this.state.formData.username,
                email: this.state.formData.email,
                password: this.state.formData.password
            }
        }
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`, data)
            .then((res) => {
                this.setState({
                    formData: {
                        username: '',
                        email: '',
                        password: ''
                    },
                    username: '',
                    email: '',
                    isAuthenticated: true
                });
                window.localStorage.setItem('token', res.data.data.token);
                this.getUsers();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    signoutUser() {
        window.localStorage.clear();
        this.setState({isAuthenticated: false});
    }

    render() {
        return (
            <div>
                <NavBar
                    title={ this.state.title }
                    isAuthenticated={ this.state.isAuthenticated }
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <br/>
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <UserList
                                        users={ this.state.users }
                                    />
                                )} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/profile' render={() => (
                                    <UserProfile
                                        isAuthenticated={ this.state.isAuthenticated }
                                    />
                                )} />
                                <Route exact path='/signup' render={() => (
                                    <Form
                                        formType={ 'Sign Up' }
                                        formData={ this.state.formData }
                                        handleFormChange={ this.handleFormChange.bind(this) }
                                        handleUserFormSubmit={ this.handleUserFormSubmit.bind(this) }
                                        isAuthenticated={ this.state.isAuthenticated }
                                    />
                                )} />
                                <Route exact path='/signin' render={() => (
                                    <Form
                                        formType={ 'Sign In' }
                                        formData={ this.state.formData }
                                        handleFormChange={ this.handleFormChange.bind(this) }
                                        handleUserFormSubmit={ this.handleUserFormSubmit.bind(this) }
                                        isAuthenticated={ this.state.isAuthenticated }
                                    />
                                )} />
                                <Route exact path='/signout' render={() => (
                                    <Signout
                                        signoutUser={ this.signoutUser.bind(this) }
                                        isAuthenticated={ this.state.isAuthenticated }
                                    />
                                )} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App