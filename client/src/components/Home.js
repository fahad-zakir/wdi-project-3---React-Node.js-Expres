import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
          <div className="home-bg">
            <Container>
              <Grid>
                <Row className="show-grid justify-content-center text-center custom">
                  <Col xs={12} sm={4} className="person-wrapper">
                    <h1>Gifts Wishlist</h1>
                    <div className="link-home">
                      <Link to="/users">
                        <Button bsStyle="danger" bsSize="large">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </Container>
          </div>
        );
    }
}

export default Home

const Container = styled.div`
  h1 {
    font-family: "Satisfy", cursive;
    font-weight: 500px;
    font-size: 60px;
    padding-top: 50px;
  }
  .show-grid {
    height: 100vh;
  }

  a {
    color: black;
    font-size: 25px;
    z-index: auto;
    &:hover {
      color: black;
      text-shadow: 1px 1px 1px, 0 0 25px blue;
    }
  }
`;
