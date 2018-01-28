import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import LogIn from './LogIn'
import Gift from './Gift'
import GiftInfo from './GiftInfo'

class User extends Component {
    render() {
        return(
            <div>
                <h1>User page</h1>
            
                    to="/gifts"
                    activeClassName="linkActive"
            
        
                    to="/gifts-info"
                    activeClassName="linkActive"
                
              
            </div>
        )
    }
}

export default User