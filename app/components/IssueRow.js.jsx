import React from 'react';
import {Link} from 'react-router-dom';
import {formatTime} from './../utils/date.js';

export default function IssueRow({
  title, number, createdAt, publishedAt, author, assignees, reviews,
  comments, repositoryName, repositoryOwner,
}) {
  const renderAssignee = (assignee, i) => (
    <span
      key={i}
      className="ml-5 text-bold"
      >
      {assignee.login}
    </span>
  );

  const renderAssigneeImg = (assignee, i) => (
    <img
      key={i}
      className="img-thumbnail float-left"
      src={assignee.avatarUrl}
      style={{width: "40px"}}
      />
  );

  const renderReview = (review, i) => {
    const color = review.state === "CHANGES_REQUESTED" ?
          "text-danger" : review.state === "APPROVED" ?
          "text-success" : "";

    return (
      <span
        key={i}
        className={`ml-5 ${color}`}
        >
        {review.state}
      </span>
    );
  };

  const renderReviews = (reviews) => {
    if (!reviews) return null;
    return (
      <p>Reviews: {reviews.nodes.map(renderReview)}</p>
    );
  };
  return (
    <li className="list-group-item" >
      <Link to={`/repositories/${repositoryOwner}/${repositoryName}/${number}`} >
        <div className="media-body float-left" style={{width: "90%"}}>
          <h4>{title}</h4>
          <p className="text-muted">
            <span>
              {`#${number}`}
            </span>
            <span className="ml-5">
              {`opened on ${formatTime(createdAt || publishedAt)}`}
            </span>
            <span className="ml-5">
              {"by "}
              <span className="font-weight-bold">
                {author.login}
              </span>
            </span>
          </p>
          <p>Assignees: {assignees.nodes.map(renderAssignee)}</p>
          {renderReviews(reviews)}
        </div>
        <div className="float-left" style={{width: "10%"}} >
          <div className="float-left" style={{width: "40px"}}>
            {assignees.nodes.slice(0, 2).map(renderAssigneeImg)}
          </div>
          <div className="float-right mt-5">
            <i className="fa fa-comment-o fa-flip-horizontal fa-2x" />
            <span className="ml-5 font-weight-bold">
              {comments.totalCount}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
