import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import NewUser from "./components/NewUser";
import UserList from "./components/UserList";
import UserEditDelete from "./components/UserEditDelete";
import NewGift from "./components/NewGift";
import GiftList from "./components/GiftList";
import GiftEditDelete from "./components/GiftEditDelete";

class App extends Component {
  state = {
    users: [],
  };

  userDatabase = () => {
    axios
      .get("/users")
      .then((response) => {
        const savedUsers = response.data;
        this.setState({ users: savedUsers });
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  };

  fetchGifts = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}/gifts`);
      return response.data;
    } catch (error) {
      console.log("Error fetching gifts:", error);
      throw error;
    }
  };

  createUser = async (user) => {
    try {
      const response = await axios.post(`/users`, user);
      const newUser = response.data;
      const users = [...this.state.users];
      users.push(newUser);
      this.setState({ users });
      return newUser;
    } catch (error) {
      console.log("Error creating user:", error);
      throw error;
    }
  };

  createGift = async (userId, gift) => {
    try {
      console.log("Creating gift for user:", userId, gift);
      const response = await axios.post(`/users/${userId}/gifts`, gift);
      console.log("Gift created:", response.data);

      const users = [...this.state.users];
      const user = users.find((u) => u._id === userId);
      if (user) {
        user.gifts = user.gifts || [];
        user.gifts.push(response.data);
        this.setState({ users });
      }
      return response.data;
    } catch (error) {
      console.log("Error creating gift:", error);
      throw error;
    }
  };

  updateUser = async (user) => {
    try {
      const response = await axios.patch(`/users/${user._id}`, user);
      const users = [...this.state.users];
      const index = users.findIndex((u) => u._id === user._id);
      users[index] = response.data;
      this.setState({ users });
      return response.data;
    } catch (error) {
      console.log("Error updating user:", error);
      throw error;
    }
  };

  deleteUser = async (user) => {
    try {
      await axios.delete(`/users/${user._id}/delete`);
      const users = this.state.users.filter((u) => u._id !== user._id);
      this.setState({ users });
    } catch (error) {
      console.log("Error deleting user:", error);
      throw error;
    }
  };

  updateGift = async (userId, giftId, gift) => {
    try {
      const response = await axios.patch(
        `/users/${userId}/gifts/${giftId}`,
        gift
      );
      const users = [...this.state.users];
      const user = users.find((u) => u._id === userId);
      if (user) {
        const giftIndex = user.gifts.findIndex((g) => g._id === giftId);
        user.gifts[giftIndex] = response.data;
        this.setState({ users });
      }
      return response.data;
    } catch (error) {
      console.log("Error updating gift:", error);
      throw error;
    }
  };

  deleteGift = async (userId, giftId) => {
    try {
      await axios.delete(`/users/${userId}/gifts/${giftId}`);
      const users = [...this.state.users];
      const user = users.find((u) => u._id === userId);
      if (user) {
        user.gifts = user.gifts.filter((g) => g._id !== giftId);
        this.setState({ users });
      }
    } catch (error) {
      console.log("Error deleting gift:", error);
      throw error;
    }
  };

  componentDidMount() {
    this.userDatabase();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/users"
            render={(props) => (
              <UserList
                MyUsers={this.state.users}
                deleteUser={this.deleteUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/new"
            render={() => <NewUser createUser={this.createUser} />}
          />
          <Route
            exact
            path="/user/:userId"
            render={(props) => (
              <UserEditDelete
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}
                users={this.state.users}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/user/:userId/gifts"
            render={(props) => (
              <GiftList
                users={this.state.users}
                fetchGifts={this.fetchGifts}
                createGift={this.createGift}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/user/:userId/gifts/edit/:giftId"
            render={(props) => (
              <GiftEditDelete
                updateGift={this.updateGift}
                deleteGift={this.deleteGift}
                users={this.state.users}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/user/:userId/new"
            render={(props) => (
              <NewGift
                createGift={this.createGift}
                users={this.state.users}
                {...props}
              />
            )}
          />
          <Route path="*" render={() => <h4>Page not found!</h4>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
