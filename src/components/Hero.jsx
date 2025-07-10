import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the Hero section
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
    url('https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010138.jpg?size=626&ext=jpg')
    no-repeat center center/cover;
  position: relative;
  color: #ffffff;
  text-align: left;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: #e5e7eb;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0.5rem;
  text-decoration: none;

  &:hover {
    background-color: #60a5fa;
    transform: scale(1.05);
  }
`;

const Hero = () => {
  const [profile, setProfile] = useState({ name: '', tagline: '' });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/profile`);
        setProfile(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <HeroSection id="home">
      <Container>
        <HeroContent>
          <HeroTitle>{profile.name}</HeroTitle>
          <HeroSubtitle>{profile.tagline}</HeroSubtitle>
          <div>
            <Button href="#contact">Get in Touch</Button>
            <Button
              href="#projects"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #60a5fa',
              }}
            >
              View Work
            </Button>
          </div>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
