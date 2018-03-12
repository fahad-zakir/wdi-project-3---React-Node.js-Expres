import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'




class User extends Component {

    state = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            redirect: false,
            isStateNotSet: true
        }
    }

    updateCurrentState = () => {
        axios.get(`/api/users/${this.props.match.params.userId}`, this.state.user)
            .then(response => {
                this.setState({ user: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (

                <div className="picWrapper">
                    <div>{this.user.firstName}</div>
                </div>
        
        )
    }
}
export default User

