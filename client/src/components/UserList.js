import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Users from './Users'


class UserList extends Component {

    render() {
        const userList = this.props.MyUsers.map((user, index) => {
            return (<Users
                key={index}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
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

const UserIdContainer = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
justify-content:center;
h1 {
  color:goldenrod;
}
.NavButtons {
display:flex;
flex-direction:column;
  a{
  color:red;
  margin:2px 0px 0px 5px;
}}
`