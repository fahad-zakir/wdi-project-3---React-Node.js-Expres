import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Users from "./Users";

class UserList extends Component {
  render() {
    const userList = this.props.MyUsers.map((user, index) => {
      return (
        <Users
          key={index}
          firstName={user.firstName}
          lastName={user.lastName}
          giftName={user.gifts.giftName}
          email={user.email}
          photoUrl={user.photoUrl}
          id={user._id}
          gift={user.gifts}
          deleteUser={this.props.deleteUser}
        />
      );
    });

    return (
      <UserIdContainer>
        <NavButtons>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/new">Create User</StyledLink>
        </NavButtons>
        <Title>Choose User</Title>
        <List>{userList}</List>
      </UserIdContainer>
    );
  }
}

export default UserList;

const List = styled.section`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  padding: 0 20px;
`;

const UserIdContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px 0;
`;

const Title = styled.h1`
  font-family: "Special Elite", cursive;
  padding-top: 50px;
  color: white;
  font-size: 50px;
  text-align: center;
  margin: 0;
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

const NavButtons = styled.nav`
  display: block;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  font-family: "Playfair Display", serif;
  font-weight: 300;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  padding: 30px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1px;
    bottom: 25px;
    left: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: calc(100% - 60px);
  }
`;
