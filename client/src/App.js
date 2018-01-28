import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import styled from 'styled-components'

import Home from './components/Home'
import LogIn from './components/LogIn'
import User from './components/User'
import Gift from './components/Gift'
import GiftInfo from './components/GiftInfo'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/gift" component={Gift} />
            <Route exact path="/giftinfo" component={GiftInfo} />
            <Route exact path="*" render={
              () => (<h4>Page not found!</h4>)
            } />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;