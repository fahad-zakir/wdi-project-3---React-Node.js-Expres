import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


class Home extends Component {
    render() {
        return (
            <Container>
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
            </Container>
        )
    }
}

export default Home



const Container = styled.div`
    width:100vw;
    height:100vh;
    background: rgb(105, 155, 200);
    background: -moz - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -webkit - gradient(radial, top left, 0px, top left, 100 %, color - stop(0 %, rgba(105, 155, 200, 1)), color - stop(57 %, rgba(181, 197, 216, 1)));
    background: -webkit - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -o - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: -ms - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    background: radial - gradient(ellipse at top left, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr = '#699bc8', endColorstr = '#b5c5d8', GradientType = 1);
    a{
    text-decoration: none;
    color: white;
    text-shadow:4px 4px 8px #000000;
    z-index: auto;
    &:hover {
    color: #7e7e7e;
    text-shadow: none;
    text-shadow:2px 2px 2px #000000;
    }
    }
`
//background from codepen. User Taylor Vowell


