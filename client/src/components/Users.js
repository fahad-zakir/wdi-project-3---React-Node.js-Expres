import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  state = {
    showConfirmation: false,
  };

  toggleConfirmation = () => {
    this.setState((prevState) => ({
      showConfirmation: !prevState.showConfirmation,
    }));
  };

  handleDelete = async () => {
    try {
      await axios.delete(`/users/${this.props.id}/delete`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  render() {
    const { firstName, lastName, email, photoUrl, id } = this.props;
    const { showConfirmation } = this.state;

    return (
      <UserCard>
        <DeleteButton onClick={this.toggleConfirmation}>×</DeleteButton>

        {showConfirmation && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Delete User</h3>
              <p>Are you sure you want to delete {firstName}?</p>
              <p>This will also delete all their gifts.</p>
              <ButtonGroup>
                <CancelButton onClick={this.toggleConfirmation}>
                  Cancel
                </CancelButton>
                <ConfirmButton onClick={this.handleDelete}>
                  Delete
                </ConfirmButton>
              </ButtonGroup>
            </ModalContent>
            <Overlay onClick={this.toggleConfirmation} />
          </ConfirmationModal>
        )}

        <Link to={`/user/${id}/gifts`}>
          <CardContent>
            <UserImage>
              {photoUrl ? (
                <img src={photoUrl} alt={`${firstName} ${lastName}`} />
              ) : (
                <DefaultImage
                  src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2070&auto=format&fit=crop"
                  alt="Default gifts"
                />
              )}
            </UserImage>
            <UserInfo>
              <h3>
                {firstName} {lastName}
              </h3>
              <p>{email}</p>
            </UserInfo>
          </CardContent>
        </Link>
      </UserCard>
    );
  }
}

const UserCard = styled.div`
  position: relative;
  background: #b39b86;
  border-radius: 12px;
  margin: 15px;
  width: 280px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  &:hover {
    background: #dc3545;
    transform: scale(1.1);
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgb(255, 247, 230);
  padding: 25px;
  border-radius: 12px;
  z-index: 1001;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-family: "Special Elite", cursive;
    color: #333;
    margin-bottom: 15px;
  }

  p {
    margin: 10px 0;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #5a6268;
  }
`;

const ConfirmButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const UserImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 3px solid white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  color: white;
  text-align: center;

  h3 {
    margin: 0 0 10px;
    font-family: "Special Elite", cursive;
    font-size: 1.4em;
  }

  p {
    margin: 5px 0;
    font-size: 1.1em;
  }
`;

export default Users;
