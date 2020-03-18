import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


class Gifts extends Component {
    render() {
        return (
          <GiftContainer>
            <div className="UserContainer">
              <div className="firstNameContainer">
                <div clssName="frst-name">
                  {this.props.firstName} {this.props.lastName}
                </div>
                <div className="gift-name">{this.props.giftName}</div>
                <div className="gift-userid">{this.props.userID}</div>
                <Link to={`./gift/${this.props.id}`}>Update</Link>
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
