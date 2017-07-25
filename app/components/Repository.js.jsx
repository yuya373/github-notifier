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

  renderList(items, onClickIssue) {
    const {repository} = this.props;
    const name = repository.name;
    const owner = repository.owner.login;

    return (
      <ul className="list-group">
        {
          takeLatest(items).map((e) => (
            <IssueRow
              key={e.number}
              repositoryName={name}
              repositoryOwner={owner}
              onClickIssue={(args) => onClickIssue(args)}
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

  renderNewIssues() {
    const {notification} = this.props;
    if (!notification) return null;
    return this.renderList(notification.issue.newArrivals, this.props.handleClickIssue);
  }

  renderUpdatedIssues() {
    const {notification} = this.props;
    if (!notification) return null;
    return this.renderList(
      notification.issue.newComments,
      this.props.handleClickIssue
    );
  }

  renderNewPullRequests() {
    const {notification} = this.props;
    if (!notification) return null;
    return this.renderList(
      notification.pullRequest.newArrivals,
      this.props.handleClickPullRequest
    );
  }

  renderUpdatedPullRequests() {
    const {notification} = this.props;
    if (!notification) return null;
    return this.renderList(
      notification.pullRequest.newComments,
      this.props.handleClickPullRequest
    );
  }

  render() {
    const {repository, fetching, notification} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
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
          </div>
          <div className="col-12">
            {this.renderError()}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>
              New Issues
              <span className="badge badge-pill badge-default ml-10">
                {notification ? notification.issue.newArrivals.length : 0}
              </span>
            </h2>
          </div>
          <div className="col-12">
            {this.renderNewIssues()}
          </div>
          <div className="col-12">
            <h2>
              Updated Issues
              <span className="badge badge-pill badge-default ml-10">
                {notification ? notification.issue.newComments.length : 0}
              </span>
            </h2>
          </div>
          <div className="col-12">
            {this.renderUpdatedIssues()}
          </div>
          <div className="col-12 mt-30 text-right">
            <Link
              className="btn btn-default"
              to={`/repositories/${repository.nameWithOwner}/issues`}
              >
              View All Issues
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2>
              New Pull Requests
              <span className="badge badge-pill badge-default ml-10">
                {notification ? notification.pullRequest.newArrivals.length : 0}
              </span>
            </h2>
          </div>
          <div className="col-12">
            {this.renderNewPullRequests()}
          </div>
          <div className="col-12">
            <h2>
              Updated Pull Requests
              <span className="badge badge-pill badge-default ml-10">
                {notification ? notification.pullRequest.newComments.length : 0}
              </span>
            </h2>
          </div>
          <div className="col-12">
            {this.renderUpdatedPullRequests()}
          </div>
          <div className="col-12 text-right mt-30">
            <Link
              className="btn btn-default"
              to={`/repositories/${repository.nameWithOwner}/pullRequests`}
              >
              View All Pull Requests
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
