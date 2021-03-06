import React from 'react';
import {Table} from 'react-bootstrap';

const UsersList = props => {
    return (
        <div>
            <h1>All Users</h1>
            <hr/>
            <br/>
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Created Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UsersList;