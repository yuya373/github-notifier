import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Comment({
  body, author, commentedAt,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
      >
      <div style={{flex: "none", marginRight: "20px"}} >
        <img
          src={author.avatarUrl}
          alt={author.login}
          style={{width: "44px"}}
          />
      </div>
      <div style={{flex: "1"}} >
        <div className="card">
          <div className="card-header">
            <span className="font-weight-bold" >
              {author.login}
            </span>
            {" commented on "}
            {commentedAt}
          </div>

          <div className="card-block">
            <div className="card-text">
              <ReactMarkdown
                softBreak="br"
                source={body}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
