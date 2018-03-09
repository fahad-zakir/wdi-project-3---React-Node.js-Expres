import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'



class UserEditDelete extends Component {
    state = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            redirect: false,
            isStateNotSet: true
        },
        userID: ""
    }
    handleChange = (event) => {
        const updateUser = {
            ...this.state.user
        }
        updateUser[event.target.name] = event.target.value
        this.setState({ user: updateUser })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.updateUser(this.state.user)
        this.updateCurrentState();
        this.props.UserDataBase();
        this.setState({redirect: true })
    }

    handleDelete = () => {
        console.log("about to delete a user from the app.js")
        this.props.deleteUser(this.state.user)
    }

    updateCurrentState = () => {
        axios.get(`/api/users/${this.props.match.params.userId}`, this.state.user)
            .then(response => {
                this.setState({ user: response.data, isStateNotSet: false, userID: this.props.match.params.userId })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount() {
        this.updateCurrentState()
    }

    render() {
        if (this.state.redirect === true){
            return <Redirect to="/users" />
        }
        return (
            this.state.isStateNotSet ? <div></div> :
                <div>
                    <div>
                    <Container>
                        <div>
                            <h2>Update User</h2>
                        </div>
                    <FormContainer>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input
                                    onChange={this.handleChange}
                                    name="firstName"
                                    placeholder="first name"
                                    type="text"
                                    value={this.state.user.firstName} />
                            </div>
                            <div>
                                <input
                                    onChange={this.handleChange}
                                    name="lastName"
                                    placeholder="last name"
                                    type="text"
                                    value={this.state.user.lastName} />
                            </div>
                            <div>
                                <input
                                    onChange={this.handleChange}
                                    name="email"
                                    placeholder="email"
                                    type="text"
                                    value={this.state.user.email} />
                            </div>
                            <button className="button" type="submit">
                                Submit
                            </button>
                            <button onClick={this.handleDelete}>Delete</button>
                            <Link to={`/user/${this.state.userID}/new-gift`}>New Gift</Link>
                            <a href="/users">Back To Users</a>
                        </form>
                            </FormContainer>

                        </Container>
                    </div>
                </div>
        )
    }
}

export default UserEditDelete

const Container = styled.div`

  display: flex;
  flex-direction: column;
    background: rgb(244,226,156);
    background: -moz-linear-gradient(-45deg, rgba(244,226,156,0) 0%, rgba(59,41,58,1) 100%), -moz-linear-gradient(left, rgba(244,226,156,1) 0%, rgba(130,96,87,1) 100%);
    background: -webkit-linear-gradient(-45deg, rgba(244,226,156,0) 0%,rgba(59,41,58,1) 100%), -webkit-linear-gradient(left, rgba(244,226,156,1) 0%,rgba(130,96,87,1) 100%);
    background: -o-linear-gradient(-45deg, rgba(244,226,156,0) 0%,rgba(59,41,58,1) 100%), -o-linear-gradient(left, rgba(244,226,156,1) 0%,rgba(130,96,87,1) 100%);
    background: -ms-linear-gradient(-45deg, rgba(244,226,156,0) 0%,rgba(59,41,58,1) 100%), -ms-linear-gradient(left, rgba(244,226,156,1) 0%,rgba(130,96,87,1) 100%);
    background: linear-gradient(135deg, rgba(244,226,156,0) 0%,rgba(59,41,58,1) 100%), linear-gradient(to right, rgba(244,226,156,1) 0%,rgba(130,96,87,1) 100%);

  justify-content:
  align-items: center;
  margin: 10px;
  padding: 20px;
  color: white;
    font-size: 2vh;
    text-shadow: 1px 1px 0px black;` 
    

const FormContainer = styled.div`
  font-family: 'Lato', sans-serif;
  font-family: 'Playfair Display', serif;
  font-weight: 300;
    display: flex;
    justify-content: center;
    width:100vw;
    height:100vh;
    h1 {
        font-family: 'Special Elite', cursive, bold;
        padding-top: 50px;
    }
    a{
    text-decoration: none;
    color: white;
    font-size: 25px;
    z-index: auto;
    &:hover {
    text-shadow: none;
    text-shadow:2px 2px 2px #000000;
    }
    }

`

