import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the Footer section
const FooterStyled = styled.footer`
  background-color: #000000;
  color: #d1d5db;
  text-align: center;
  padding: 2rem 0;
  font-size: 1.2rem;
`;

const FooterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
`;

const Footer = () => {
  const [footerData, setFooterData] = useState({
    copyright: '',
    location: '',
  });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get(`${API}/api/footer`);
        setFooterData(response.data);
      } catch (error) {
        console.error('Failed to fetch footer:', error);
      }
    };

    fetchFooter();
  }, []);

  return (
    <FooterStyled>
      <FooterContent>
        <p>{footerData?.copyright}</p>
        <p>{footerData?.location }</p>
      </FooterContent>
    </FooterStyled>
  );
};

export default Footer;
