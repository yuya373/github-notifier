import React from 'react';
import Link from './nav/Link.js.jsx';
import Icon from './Icon.js.jsx';

export default function Nav({
  location, repositories,
  clearRepositories,
}) {
  const renderRepositories = () => repositories.map((e) => (
    <div key={e.nameWithOwner} >
      <Link to={`/repositories/${e.nameWithOwner}`} location={location} >
        <span className="font-weight-bold">
          {e.nameWithOwner}
        </span>
      </Link>
      <Link to={`/repositories/${e.nameWithOwner}/pullRequests`} location={location} >
        <span className="ml-20">
          Pull Requests
          <span className="badge badge-pill badge-default ml-10">
            {e.pullRequests.totalCount}
          </span>
        </span>
      </Link>
      <Link to={`/repositories/${e.nameWithOwner}/issues`} location={location} >
        <span className="ml-20">
          Issues
          <span className="badge badge-pill badge-default ml-10">
            {e.issues.totalCount}
          </span>
        </span>
      </Link>
    </div>
  ));

  const renderClearRepository = () => {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <a
        className="nav-group-item"
        onClick={clearRepositories}
        >
        Clear Repositories
      </a>
    );
  };

  return (
    <nav className="nav-group">
      <h5 className="nav-group-title">
        Repositories
      </h5>
      {renderRepositories()}
      <Link to="/addRepository" location={location} >
        <Icon name="icon-plus" />
        Add Repository
      </Link>

      <h5 className="nav-group-title">
        Config
      </h5>
      <Link to="/" location={location} >
        <span className="icon icon-home" /> Home
      </Link>
      <Link to="/token" location={location} >
        <Icon name="icon-key" /> Token
      </Link>
      <Link to="/timers" location={location} >
        <Icon name="icon-clock" /> Timers
      </Link>
      {renderClearRepository()}
    </nav>
  );
}
