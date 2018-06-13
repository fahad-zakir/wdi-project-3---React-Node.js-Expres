import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import UserList from 'styled-components';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-bg">
                    <Container>

                      <Grid>
                        <Row className="show-grid justify-content-center text-center custom">

                        <Col xs={12} sm={4} className="person-wrapper">

                                <Image
                                    src="http://pluspng.com/img-png/gift-png-png-file-name-christmas-gift-400.png" responsive
                                    alt="gift" className="main-img"/>
                                
                                    <h1>Gifts Wishlist</h1>

                                <Link to="/users">Users</Link>
                            </Col>

                        </Row>
                    </Grid>
                    </Container>
            </div>
        )
    }
}

export default Home

const Container = styled.div `
  font-family: "Lato", sans-serif;
  font-family: "Playfair Display", serif;
  font-weight: 300;
  display: flex;
  justify-content: center;

  h1 {
    font-family: "Special Elite", cursive, bold;
    padding-top: 50px;
  }

  a {

    color: black;
    font-size: 25px;
    z-index: auto;
    &:hover {
        color: black;
text-shadow: 1px 1px 1px, 0 0 25px blue;    }
  }
`;
