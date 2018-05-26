import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Gifts from './Gifts'
import Users from './Users'




class GiftList extends Component {

    render() {
        const giftList = this.props.MyGifts.map((gift, user, index) => {
            return (
                <Gifts
                    key={index}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    giftName={gift.giftName}
                    userID={gift.userID}
                    id={gift._id} />)

        })

        return (
            <GiftContainer >
                <div className="NavButtons">
                    <Link to="/">Home</Link>
                    <Link to="./new-gift">Create Gift</Link>
                    <h1 className="users-list">Gifts List</h1>
                </div>
                <div>
                    <div className="user-info">{giftList}</div>
                </div>
            </GiftContainer>
        )
    }
}
export default GiftList

const FormContainer = styled.div`


`

const GiftContainer = styled.div`
display:flex;
flex-direction:column;
height: 500vh;
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
  
}}
`