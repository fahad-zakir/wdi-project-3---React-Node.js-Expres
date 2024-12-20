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
    searchStyle: "cartoon", // Added to track avatar style
  };

  fetchAvatarImage = async (name) => {
    try {
      this.setState({ isSearchingImage: true });

      // Different style queries
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

    if (
      (name === "firstName" || name === "lastName") &&
      !this.state.newUser.photoUrl &&
      this.state.newUser.firstName &&
      this.state.newUser.lastName
    ) {
      const fullName = `${this.state.newUser.firstName} ${this.state.newUser.lastName}`;
      await this.fetchAvatarImage(fullName);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!this.state.newUser.photoUrl.trim()) {
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
                  >
                    Cartoon
                  </StyleButton>
                  <StyleButton
                    active={this.state.searchStyle === "minimal"}
                    onClick={() => this.handleStyleChange("minimal")}
                  >
                    Minimal
                  </StyleButton>
                  <StyleButton
                    active={this.state.searchStyle === "anime"}
                    onClick={() => this.handleStyleChange("anime")}
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

// ... existing styled components ...

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
  background: ${(props) => (props.active ? "#74942c" : "#999")};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    background: ${(props) => (props.active ? "#8ab435" : "#888")};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const UserFormContainer = styled.div`
  min-height: 100vh;
  background: rgb(255, 247, 230);
  padding: 20px;

  nav {
    display: block;

    a {
      font-family: "Lato", sans-serif;
      font-family: "Playfair Display", serif;
      font-weight: 300;
      text-decoration: none;
      color: black;
      font-size: 20px;
      padding: 30px;
      z-index: auto;

      &:hover {
        text-shadow: none;
        text-shadow: 2px 2px 2px silver;
      }
    }
  }

  h1 {
    text-align: center;
    color: #333;
    font-family: "Special Elite", cursive;
    font-size: 2.5em;
    margin-bottom: 40px;
    padding-top: 50px;
  }
`;

const FormCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: #b39b86;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: rgba(255, 255, 255, 0.5);
      background: white;
    }

    &::placeholder {
      color: #666;
    }
  }
`;

const PreviewContainer = styled.div`
  text-align: center;
  margin-top: 10px;

  h4 {
    color: white;
    margin-bottom: 10px;
    font-family: "Special Elite", cursive;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
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
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 5px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover {
    background: ${(props) => (props.disabled ? "#74942c" : "#8ab435")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(1px)")};
  }
`;

export default NewUser;
