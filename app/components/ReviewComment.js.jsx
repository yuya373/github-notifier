import React from 'react';
import ReactMarkdown from 'react-markdown';
import Avatar from './Avatar.js.jsx';
import CommentHeader from './CommentHeader.js.jsx';

export default function ReviewComment({
  body, state, author, commentedAt,
}) {
  const color = state === "CHANGES_REQUESTED" ?
        "text-danger" : state === "APPROVED" ?
        "text-success" : "";
  return (
    <div className="row mt-30">
      <div className="col-1">
        <Avatar {...author} />
      </div>
      <div className="col-11">
        <div className="card" style={{maxWidth: "1080px"}}>
          <div className="card-header">
            <CommentHeader
              author={author}
              commentedAt={commentedAt}
              />
            <span
              style={{float: "right"}}
              className={`${color} font-weight-bold `}
              >
              {state}
            </span>
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
