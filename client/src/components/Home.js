import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

class Home extends Component {
  render() {
    return (
      <HomeContainer>
        {/* Animated Background Elements */}
        <FloatingGift style={{ "--delay": "0s" }} className="gift-1">
          🎁
        </FloatingGift>
        <FloatingGift style={{ "--delay": "2s" }} className="gift-2">
          🎀
        </FloatingGift>
        <FloatingGift style={{ "--delay": "4s" }} className="gift-3">
          🎊
        </FloatingGift>
        <FloatingGift style={{ "--delay": "6s" }} className="gift-4">
          ✨
        </FloatingGift>
        <FloatingGift style={{ "--delay": "8s" }} className="gift-5">
          🎁
        </FloatingGift>

        <GlassCard>
          <SparkleWrapper>
            <Sparkles>
              {[...Array(20)].map((_, i) => (
                <Sparkle key={i} style={{ "--delay": `${i * 0.5}s` }} />
              ))}
            </Sparkles>
          </SparkleWrapper>

          <Content>
            <LogoWrapper>
              <GiftIcon>🎁</GiftIcon>
              <Title>Gifts Wishlist</Title>
            </LogoWrapper>

            <StyledLink to="/users">
              <LoginButton>
                <ButtonContent>
                  <span>Enter Wishlist</span>
                  <StarSparkle>✨</StarSparkle>
                </ButtonContent>
              </LoginButton>
            </StyledLink>
          </Content>
        </GlassCard>
      </HomeContainer>
    );
  }
}

// Animations
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const FloatingGift = styled.div`
  position: absolute;
  font-size: 2rem;
  animation: ${float} 6s infinite ease-in-out;
  animation-delay: var(--delay);
  opacity: 0.6;

  &.gift-1 {
    top: 10%;
    left: 10%;
  }
  &.gift-2 {
    top: 20%;
    right: 20%;
  }
  &.gift-3 {
    bottom: 30%;
    left: 30%;
  }
  &.gift-4 {
    bottom: 10%;
    right: 10%;
  }
  &.gift-5 {
    top: 50%;
    left: 50%;
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 90%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
`;

const SparkleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Sparkles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: ${sparkle} 2s infinite;
  animation-delay: var(--delay);
  top: ${() => Math.random() * 100}%;
  left: ${() => Math.random() * 100}%;
`;

const Content = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px;
`;

const GiftIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${float} 3s infinite ease-in-out;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.5em;
  color: white;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  animation: ${glow} 3s infinite;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StarSparkle = styled.span`
  animation: ${float} 2s infinite ease-in-out;
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 25px rgba(255, 107, 107, 0.3);

    &::after {
      transform: translateX(100%);
    }
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
`;

export default Home;
