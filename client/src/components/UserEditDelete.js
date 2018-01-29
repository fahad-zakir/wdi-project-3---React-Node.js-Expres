import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'



class UserEditDelete extends Component {
    state = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            redirect: false,
            isStateNotSet: true
        }
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
                this.setState({ user: response.data, isStateNotSet: false })
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
                        <div>
                            <h2>Update User</h2>
                        </div>
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
                            <a href="/users">Back To Users</a>
                        </form>
                    </div>
                </div>
        )
    }
}

export default UserEditDelete

