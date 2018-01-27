import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Tab from './../Tab/Tab'
import Gifts from './../Gifts/Gifts'
import GiftsInfo from './../GiftsInfo/GiftsInfo'

class Users extends Component {
    render() {
        return(
            <div>
                <h1>Users page</h1>
                <NavLink
                    to="/gifts"
                    activeClassName="linkActive"
                > Gifts </NavLink>
                <NavLink
                    to="/gifts-info"
                    activeClassName="linkActive"
                > Gifts Info </NavLink>
                <Route exact path="/gifts" component={Gifts} />
                <Route exact path="/gifts-info" component={GiftsInfo} />
            </div>
        )
    }
}

export default Users