import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import NewUser from "./components/NewUser";
import UserList from "./components/UserList";
import UserEditDelete from "./components/UserEditDelete";
import NewGift from "./components/NewGift";
import GiftList from "./components/GiftList";
import GiftEditDelete from "./components/GiftEditDelete";

class App extends Component {
  // you will be intializing the state, you are telling it that you want these
  // array's later and possibly eveyrwhere
  state = {
    users: [],
    gifts: [],
    userID: []
  };
  // userDatabase is a function
  userDatabase = () => {
    axios
      .get("/api/users")
      // what you get back from the api/users and with the response , you will be
      // setting the response data and you will store in the users varialbe
      // this.setState will be stored inside of the state users once the data is
      // collected and parsed through json then is a promise function
      .then(response => {
        const savedUsers = response.data;
        console.log(savedUsers);
        //users below are for setting state in user state array from above
        this.setState({ users: savedUsers });
      });
  };

  giftDatabase = () => {
    axios
      .get("/api/users/${user._id}/gifts")
      //then is a promise function
      .then(response => {
        const savedGifts = response.data;
        const users = this.state.users;
        // we are saving the response param with the name response.data and saving it in
        console.log(gifts)
        //gifts below are for setting state in gifts state array from above
        this.setState({ gifts: savedGifts, users: users});
        // this.setState is a built in react function and for the gifts in our state
        // from above line 19 fill the array with our variable
        console.log(users)
      });
  };

  createUser = async user => {
    // send the user to the 
    const response = await axios.post(`/api/users`, user);
    console.log(response);

    // grab the new user we just created in the database
    const newUser = response.data;
console.log(newUser);
    // put that new user into our list of users on the `state`
    const users = [...this.state.users];
    users.push(newUser);
    this.setState({ users });
  };
  // //To edit a user

  updateUser = async user => {
    console.log(user._id);
    const response = await axios.patch(`/api/users/${user._id}`, user);
    const users = this.UserDatabase;
  };

  deleteUser = async user => {
    console.log(`from the delete router`);
    await axios.delete(`/api/users/${user._id}/delete`);
  };

  createGift = ((gift, user) => {
    // send the user to the database
    const response = axios.post(`/api/users/${user._id}/gifts`, gift);

    // grab the new gift we just created in the database
    const newGift = response.data;

    // put that new gift into our list of gifts on the `state`
    const gifts = [...this.state.gifts];
    gifts.push(newGift);
    this.setState({ gifts });
  });

  updateGift = async gift => {
    const response = await axios.patch(`/api/users/${gift._id}/gifts/edit`, gift);
    const gifts = this.GiftDatabase;
  };

  deleteGift = async gift => {
    console.log(`from the delete router`);
    await axios.delete(`/api/gifts/${gift._id}/delete`);
  };

  componentWillMount() {
    this.userDatabase();
    this.giftDatabase();
  }

  render() {
    console.log(this.state.gifts)
    console.log(this.state.users)
    ////the function to grab all the users
    const DataOfUsers = () => <UserList MyUsers={this.state.users} 
    MyGifts={this.state.gifts}/>;

    const DataOfGifts = () => <GiftList MyGifts={this.state.gifts}
    MyUsers={this.state.users} />;
    const makeNewUser = () => (
      <NewUser createUser={this.createUser} users={this.state.users} />
    );
    const editUser = props => (
      <UserEditDelete
        updateUser={this.updateUser}
        UserDataBase={this.userDatabase}
        deleteUser={this.deleteUser}
        users={this.state.users}
        {...props}
      />
    );
    const editGift = props => (
      <GiftEditDelete
        updateGift={this.updateGift}
        UserDataBase={this.userDatabase}
        GiftDataBase={this.giftDatabase}
        deleteGift={this.deleteGift}
        gifts={this.state.gifts}
        {...props}
      />
    );

    const AllGifts = props => (
      <GiftList
        MyGifts={this.state.gifts}
        UserDataBase={this.userDatabase}
        GiftDataBase={this.giftDatabase}
        deleteGift={this.deleteGift}
        gifts={this.state.gifts}
        {...props}
      />
    );

    const makeNewGift = () => (
      <NewGift
        createGift={this.createGift}
        users={this.state.users}
        gifts={this.state.gifts}
        UserDataBase={this.userDatabase}
        GiftDataBase={this.giftDatabase}
      />
    );
    
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={DataOfUsers} />
          <Route exact path="/users/:userId/gifts" component={DataOfGifts} />
          <Route exact path="/new" component={makeNewUser} />
          <Route exact path="/users/:userId" component={editUser} />
          <Route exact path="/users/:userId/gifts/:giftId" component={editGift} />
          <Route exact path="/users/gifts" component={AllGifts} />
          <Route exact path="/users/:userId/gifts/new" component={makeNewGift} />
          <Route exact path="*" render={() => <h4>Page not found!</h4>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
