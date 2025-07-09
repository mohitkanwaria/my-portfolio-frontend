import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

// Styled components...
const HeaderStyled = styled.header`
  background-color: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  padding: 0.5rem 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    position: fixed;
    top: 3.5rem;
    left: 0;
    background-color: rgba(17, 24, 39, 0.95);
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    z-index: 99;
    &.active {
      transform: translateY(0);
    }
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const NavLink = styled.a`
  color: #e5e7eb;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 21px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  margin: 2px 0;
  background-color: #e5e7eb;
`;

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [name, setName] = useState(""); // default fallback
  const API = import.meta.env.VITE_API_URL;

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    // Fetch header name from API
    const fetchName = async () => {
      try {
        const res = await axios.get(`${API}/header`);
        if (res.data?.name) {
          setName(res.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch header name", error);
      }
    };

    fetchName();

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-links a");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderStyled>
      <Nav>
        <Logo href="#home">{name}</Logo>
        <NavLinks className={isMenuActive ? "active nav-links" : "nav-links"}>
          {["home", "about", "experience", "projects", "skills", "education", "contact"].map((item) => (
            <NavItem key={item}>
              <NavLink href={`#${item}`} onClick={toggleMenu}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </NavItem>
          ))}
          <NavItem>
            <Link
              to="/blog"
              onClick={() => setIsMenuActive(false)}
              style={{
                color: "#e5e7eb",
                fontWeight: 600,
                fontSize: "1.1rem",
                textDecoration: "none",
              }}
            >
              Blog
            </Link>
          </NavItem>
        </NavLinks>
        <Hamburger onClick={toggleMenu}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
      </Nav>
    </HeaderStyled>
  );
};

export default Header;
