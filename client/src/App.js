import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import UserList from './components/UserList'
import NewUser from './components/NewUser'
import User from './components/User'
import UserEditDelete from './components/UserEditDelete'

class App extends Component {

  state = {
    users: []
  }

  userDatabase = () => {
    axios
      .get('/api/users')
      .then(response => {
        const users = response.data
        this.setState({ users: users })
      })
  }

  createUser = async (user) => {
    // send the user to the database
    const response = await axios.post(`/api/users`, user)

    // grab the new user we just created in the database
    const newUser = response.data

    // put that new user into our list of users on the `state`
    const users = [...this.state.users]
    users.push(newUser)
    this.setState({ users })
  }
  // //To edit a user

  updateUser = async (user) => {
    console.log(user._id)
    const response = await axios.patch(`/api/users/${user._id}`, user)
    const users = this.UserDatabase
  }



  deleteUser = async (user) => {
    console.log(`from the delete router`)
    await axios.delete(`/api/users/${user._id}/delete`)
  }

  componentWillMount() {
    this.userDatabase()
  }

  createGift = async (user) => {
    // send the user to the database
    const response = await axios.post(`/api/users`, gift)

    // grab the new user we just created in the database
    const newGift = response.data

    // put that new user into our list of users on the `state`
    const gifts = [...this.state.gifts]
    users.push(newGift)
    this.setState({ gifts })
  }

  render() {
    ////the function to grab all the users
    const DataOfUsers = () => (<UserList MyUsers={this.state.users} />)

    const makeNewUser = () => (<NewUser createUser={this.createUser} users={this.state.users} />)
    const editUser = (props) => (<UserEditDelete updateUser={this.updateUser} UserDataBase={this.userDatabase}  deleteUser={this.deleteUser} users={this.state.users} {...props} />)

    const makeNewGift = () => (<NewGift createGift={this.newGift} gifts={this.state.gifts} />)



    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={DataOfUsers} />
          <Route exact path="/new" component={makeNewUser} />
          <Route exact path="/user" component={User} />
          <Route exact path="/user/:userId" component={editUser} />
          <Route exact path="user/userId/delete" component={editUser} />
          <Route exact path="/new-gift" component={makeNewGift} />
          <Route exact path="*" render={() => (<h4>Page not found!</h4>)} />
        </Switch>
      </Router>
    )
  }
}

export default App;

