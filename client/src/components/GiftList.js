import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Gifts from './Gifts'




class GiftList extends Component {

    render() {
        const giftList = this.props.MyGifts.map((gift, index) => {
            return (
                <Gifts
                    key={index}
                    giftName={gift.giftName}
                    id={gift._id} />)

        })

        return (
            <GiftContainer >
                <div className="NavButtons">
                    <Link to="/">Home</Link>
                    <Link to="./new-gift">Create Gift</Link>
                    <h1>Gifts List</h1>
                </div>
                <div>
                    <div>{giftList}</div>
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