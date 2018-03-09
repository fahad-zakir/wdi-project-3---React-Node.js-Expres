import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



class Gifts extends Component {
    render() {
        return (
            <div>
                <div className="UserContainer">
                    <div className="firstNameContainer">
                        <div>{this.props.giftName}</div>
                        <Link to={`./gift/${this.props.id}`}>Update</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gifts
