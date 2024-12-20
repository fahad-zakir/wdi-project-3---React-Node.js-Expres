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

    if (loading) return <LoadingMessage>Loading gifts...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (!user) return <ErrorMessage>User not found</ErrorMessage>;

    return (
      <GiftContainer>
        <NavBar>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/users">Back to Users</StyledLink>
          <StyledLink to={`/user/${user._id}/new`}>Create Gift</StyledLink>
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 20px;
  background: rgba(116, 148, 44, 0.9);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #8ab435;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 180, 53, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: translateX(200%);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-family: "Special Elite", cursive;
  font-size: 2.5em;
  margin: 20px 0 40px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);

  animation: glow 3s infinite;

  @keyframes glow {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
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
  color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  grid-column: 1 / -1;
  font-family: "Special Elite", cursive;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const LoadingMessage = styled.div`
  color: white;
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  font-family: "Special Elite", cursive;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  font-family: "Special Elite", cursive;
`;
