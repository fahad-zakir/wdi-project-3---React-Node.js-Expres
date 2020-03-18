import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import Users from './Users'


class UserList extends Component {

  render() {
    // What returns the multiple cards of users is the loop
    const userList = this.props.MyUsers.map((user, index) => {
      return (
       
        <Users
          key={index}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          photoUrl={user.photoUrl}
          id={user._id}
        />
         
      );
    });

    return (
      <UserIdContainer style={{ height: "100%", width: "100%" }}>
        <div className="NavButtons">
          <Link to="/">Home</Link>
          <Link to="/new">Create User</Link>
        </div>
        <h1>Choose User</h1>
        <List>{userList}</List>
      </UserIdContainer>
    );
  }
}
export default UserList
const List = styled.section`
margin-top: 50px;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: stretch;
`;
const UserIdContainer = styled.div`
min-height: 100vh;
 background: rgb(255,247,230);

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

`;
