import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
            <UserIdContainer >
                <div className="NavButtons">
                    <Link to="/">Home</Link>
                    <Link to="/new">Create User</Link>
                    <h1>Users List</h1>
                </div>
                <div>
                    <div>{userList}</div>
                </div>
            </UserIdContainer>
        )
    }
}
export default UserList

const FormContainer = styled.div`


`

const UserIdContainer = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
justify-content:center;
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
  
}}
`