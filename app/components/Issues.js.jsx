import React from 'react';
import IssueRow from './IssueRow.js.jsx';

export default function Issue({
  nodes, totalCount, repositoryName, repositoryOwner,
}) {
  const renderIssues = () => nodes.
        sort((a, b) => b.number - a.number).
        map((e) => (
          <IssueRow
            key={e.number}
            repositoryName={repositoryName}
            repositoryOwner={repositoryOwner}
            {...e}
            />
        ));

  return (
    <div>
      <h1>
        Issues
        <span className="badge badge-pill badge-default ml-10">
          {totalCount}
        </span>
      </h1>
      <ul className="list-group">
        {renderIssues()}
      </ul>
    </div>
  );
}
