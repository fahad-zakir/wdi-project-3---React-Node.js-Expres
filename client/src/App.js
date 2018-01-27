import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import styled from 'styled-components'

import Home from './components/Home'
import User from './components/User'
import Gift from './components/Gift'
import GiftInfo from './components/GiftInfo'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/" component={User}/>
            <Route exact path="/" component={Gift}/>
            <Route exact path="/" component={GiftInfo}/>
            <Route exact path="*" render={
              () => (<h4>Not found page!</h4>)
            }/>
          </Switch>
      </Router>
    );
  }
}

export default App;