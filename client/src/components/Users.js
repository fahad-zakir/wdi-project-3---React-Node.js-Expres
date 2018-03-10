import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



class Users extends Component {
    render() {
        return (
            <div>
            <div className="UserContainer">
                <div className="firstNameContainer">
                    <div>{this.props.firstName} {this.props.lastName}</div>
                    <div>{this.props.email}</div>
                    <Link className="update" to={`/user/${this.props.id}`}>Update</Link>
                </div>
            </div>
            </div>
        )
    }
}

export default Users
