import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SimpleFormat from 'react-simple-format';
import IssueRow from './IssueRow.js.jsx';

const TOGGLE_THRESHOLD = 5;

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString(
//     undefined,
//     {year: "numeric", month: "2-digit", day: "2-digit"}
//   );
// };

function sortItems(items) {
  return items.sort((e, f) => e.number - f.number);
}

function takeLatest(items, n = TOGGLE_THRESHOLD) {
  return sortItems(items).slice(0 - n).reverse();
}

export default class Repository extends Component {
  constructor(props) {
    super(props);
  }

  handleClickReload(e) {
    e.preventDefault();

    const {repository, fetching} = this.props;
    if (fetching) return;

    const {login} = repository.owner;

    this.props.clickReload(login, repository.name);
  }

  renderList(items) {
    const {repository} = this.props;

    return (
      <ul className="list-group">
        {
          takeLatest(items).map((e) => (
            <IssueRow
              key={e.number}
              repositoryName={repository.name}
              repositoryOwner={repository.owner.login}
              {...e}
              />
          ))
        }
      </ul>
    );
  }

  renderError() {
    if (!this.props.error) return null;
    return (
      <div className="alert alert-danger">
        <SimpleFormat text={this.props.error} />
      </div>
    );
  }

  render() {
    const {repository, fetching} = this.props;
    return (
      <div>
        <h1>
          {repository.name}
          <a
            href=""
            className="ml-20"
            onClick={(e) => this.handleClickReload(e)}
            >
            <i className={`fa fa-refresh ${fetching ? "fa-spin" : ""}`} />
          </a>
        </h1>
        {this.renderError()}
        <div>
          <h2>
            Issues
            <span className="badge badge-pill badge-default ml-10">
              {repository.issues.totalCount}
            </span>
          </h2>
          {this.renderList(repository.issues.nodes)}
          <div className="text-right">
            <Link to={`/repositories/${repository.nameWithOwner}/issues`} >
              View All Issues
            </Link>
          </div>
        </div>

        <div>
          <h2>
            Pull Requests
            <span className="badge badge-pill badge-default ml-10">
              {repository.pullRequests.totalCount}
            </span>
          </h2>
          {this.renderList(repository.pullRequests.nodes)}
          <div className="text-right">
            <Link to={`/repositories/${repository.nameWithOwner}/pullRequests`} >
              View All Pull Requests
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
