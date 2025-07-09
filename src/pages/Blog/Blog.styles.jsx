// Blog.styles.js
import styled from "styled-components";

export const BlogSection = styled.section`
  padding: 5rem 0;
  background-color: #0f172a;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: bold;
  position: relative;
  display: inline-block;

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

export const AddBlogButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.85rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #60a5fa;
    transform: scale(1.05);
  }
`;

export const BackButton = styled(AddBlogButton)``;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

export const BlogCard = styled.div`
  background-color: #111827;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }
`;

export const BlogImage = styled.div`
  height: 220px;
  background-color: #1f2937;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

export const BlogInfo = styled.div`
  padding: 1.5rem;
`;

export const BlogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

export const BlogExcerpt = styled.p`
  margin-bottom: 1.2rem;
  color: #d1d5db;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const ReadMore = styled.a`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #60a5fa;
    transform: scale(1.05);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #1e293b;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

export const ModalTitle = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #374151;
  background: #0f172a;
  color: #fff;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #374151;
  background: #0f172a;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const SubmitButton = styled(AddBlogButton)``;

export const CancelButton = styled(SubmitButton)`
  background-color: #6b7280;

  &:hover {
    background-color: #9ca3af;
  }
`;
