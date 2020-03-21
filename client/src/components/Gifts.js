import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'




class Gifts extends Component {

  render() {
    return (
      <GiftContainer>
        <div className="profile-card-container">
          <div className="UserContainer">
            <div className="frst-name">
              {this.props.firstName} {this.props.lastName}
            </div>
            <div>
              <img
                src={this.props.photoUrl}
                alt="user-pict"
                className="user-pict"
              />
            </div>
            <div>{this.props.giftName}</div>
            <div>For: {this.props.for}</div>
            <div>${this.props.price}</div>
            <Link to={`/user/${this.props.id}`}>Update</Link>
          </div>
        </div>
      </GiftContainer>
    );
  }
}

export default Gifts

const GiftContainer = styled.div`
  background: rgb(255, 247, 230);
`;

