import React from "react";

export const Comments = ({ comment, index = 0 }) => {
  return (
    <div key={comment._id} className="Comments">
      <div className="avatar">
        <img
          alt="avatar"
          src={`https://source.unsplash.com/50x50/?avatar,${index}`}
        />
      </div>
      <div className="component">
        <div className="author">{comment.author}</div>
        <div className="date">{comment.date}</div>
        <div className="text">{comment.text}</div>
        <div className="reply">
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};
