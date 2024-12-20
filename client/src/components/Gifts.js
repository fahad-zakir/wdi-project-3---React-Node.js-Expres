import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Gifts = ({ giftName, for: giftFor, price, photoUrl, id, userId }) => {
  return (
    <GiftCard>
      <GiftImage>
        {photoUrl ? (
          <img src={photoUrl} alt={giftName} />
        ) : (
          <DefaultImage>No Image</DefaultImage>
        )}
      </GiftImage>
      <GiftInfo>
        <h3>{giftName}</h3>
        <p>For: {giftFor}</p>
        <p>Price: ${price}</p>
        <EditLink to={`/user/${userId}/gifts/edit/${id}`}>Edit Gift</EditLink>
      </GiftInfo>
    </GiftCard>
  );
};

export default Gifts;

const GiftCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
  }
`;

const GiftImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  font-family: "Special Elite", cursive;
`;

const GiftInfo = styled.div`
  padding: 20px;
  color: white;

  h3 {
    margin: 0 0 15px;
    font-family: "Special Elite", cursive;
    font-size: 1.4em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }

  p {
    margin: 8px 0;
    font-size: 1.1em;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const EditLink = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  background: rgba(116, 148, 44, 0.9);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
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
`;
