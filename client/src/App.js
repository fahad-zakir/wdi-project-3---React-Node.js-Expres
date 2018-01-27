import React, { Component } from 'react';
import Users from './containers/Users/Users'
import Gifts from './containers/Gifts/Gifts'
import GiftsInfo from './containers/GiftsInfo/GiftsInfo'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" component={Users}/>
            <Route path="*" render={
              () => (<h4>Not found page!</h4>)
            }/>
          </Switch>
      </Router>
    );
  }
}

export default App;