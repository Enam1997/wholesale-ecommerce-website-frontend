// BlogPreview.js
import React from "react";
import "./blogPreview.css";

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "Latest Fashion Trends in 2023",
      excerpt:
        "Discover the hottest fashion trends of 2023 and how to style them...",
      image:
        "https://plus.unsplash.com/premium_photo-1672883551901-caa4758abba7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
    },
    {
      id: 2,
      title: "How to Choose the Right Outfit",
      excerpt:
        "Tips and tricks on selecting the perfect outfit for any occasion...",
      image:
        "https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
    },
    // Add more posts as needed
  ];

  return (
    <div className="blogPreview">
      <h2>From Our Blog</h2>
      <div className="blogPreview__grid">
        {posts.map((post) => (
          <div key={post.id} className="blogPreview__card">
            {/* Image sixe 400 * 250 */}
            <img src={post.image} alt={post.title} />
            <div className="blogPreview__content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href={post.link} className="btn">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
