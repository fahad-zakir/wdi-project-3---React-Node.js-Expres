import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Home from './components/Home'
import UserList from './components/UserList'
import NewUser from './components/NewUser'
import NewGift from './components/NewGift'
import User from './components/User'
import UserEditDelete from './components/UserEditDelete'
// import Gift from './components/Gift'
import GiftList from './components/GiftList'

class App extends Component {

  state = {
    users: [],
    gifts: [],
    userID: []
  }

  userDatabase = () => {
    axios
      .get('/api/users')
      .then(response => {
        const users = response.data
        this.setState({ users: users })
      })
  }

  giftDatabase = () => {
    axios
      .get('/api/gifts')
      .then(response => {
        const gifts = response.data
        this.setState({ gifts: gifts})
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
    this.giftDatabase()
  }

  createGift = async (gift) => {
    // send the user to the database
    const response = await axios.post(`/api/gifts`, gift)

    // grab the new user we just created in the database
    const newGift = response.data

    // put that new user into our list of users on the `state`
    const gifts = [...this.state.gifts]
    gifts.push(newGift)
    this.setState({ gifts })
  }

  render() {
    ////the function to grab all the users
    const DataOfUsers = () => (<UserList MyUsers={this.state.users} />)

    const makeNewUser = () => (<NewUser createUser={this.createUser} users={this.state.users} />)
    const editUser = (props) => (<UserEditDelete updateUser={this.updateUser} UserDataBase={this.userDatabase}  deleteUser={this.deleteUser} users={this.state.users} {...props} />)
  
    // const DataOfGifts = () => (<GiftList MyGifts={this.state.gifts} />)

    const AllGifts = () => (<GiftList MyGifts={this.state.gifts} userID={this.state.userID} />)

    const makeNewGift = () => (<NewGift createGift={this.createGift} gifts={this.state.gifts} />)



    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={DataOfUsers} />
          <Route exact path="/new" component={makeNewUser} />
          <Route exact path="/user" component={User} />
          <Route exact path="/user/:userId" component={editUser} />
          <Route exact path="/user/:userId/gifts" component={AllGifts} />
          <Route exact path="/user/:userId/new-gift" component={makeNewGift} />
          <Route exact path="*" render={() => (<h4>Page not found!</h4>)} />
        </Switch>
      </Router>
    )
  }
}

export default App;

