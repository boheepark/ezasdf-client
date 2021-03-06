import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class UserStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            created_at: '',
            email: '',
            id: '',
            username: ''
        };
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getUserProfile();
        }
    }

    getUserProfile() {
        return axios({
            url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/profile`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.token}`
            }
        })
            .then((res) => {
                this.setState({
                    created_at: res.data.data.created_at,
                    email: res.data.data.email,
                    id: res.data.data.id,
                    username: res.data.data.username
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <p>You must be signed in to view this page. Click <Link to="/signin">here</Link> to sign in.</p>
        }
        return (
            <div>
                <ul>
                    <li><strong>User ID:</strong> {this.state.id}</li>
                    <li><strong>Username:</strong> {this.state.username}</li>
                    <li><strong>Email:</strong> {this.state.email}</li>
                    <li><strong>Created at:</strong> {this.state.created_at}</li>
                </ul>
            </div>
        )
    }
}

export default UserStatus