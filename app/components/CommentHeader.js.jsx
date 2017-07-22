import React from 'react';
import {formatTime} from './../utils/date.js';

export default function CommentHeader({
  author, commentedAt
}) {
  return (
    <span>
      <span className="font-weight-bold" >
        {author.login}
      </span>
      {" commented on "}
      {formatTime(commentedAt)}
    </span>
  );
}
