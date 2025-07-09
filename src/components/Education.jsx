import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the Education section
const EducationSection = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: #ffffff;

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

const EducationCard = styled.div`
  background-color: #111827;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 1400px;
  margin: 0 auto 2rem auto;
`;

const EducationTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const EducationInstitution = styled.p`
  color: #3b82f6;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const EducationDate = styled.p`
  color: #d1d5db;
`;

const Education = () => {
  const [educations, setEducations] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`${API}/education`);
        setEducations(res.data);
      } catch (error) {
        console.error("Failed to fetch education data:", error);
      }
    };

    fetchEducation();
  }, []);

  return (
    <EducationSection id="education">
      <Container>
        <SectionTitle>Education</SectionTitle>
        {educations.length === 0 ? (
          <p style={{ color: '#d1d5db', textAlign: 'center' }}>No education data found.</p>
        ) : (
          educations.map((edu) => (
            <EducationCard key={edu.id}>
              <EducationTitle>{edu.degree}</EducationTitle>
              <EducationInstitution>{edu.institution}</EducationInstitution>
              <EducationDate>{edu.duration}</EducationDate>
            </EducationCard>
          ))
        )}
      </Container>
    </EducationSection>
  );
};

export default Education;
