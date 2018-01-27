import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div>
                <img
                    src="http://downloadicons.net/sites/default/files/gold-gift-box-icon-3607.png"
                    alt="gift" />
                <h1>Gifts Wishlist</h1>

                <div>
                    <Link to="/user">User</Link>
                </div>
                <div>
                    <Link to="/gift">Gift</Link>
                </div>
                <div>
                    <Link to="/giftInfo">Gift Info</Link>
                </div>
            </div>
        )
    }
}

export default Home