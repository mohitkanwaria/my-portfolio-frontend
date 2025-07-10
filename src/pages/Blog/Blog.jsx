import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BlogSection,
  Container,
  HeaderRow,
  SectionTitle,
  AddBlogButton,
  BackButton,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogInfo,
  BlogTitle,
  BlogExcerpt,
  ReadMore,
  ModalOverlay,
  Modal,
  ModalTitle,
  Input,
  TextArea,
  ModalActions,
  SubmitButton,
  CancelButton
} from "./Blog.styles"; // Adjust the path if needed


const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
  });
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowReadModal(true);
  };

  const handleAddBlog = async () => {
    try {
      const res = await axios.post(`${API}/api/blogs`, formData);
      alert(`✅ Blog added: ${res.data.title}`);
      setFormData({ title: "", slug: "", content: "", excerpt: "" });
      setShowModal(false);
      fetchBlogs(); // refresh blog list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add blog");
    }
  };

  return (
    <BlogSection>
      <Container>
        <HeaderRow>
          <BackButton onClick={() => navigate("/")}>← Back</BackButton>
          <div style={{ flex: 1, textAlign: "center" }}>
            <SectionTitle>Blog</SectionTitle>
          </div>
          <AddBlogButton onClick={() => setShowModal(true)}>
            Add Blog
          </AddBlogButton>
        </HeaderRow>

        <BlogGrid>
          {blogs.length === 0 ? (
            <p style={{ color: "#d1d5db" }}>No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <BlogCard key={blog.id}>
                <BlogImage image="/assets/Blog_Image.jpg" />
                <BlogInfo>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                  <ReadMore onClick={() => handleReadMore(blog)}>
                    Read More
                  </ReadMore>
                </BlogInfo>
              </BlogCard>
            ))
          )}
        </BlogGrid>

        {/* Modal */}
        <ModalOverlay show={showModal}>
          <Modal>
            <ModalTitle>Add New Blog</ModalTitle>
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <Input
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
            />
            <TextArea
              name="excerpt"
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={handleChange}
            />
            <TextArea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
            />
            <ModalActions>
              <CancelButton onClick={() => setShowModal(false)}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={handleAddBlog}>Submit</SubmitButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
        <ModalOverlay show={showReadModal}>
          <Modal>
            <ModalTitle>{selectedBlog?.title}</ModalTitle>
            <p style={{ color: "#9ca3af", marginBottom: "0.5rem" }}>
              <strong>Slug:</strong> {selectedBlog?.slug}
            </p>
            <p
              style={{
                color: "#cbd5e1",
                fontStyle: "italic",
                marginBottom: "1rem",
              }}
            >
              {selectedBlog?.excerpt}
            </p>
            <div
              style={{
                color: "#f8fafc",
                whiteSpace: "pre-line",
                marginBottom: "1rem",
              }}
            >
              {selectedBlog?.content}
            </div>
            <ModalActions>
              <SubmitButton onClick={() => setShowReadModal(false)}>
                Close
              </SubmitButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      </Container>
    </BlogSection>
  );
};

export default Blog;
