import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from "enzyme";
import UserList from "./UserList";

const users = [
    {
        'active': true,
        'email': 'test@email.com',
        'id': 1,
        'username': 'test'
    },
    {
        'active': true,
        'email': 'test2@email.com',
        'id': 2,
        'username': 'test2'
    }
];

test('UserList renders properly', () => {
    const wrapper = shallow(<UserList users={users}/>);
    const table = wrapper.find('Table');
    expect(table.length).toBe(1);

    // expect(table.find('tr').get(1).find('td').get(0).props.children).toBe('well');
    // expect(element.get(1).props.children.).toBe('test');
});

test('UserList renders a snapshot properly', () => {
    const tree = renderer.create(<UserList users={users}/>).toJSON();
    expect(tree).toMatchSnapshot();
});