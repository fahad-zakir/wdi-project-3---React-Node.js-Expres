import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

class GiftEditDelete extends Component {
  state = {
    gift: null,
    redirect: false,
    isLoading: true,
  };

  componentDidMount() {
    const { userId, giftId } = this.props.match.params;
    const user = this.props.users.find((u) => u._id === userId);

    if (user && user.gifts) {
      const gift = user.gifts.find((g) => g._id === giftId);
      if (gift) {
        this.setState({
          gift: { ...gift },
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: false,
          error: "Gift not found",
        });
      }
    } else {
      this.setState({
        isLoading: false,
        error: "User or gifts not found",
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      gift: {
        ...prevState.gift,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { userId } = this.props.match.params;
      await this.props.updateGift(userId, this.state.gift._id, this.state.gift);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Failed to update gift:", error);
    }
  };

  handleDelete = async () => {
    try {
      const { userId } = this.props.match.params;
      await this.props.deleteGift(userId, this.state.gift._id);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Failed to delete gift:", error);
    }
  };

  render() {
    const { isLoading, error, redirect, gift } = this.state;

    if (redirect) {
      return <Redirect to={`/user/${this.props.match.params.userId}/gifts`} />;
    }

    if (isLoading) {
      return <LoadingContainer>Loading...</LoadingContainer>;
    }

    if (error) {
      return <ErrorContainer>{error}</ErrorContainer>;
    }

    if (!gift) {
      return <ErrorContainer>Gift not found</ErrorContainer>;
    }

    return (
      <GiftFormContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/users">Back to Users</Link>
          <Link to={`/user/${this.props.match.params.userId}/gifts`}>
            Back to Gifts
          </Link>
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
                value={gift.giftName || ""}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="for"
                placeholder="For"
                type="text"
                value={gift.for || ""}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="price"
                placeholder="Price"
                type="number"
                value={gift.price || ""}
                required
              />
            </InputGroup>

            <InputGroup>
              <input
                onChange={this.handleChange}
                name="giftPhotoUrl"
                placeholder="Photo URL"
                type="text"
                value={gift.giftPhotoUrl || ""}
              />
            </InputGroup>

            {gift.giftPhotoUrl && (
              <PreviewContainer>
                <h4>Current Image:</h4>
                <img src={gift.giftPhotoUrl} alt="Gift preview" />
              </PreviewContainer>
            )}

            <ButtonGroup>
              <SubmitButton type="submit">Update Gift</SubmitButton>
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

// ... keep all imports and class logic the same until the styled components ...

const GiftFormContainer = styled.div`
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

  a {
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 20px;
    background: rgba(116, 148, 44, 0.9);
    color: white;
    font-size: 16px;
    transition: all 0.3s ease;
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
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  position: relative;
  overflow: hidden;

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

const SubmitButton = styled(BaseButton)`
  background: rgba(116, 148, 44, 0.9);

  &:hover {
    background: #8ab435;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 180, 53, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const DeleteButton = styled(BaseButton)`
  background: rgba(220, 53, 69, 0.9);

  &:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Special Elite", cursive;
  font-size: 1.5em;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #ff6b6b;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
`;

export default GiftEditDelete;
