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

const SkillsSection = styled.section`
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

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const SkillCategory = styled.div`
  background-color: #111827;
  border-radius: 8px;
  padding: 2rem;
  flex: 1;
  min-width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const CategoryTitle = styled.h3`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffffff;
  font-size: 1.8rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const SkillItem = styled.div`
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #60a5fa;
  }
`;

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [isVisible, setIsVisible] = useState([]);
  const skillRefs = useRef([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${API}/api/skills`);
        const sorted = res.data.sort((a, b) => a.id - b.id); // Optional: Sort categories
        setSkillsData(sorted);
        setIsVisible(new Array(sorted.length).fill(false));
      } catch (err) {
        console.error("Failed to fetch skills data:", err);
      }
    };
    fetchSkills();
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

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      skillRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [skillsData]);

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle>Skills</SectionTitle>
        <SkillsContainer>
          {skillsData.map((category, index) => (
            <SkillCategory
              key={category.id}
              ref={(el) => (skillRefs.current[index] = el)}
              delay={isVisible[index] ? `${index * 0.5}s` : '0s'}
            >
              <CategoryTitle>{category.name}</CategoryTitle>
              <SkillList>
                {category.skills.map((skill, i) => (
                  <SkillItem key={i}>{skill}</SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
