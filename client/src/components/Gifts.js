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
  background: #b39b86;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GiftImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

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
  background: #d3d3d3;
  color: #666;
  font-family: "Special Elite", cursive;
`;

const GiftInfo = styled.div`
  padding: 15px;
  color: white;

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

const EditLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #74942c;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #8ab435;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
