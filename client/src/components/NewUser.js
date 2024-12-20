import React, { Component } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

class NewUser extends Component {
  state = {
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      photoUrl: "",
    },
    redirect: false,
    isSearchingImage: false,
    previewImage: null,
    searchStyle: "cartoon",
  };

  fetchAvatarImage = async (name) => {
    try {
      this.setState({ isSearchingImage: true });

      const styleQueries = {
        cartoon: `cartoon avatar illustration profile picture icon flat design character ${name}`,
        minimal: `minimal avatar icon vector illustration flat design ${name}`,
        anime: `anime avatar character icon illustration ${name}`,
      };

      const searchQuery = styleQueries[this.state.searchStyle];

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
          searchQuery
        )}&searchType=image&num=1&imgType=clipart&safe=active&fileType=png`
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const imageUrl = data.items[0].link;
        this.setState({
          previewImage: imageUrl,
          newUser: {
            ...this.state.newUser,
            photoUrl: imageUrl,
          },
        });
        return imageUrl;
      }
      return null;
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    } finally {
      this.setState({ isSearchingImage: false });
    }
  };

  handleStyleChange = async (style) => {
    this.setState({ searchStyle: style });
    if (this.state.newUser.firstName && this.state.newUser.lastName) {
      const fullName = `${this.state.newUser.firstName} ${this.state.newUser.lastName}`;
      await this.fetchAvatarImage(fullName);
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        [name]: value,
      },
    }));

    if (name === "firstName" || name === "lastName") {
      const updatedFirstName =
        name === "firstName" ? value : this.state.newUser.firstName;
      const updatedLastName =
        name === "lastName" ? value : this.state.newUser.lastName;

      if (!updatedFirstName || !updatedLastName) {
        this.setState({
          previewImage: null,
          newUser: {
            ...this.state.newUser,
            photoUrl: "",
            [name]: value,
          },
        });
        return;
      }

      if (updatedFirstName && updatedLastName) {
        const fullName = `${updatedFirstName} ${updatedLastName}`;
        await this.fetchAvatarImage(fullName);
      }
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !this.state.newUser.photoUrl.trim() &&
        this.state.newUser.firstName &&
        this.state.newUser.lastName
      ) {
        const fullName = `${this.state.newUser.firstName} ${this.state.newUser.lastName}`;
        const imageUrl = await this.fetchAvatarImage(fullName);
        if (imageUrl) {
          this.setState((prevState) => ({
            newUser: {
              ...prevState.newUser,
              photoUrl: imageUrl,
            },
          }));
        }
      }

      await this.props.createUser(this.state.newUser);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/users" />;
    }

    return (
      <UserFormContainer>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Back to Users</Link>
        </nav>

        <h1>Create New User</h1>

        <FormCard>
          <form onSubmit={this.handleSubmit}>
            <InputGroup>
              <input
                onChange={this.handleChange}
                name="firstName"
                placeholder="First Name"
                type="text"
                required
                value={this.state.newUser.firstName}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="lastName"
                placeholder="Last Name"
                type="text"
                required
                value={this.state.newUser.lastName}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="email"
                placeholder="Email"
                type="email"
                required
                value={this.state.newUser.email}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="photoUrl"
                placeholder="Photo URL (optional - will auto-search if empty)"
                type="text"
                value={this.state.newUser.photoUrl}
              />
            </InputGroup>

            {this.state.previewImage && (
              <PreviewContainer>
                <h4>Preview Avatar:</h4>
                <img src={this.state.previewImage} alt="Preview" />
                <StyleButtons>
                  <StyleButton
                    active={this.state.searchStyle === "cartoon"}
                    onClick={() => this.handleStyleChange("cartoon")}
                    type="button"
                  >
                    Cartoon
                  </StyleButton>
                  <StyleButton
                    active={this.state.searchStyle === "minimal"}
                    onClick={() => this.handleStyleChange("minimal")}
                    type="button"
                  >
                    Minimal
                  </StyleButton>
                  <StyleButton
                    active={this.state.searchStyle === "anime"}
                    onClick={() => this.handleStyleChange("anime")}
                    type="button"
                  >
                    Anime
                  </StyleButton>
                </StyleButtons>
              </PreviewContainer>
            )}

            <SubmitButton type="submit" disabled={this.state.isSearchingImage}>
              {this.state.isSearchingImage
                ? "Searching for avatar..."
                : "Create User"}
            </SubmitButton>
          </form>
        </FormCard>
      </UserFormContainer>
    );
  }
}
const UserFormContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;

  nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;

    a {
      font-family: "Playfair Display", serif;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.8);
      font-size: 20px;
      padding: 15px 30px;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        color: white;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 1px;
        bottom: 10px;
        left: 50%;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }

      &:hover::after {
        width: calc(100% - 60px);
      }
    }
  }

  h1 {
    text-align: center;
    color: white;
    font-family: "Special Elite", cursive;
    font-size: 2.5em;
    margin-bottom: 40px;
    padding-top: 50px;
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
  }
`;

const FormCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const InputGroup = styled.div`
  input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const PreviewContainer = styled.div`
  text-align: center;
  margin-top: 20px;

  h4 {
    color: white;
    margin-bottom: 15px;
    font-family: "Special Elite", cursive;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

const StyleButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const StyleButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  background: ${(props) =>
    props.active ? "#74942c" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.active ? "#8ab435" : "rgba(255, 255, 255, 0.2)"};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SubmitButton = styled.button`
  background: #74942c;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 15px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${(props) => (props.disabled ? "#74942c" : "#8ab435")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 5px 15px rgba(116, 148, 44, 0.3)"};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(1px)")};
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

export default NewUser;