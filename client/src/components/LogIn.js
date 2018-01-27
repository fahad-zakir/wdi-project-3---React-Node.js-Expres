import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                userName: '',
                email: '',
                firstName:'',
                lastName:'',
                
            }
        }
    }
}