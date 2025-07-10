import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Styled components (unchanged)
const ContactSection = styled.section`
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

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactForm = styled.div`
  flex: 2;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const ContactIcon = styled.div`
  margin-right: 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const ContactText = styled.div`
  font-weight: 500;
  color: #d1d5db;
  font-size: 1.1rem;

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.1rem;

    &:hover {
      color: #60a5fa;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormControl = styled.input`
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: #d1d5db;
  border-radius: 4px;
  font-size: 1.1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: #d1d5db;
  border-radius: 4px;
  font-size: 1.1rem;
  resize: vertical;
  min-height: 150px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.85rem 1.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
  font-size: 1.1rem;

  &:hover {
    background-color: #60a5fa;
  }
`;

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const API = import.meta.env.VITE_API_URL;

  // Fetch contact-info on mount
  useEffect(() => {
    axios
      .get(`${API}/api/contact-info`)
      .then((res) => setContactInfo(res.data))
      .catch((err) =>
        console.error("Failed to fetch contact-info:", err)
      );
  }, [API]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/api/contact`,
        formData
      );
      if (response.data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Something went wrong!");
      }
    } catch (error) {
      console.error("POST error:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  // Show nothing (or a loader) until contactInfo is loaded
  if (!contactInfo) return null;

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>Contact</SectionTitle>
        <ContactContainer>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>
                {contactInfo.location}
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactText>
                {contactInfo.phone}
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaLinkedinIn />
              </ContactIcon>
              <ContactText>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaGithub />
              </ContactIcon>
              <ContactText>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </ContactText>
            </ContactItem>
          </ContactInfo>

          <ContactForm>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <TextArea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">
                Send Message
              </Button>
            </form>
          </ContactForm>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact;
