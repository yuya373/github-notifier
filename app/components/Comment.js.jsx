import React from 'react';
import ReactMarkdown from 'react-markdown';
import CommentHeader from './CommentHeader.js.jsx';

export default function Comment({
  body, author, commentedAt,
}) {
  return (
    <div className="row" >
      <div className="col-1" >
        <img
          src={author.avatarUrl}
          alt={author.login}
          style={{width: "44px"}}
          />
      </div>
      <div className="col-11" >
        <div className="card" style={{maxWidth: "1080px"}}>
          <div className="card-header">
            <CommentHeader
              author={author}
              commentedAt={commentedAt}
              />
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
