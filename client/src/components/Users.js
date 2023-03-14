import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Users extends Component {
    render() {
        return (
            <UserIdContainer>
                <div className="profile-card-container">
                    <div className="UserContainer">
                        <div className="frst-name">{this.props.firstName} {this.props.lastName}</div>
                        <div>{this.props.email}</div>
                        <div>{this.props.gifts}</div>
                        <div>
                            <img src={this.props.photoUrl} alt="user-pict" className="user-pict" />
                        </div>
                        <div>

                        </div>
                        <Link to={`/user/${this.props.id}`}>Update</Link>
                        <Link to={`/user/${this.props.id}/gifts`}>New Gift</Link>
                    </div>
                </div>
            </UserIdContainer>
        )
    }
}

export default Users

const UserIdContainer = styled.div`
  background: rgb(255, 247, 230);
`;
