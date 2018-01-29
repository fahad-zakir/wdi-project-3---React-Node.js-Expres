import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'




class Gift extends Component {

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
        this.setState({ newGift })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createGift(this.state.newGift)
        this.setState({ redirect: true })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/gifts" />
        }
        return (
            <NewUserContainer>
                <div>
                    <h2>Create New User</h2>
                </div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            placeholder="first name"
                            type="text" required
                            value={this.state.newUser.firstName} />
                    </div>
                    <div>
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            placeholder="last name"
                            type="text"
                            value={this.state.newUser.lastName} />
                    </div>
                    <div>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="email"
                            type="text"
                            value={this.state.newUser.email} />
                    </div>
                    <button className="button" type="submit">
                        Submit
          </button>
                </form>
            </NewUserContainer>
        )
    }
}

export default NewUser
//background from Taylor Vowell codpen
const NewUserContainer = styled.div`
width:100vw;
height:100vh;
background-image: linear-gradient(45deg, rgba(194, 233, 221, 0.5) 1%, rgba(104, 119, 132, 0.5) 100%), linear-gradient(-45deg, #494d71 0%, rgba(217, 230, 185, 0.5) 80%);
display: flex;
justify-content: center;
-webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  pading: 40px;
  width: 100%;
  max-width: 900px;
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
`
