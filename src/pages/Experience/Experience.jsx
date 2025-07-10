import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Keyframes for the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components for the Experience section
const ExperienceSection = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1400px;
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

const ExperienceCard = styled.div`
  background-color: #111827;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const ExperienceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ExperienceCompany = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #ffffff;
`;

const ExperienceDate = styled.div`
  color: #3b82f6;
  font-weight: 500;
`;

const ExperienceDescription = styled.div`
  ul {
    list-style-position: inside;
    margin-left: 1rem;
  }

  li {
    color: #d1d5db;
    margin-bottom: 0.5rem;
  }
`;

const Experience = () => {
  const [isVisible, setIsVisible] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const cardRefs = useRef([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${API}/api/experience`);
        setExperiences(response.data);
        setIsVisible(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching experience data:', error);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [experiences]);

  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle>Work Experience</SectionTitle>
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={exp.id}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ animationDelay: isVisible[index] ? `${index * 0.5 + 0.5}s` : 'none' }}
          >
            <ExperienceTitle>
              <ExperienceCompany>{exp.company}</ExperienceCompany>
              <ExperienceDate>{exp.duration}</ExperienceDate>
            </ExperienceTitle>
            <ExperienceDescription>
              <ul>
                {exp.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{highlight}</li>
                ))}
              </ul>
            </ExperienceDescription>
          </ExperienceCard>
        ))}
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
