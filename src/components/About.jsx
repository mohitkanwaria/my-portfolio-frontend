import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

// Styled components (same as your original)
const AboutSection = styled.section`
  background-color: #0f172a;
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: #ffffff;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #3b82f6;
  }
`;

const AboutContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const AboutText = styled.div`
  flex: 3;
`;

const AboutImage = styled.div`
  flex: 2;
  text-align: center;
`;

const Image = styled.img`
  width: 70%;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 576px) {
    width: 80%;
  }
`;

const SubTitle = styled.h3`
  margin-bottom: 1rem;
  color: #ffffff;
  font-size: 1.8rem;
`;

const Paragraph = styled.p`
  color: #d1d5db;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: #ffffff;
  transition: all 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    background-color: #60a5fa;
    transform: translateY(-3px);
  }
`;

const About = () => {
  const [about, setAbout] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${API}/about`);
        setAbout(response.data);
      } catch (error) {
        console.error("Failed to fetch About Me data:", error);
      }
    };

    fetchAbout();
  }, []);

  if (!about) return null; // Or show a loader

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
          <AboutImage>
            <Image 
            // src="../../public/assets/Mohit_Profile_Image.jpeg" 
            src={about.image} 
            alt={about.image_name} />
          </AboutImage>
          <AboutText>
            <SubTitle>{about.title} </SubTitle>
            {about.description.split('\n\n').map((para, i) => (
              <Paragraph key={i}>{para}</Paragraph>
            ))}
            <SocialLinks>
              <SocialLink href={about.linkedin} target="_blank" title="LinkedIn" rel="noopener noreferrer">
                <FaLinkedinIn />
              </SocialLink>
              <SocialLink href={about.github} target="_blank" title="GitHub" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href={about.email} target="_blank" title="Email" rel="noopener noreferrer" >
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </AboutText>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
