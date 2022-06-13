import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'


class NewGift extends Component {
    state = {
        newGift: [],
        redirect: false
    }
    
    //this is a function that handles the changes the user makes
    handleChange = (event) => {
        //after user fill's out the form, the information needs to be stored in a variable
        const attribute = event.target.name
        let val = event.target.value
        // update the new information
        // and add it to
        const newGift = { ...this.state.newGift }
        newGift[attribute] = val
        newGift.userID = { ...this.state.userID }
        this.setState({ newGift })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createGift(this.state.newGift)
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="./gifts" />
        }

        return (
          <NewUserContainer>
            <div className="NavButtons">
              <Link to="/">Home</Link>
              <Link to="/users">Users</Link>
            </div>
            <div className="custom-gift-text">
              <h2 className="new-gift">Add New Gift</h2>
            </div>
            <div className="form-custom">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="giftName"
                    placeholder="gift name"
                    type="text"
                    required
                    value={this.state.newGift.giftName}
                  />
                </div>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="for"
                    placeholder="For"
                    type="text"
                    value={this.state.newGift.for}
                  />
                </div>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="price"
                    placeholder="price"
                    type="number"
                    value={this.state.newGift.price}
                  />
                </div>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="giftPhotoUrl"
                    placeholder="photo"
                    type="text"
                    value={this.state.newGift.giftPhotoUrl}
                  />
                </div>
                <button className="button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </NewUserContainer>
        );
    }
}

export default NewGift

const NewUserContainer = styled.div`
width:100vw;
min-height:100vh;
background-image: linear-gradient(45deg, rgba(194, 233, 221, 0.5) 1%, rgba(104, 119, 132, 0.5) 100%), linear-gradient(-45deg, #494d71 0%, rgba(217, 230, 185, 0.5) 80%);
-webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}

form {
margin-top: 200px;
  border: 5px solid rgba(0,0,0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  background-color: #D3D3D3;
  width: 300px;
  min-width: 200px;
  height: 320px;
  font-weight: bold;
  color: black;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.25s ease;
}
 .button {
  border: 1px solid black;
  max-width: 250px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  transition: all 0.25s ease;
  background: #74942c;
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
