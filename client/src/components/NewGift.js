import React, { Component } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";

const GOOGLE_API_KEY = "AIzaSyBOGUTwZ_QGxYJ4G3ylAJCKWeBDhWnhx4g";
const SEARCH_ENGINE_ID = "c61d59ea9fae040ad";

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

export default NewGift;

const GiftFormContainer = styled.div`
  min-height: 100vh;
  background: rgb(255, 247, 230);
  padding: 20px;

  nav {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    a {
      text-decoration: none;
      color: #333;
      font-size: 18px;
      font-family: "Special Elite", cursive;

      &:hover {
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      }
    }
  }

  h1 {
    text-align: center;
    color: #333;
    font-family: "Special Elite", cursive;
    font-size: 2.5em;
    margin-bottom: 20px;
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
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: #ff9800;
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
    background: ${(props) => (props.disabled ? "#ff9800" : "#f57c00")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(1px)")};
  }
`;
