import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

class EditGift extends Component {
  state = {
    gift: {
      giftName: "",
      for: "",
      price: "",
      giftPhotoUrl: "",
    },
    redirect: false,
    isLoading: true,
  };

  componentDidMount() {
    const { userId, giftId } = this.props.match.params;
    const user = this.props.users.find(u => u._id === userId);
    if (user) {
      const gift = user.gifts.find(g => g._id === giftId);
      if (gift) {
        this.setState({ 
          gift: { ...gift },
          isLoading: false 
        });
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      gift: {
        ...prevState.gift,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { userId, giftId } = this.props.match.params;
      await this.props.updateGift(userId, giftId, this.state.gift);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Failed to update gift:", error);
    }
  };

  handleDelete = async () => {
    try {
      const { userId, giftId } = this.props.match.params;
      await this.props.deleteGift(userId, giftId);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Failed to delete gift:", error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/user/${this.props.match.params.userId}/gifts`} />;
    }

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <GiftFormContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/users">Back to Users</Link>
          <Link to={`/user/${this.props.match.params.userId}/gifts`}>Back to Gifts</Link>
        </NavBar>

        <Title>Update Gift</Title>

        <FormCard>
          <form onSubmit={this.handleSubmit}>
            <InputGroup>
              <input
                onChange={this.handleChange}
                name="giftName"
                placeholder="Gift Name"
                type="text"
                value={this.state.gift.giftName}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="for"
                placeholder="For"
                type="text"
                value={this.state.gift.for}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="price"
                placeholder="Price"
                type="number"
                value={this.state.gift.price}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="giftPhotoUrl"
                placeholder="Photo URL"
                type="text"
                value={this.state.gift.giftPhotoUrl}
              />
            </InputGroup>

            {this.state.gift.giftPhotoUrl && (
              <PreviewContainer>
                <h4>Current Image:</h4>
                <img src={this.state.gift.giftPhotoUrl} alt="Gift preview" />
              </PreviewContainer>
            )}

            <ButtonGroup>
              <SubmitButton type="submit">
                Update Gift
              </SubmitButton>
              <DeleteButton type="button" onClick={this.handleDelete}>
                Delete Gift
              </DeleteButton>
            </ButtonGroup>
          </form>
        </FormCard>
      </GiftFormContainer>
    );
  }
}

export default EditGift;

const GiftFormContainer = styled.div`
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
  font-family: 'Special Elite', cursive;
  font-size: 2.5em;
  margin: 20px 0 40px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  flex: 1;
  background: #74942c;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #8ab435;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  background: #dc3545;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;