import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import Users from './Users'




class UserList extends Component {

    render() {
        const userList = this.props.MyUsers.map((user, index) => {
            return (
                <Users
                    key={index}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    photo={user.photo}
                    id={user._id} />)

        })


        return (
            <UserIdContainer>
                <div className="NavButtons">
                    <Link to="/">Home</Link>
                    <Link to="/new">Create User</Link>
                </div>
                <h1 className="users-list">Users List</h1>

                <div>
                    <div className="user-info">{userList}</div>
                </div>
            </UserIdContainer>
        )
    }
}
export default UserList



const UserIdContainer = styled.div`
display:flex;
flex-direction:column;
height: 100vh;
 background: rgb(105, 155, 200);
    background: -moz - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -webkit - gradient(radial, top left, 0px, top left, 100 %, color - stop(0 %, rgba(105, 155, 200, 1)), color - stop(57 %, rgba(181, 197, 216, 1)));
    background: -webkit - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -o - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -ms - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: radial - gradient(ellipse at top left, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr = '#699bc8', endColorstr = '#b5c5d8', GradientType = 1);
h1 {
    font-family: 'Special Elite', cursive, bold;
    padding-top: 50px;
    color:Black bold;
    font-size: 50px;
    display:flex;
    justify-content: center;
}  
.NavButtons {
display:block;
  a{
    font-family: 'Lato', sans-serif;
    font-family: 'Playfair Display', serif;
    font-weight: 300;
  text-decoration: none;
    color: black;
    font-size: 20px;
    padding: 30px;
    z-index: auto;
    &:hover {
    text-shadow: none;
    text-shadow:2px 2px 2px silver;
}
}
`
