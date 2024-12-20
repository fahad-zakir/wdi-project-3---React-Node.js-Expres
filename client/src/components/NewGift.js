import React, { Component } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

class NewGift extends Component {
  state = {
    newGift: {
      giftName: "",
      for: "",
      price: "",
      giftPhotoUrl: "",
    },
    redirect: false,
    error: null,
    isSearchingImage: false,
    previewImage: null,
  };

  fetchImageForGift = async (giftName) => {
    try {
      this.setState({ isSearchingImage: true });

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
          giftName
        )}&searchType=image&num=1`
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const imageUrl = data.items[0].link;
        this.setState({ previewImage: imageUrl });
        return imageUrl;
      }
      return null;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    } finally {
      this.setState({ isSearchingImage: false });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = this.props.match.params.userId;
      let giftData = { ...this.state.newGift };

      // If no photo URL is provided, use the preview image or search for one
      if (!giftData.giftPhotoUrl.trim()) {
        const imageUrl =
          this.state.previewImage ||
          (await this.fetchImageForGift(giftData.giftName));
        if (imageUrl) {
          giftData.giftPhotoUrl = imageUrl;
        }
      }

      await this.props.createGift(userId, giftData);
      this.setState({ redirect: true });
    } catch (error) {
      this.setState({ error: "Failed to create gift" });
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newGift: {
        ...prevState.newGift,
        [name]: value,
      },
    }));

    // If gift name changes and no photo URL is set, search for an image
    if (name === "giftName" && value && !this.state.newGift.giftPhotoUrl) {
      await this.fetchImageForGift(value);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/user/${this.props.match.params.userId}/gifts`} />;
    }

    return (
      <GiftFormContainer>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
        </nav>

        <h1>Add New Gift</h1>

        <FormCard>
          <form onSubmit={this.handleSubmit}>
            <InputGroup>
              <input
                onChange={this.handleChange}
                name="giftName"
                placeholder="Gift Name"
                type="text"
                required
                value={this.state.newGift.giftName}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="for"
                placeholder="For"
                type="text"
                required
                value={this.state.newGift.for}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="price"
                placeholder="Price"
                type="number"
                required
                value={this.state.newGift.price}
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="giftPhotoUrl"
                placeholder="Photo URL (optional - will auto-search if empty)"
                type="text"
                value={this.state.newGift.giftPhotoUrl}
              />
            </InputGroup>

            {this.state.previewImage && (
              <PreviewContainer>
                <h4>Preview Image:</h4>
                <img src={this.state.previewImage} alt="Preview" />
              </PreviewContainer>
            )}

            <SubmitButton type="submit" disabled={this.state.isSearchingImage}>
              {this.state.isSearchingImage
                ? "Searching for image..."
                : "Add Gift"}
            </SubmitButton>
          </form>
        </FormCard>
      </GiftFormContainer>
    );
  }
}

const GiftFormContainer = styled.div`
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
        content: '';
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
    margin: 20px 0 40px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    animation: glow 3s infinite;

    @keyframes glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
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
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const PreviewContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  h4 {
    color: white;
    margin-bottom: 15px;
    font-family: "Special Elite", cursive;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: rgba(116, 148, 44, 0.9);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 15px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.disabled ? 'rgba(116, 148, 44, 0.9)' : '#8ab435'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(138, 180, 53, 0.3)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(1px)'};
  }

  &::after {
    content: '';
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

export default NewGift;