import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Gifts from './Gifts';

class GiftList extends Component {


  render() {
    // What returns the multiple cards of users is the loop
    const giftList = this.props.MyGifts.map((gift, index) => {
      return (
      
        <Gifts
          key={index}
          firstName={gift.firstName}
          lastName={gift.lastName}
          photoUrl={gift.giftPhotoUrl}
          giftName={gift.giftName}
          for={gift.for}
          price={gift.price}
          userID={gift.userID}
          id={gift._id}
        />
      );
    });
    return (
      <GiftContainer style={{ height: "100%", width: "100%" }}>
        <div className="NavButtons">
          <Link to="/">Home</Link>
          <Link to="./gifts/new">Create Gift</Link>
          <h1 className="users-list">Gifts List</h1>
        </div>
        <div>
          <List>
            {giftList}
          </List>
        </div>
      </GiftContainer>
    );
  }
}
export default GiftList

const List = styled.section`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
`;
const GiftContainer = styled.div`
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
  
}}
`