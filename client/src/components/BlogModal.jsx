import React from 'react';

const BlogModal = ({ isOpen, onClose, data }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div>
            {data.map(blog => (
              <div key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default BlogModal