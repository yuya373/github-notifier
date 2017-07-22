import React from 'react';
import {formatTime} from './../utils/date.js';
import Comment from './Comment.js.jsx';

export default function Issue({
  title, number, state, author, publishedAt, createdAt,
  comments, body, reviews, reviewRequests, assignees, headRefName, baseRefName,
  labels,
}) {
  const isIssue = createdAt ? true : false;
  const openedAt = formatTime(publishedAt || createdAt);
  const commentComponents = comments.nodes.map((e, i) => (
    <div
      key={i}
      className="mt-30"
      >
      <Comment
        author={e.author}
        body={e.bodyText}
        commentedAt={e.lastEditedAt || e.publishedAt}
        />
    </div>
  ));

  const reviewers = () => reviews.nodes.map((e) => e.author).
        concat(reviewRequests.nodes.map((e) => e.reviewer)).
        reduce((a, e) => {
          if (!a.find((f) => f.login === e.login)) return a.concat([e]);
          return a;
        }, []);

  const renderActor = ({login, avatarUrl}, i) => (
    <li
      key={i}
      className="list-inline-item"
      >
      <img
        alt={login}
        src={avatarUrl}
        style={{width: "44px"}}
        />
      <p className="mt-0 font-weight-bold">
        {login}
      </p>
    </li>
  );

  const renderReviewers = () => {
    if (!reviews || !reviewRequests) return null;

    return (
      <div>
        <h4>
          Reviewers
        </h4>
        <ul className="list-inline">
          {reviewers().map(renderActor)}
        </ul>
      </div>
    );
  };

  const renderLabel = ({color, name}, i) => (
    <li key={i} style={{paddingBottom: "5px"}} >
      <span
        style={{
          backgroundColor: `#${color}`,
          textAlign: "left",
          fontSize: "1rem",
        }}
        className="badge badge-default font-weight-bold"
        >
        {name}
      </span>
    </li>
  );

  return (
    <div className="container">
      <h1>
        <span>
          {title}
        </span>
        <span className="text-muted ml-10">
          #{number}
        </span>
      </h1>
      <h4 className="mt-0">
        <span className="badge badge-success" >
          {state}
        </span>
        <span className="ml-10">
          {author.login}
          {" "}
          {isIssue ? `opened this issue at ${openedAt}` : `wants to merge x commits into ${baseRefName} from ${headRefName}`}
          {" "}
        </span>
        <span className="ml-20">
          {comments.totalCount} comments
        </span>
      </h4>

      <div className="pt-30 row" >
        <div className="col-8" >
          <Comment
            author={author}
            commentedAt={publishedAt || createdAt}
            body={body}
            />
          {commentComponents}
        </div>
        <div className="col-2" >
          <div className="ml-30">
            {renderReviewers()}
            <h4>
              Assignees
            </h4>
            <ul className="list-inline">
              {assignees.nodes.map(renderActor)}
            </ul>
            <h4>
              Labels
            </h4>
            <ul className="list-unstyled">
              {labels.nodes.map(renderLabel)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
