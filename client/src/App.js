import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'
import User from './components/User'
import Gift from './components/Gift'
import GiftInfo from './components/GiftInfo'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" component={User}/>
            <Route path="*" render={
              () => (<h4>Not found page!</h4>)
            }/>
          </Switch>
      </Router>
    );
  }
}

export default App;