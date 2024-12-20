import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Gifts from "./Gifts";

class GiftList extends Component {
  state = {
    gifts: [],
    loading: true,
    error: null,
    user: null,
  };

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      const user = this.props.users.find((u) => u._id === userId);

      if (user) {
        this.setState({
          gifts: user.gifts || [],
          user,
          loading: false,
        });
      } else {
        this.setState({
          error: "User not found",
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error loading gifts:", error);
      this.setState({
        error: "Failed to load gifts",
        loading: false,
      });
    }
  }

  render() {
    const { gifts, loading, error, user } = this.state;

    if (loading) return <div>Loading gifts...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
      <GiftContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/users">Back to Users</Link>
          <Link to={`/user/${user._id}/new`}>Create Gift</Link>
        </NavBar>
        <Title>{user.firstName}'s Gifts</Title>
        <List>
          {gifts && gifts.length > 0 ? (
            gifts.map((gift) => (
              <Gifts
                key={gift._id}
                giftName={gift.giftName}
                for={gift.for}
                price={gift.price}
                photoUrl={gift.giftPhotoUrl}
                id={gift._id}
                userId={user._id}
              />
            ))
          ) : (
            <EmptyMessage>
              No gifts found. Click "Create Gift" to add one!
            </EmptyMessage>
          )}
        </List>
      </GiftContainer>
    );
  }
}

export default GiftList;

const GiftContainer = styled.div`
  min-height: 100vh;
  background: rgb(255, 247, 230);
  padding: 20px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 20px;
    background: #74942c;
    color: white;
    font-size: 16px;
    transition: all 0.2s ease;
    border: none;

    &:hover {
      background: #8ab435;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-family: "Special Elite", cursive;
  font-size: 2.5em;
  margin: 20px 0 40px;
`;

const List = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 40px;
  grid-column: 1 / -1;
  font-family: "Special Elite", cursive;
`;
