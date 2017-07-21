import React, {Component} from 'react';
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
    this.state = {
      displayAllIssues: false,
      displayAllPullRequests: false,
    };
  }

  handleClickReload(e) {
    e.preventDefault();

    const {repository, fetching} = this.props;
    if (fetching) return;

    const {login} = repository.owner;

    this.props.clickReload(login, repository.name);
  }

  hideIssues(e) {
    e.preventDefault();
    this.setState({displayAllIssues: false});
  }

  displayAllIssues(e) {
    e.preventDefault();
    this.setState({displayAllIssues: true});
  }

  hidePullRequests(e) {
    e.preventDefault();
    this.setState({displayAllPullRequests: false});
  }

  displayAllPullRequests(e) {
    e.preventDefault();
    this.setState({displayAllPullRequests: true});
  }

  renderList(items, type = 'issue') {
    const {displayAllPullRequests, displayAllIssues} = this.state;
    const displayAll = type === 'issue' ? displayAllIssues : displayAllPullRequests;
    const {repository} = this.props;
    items = displayAll ? sortItems(items).reverse() : takeLatest(items);

    return (
      <ul className="list-group">
        {
          items.map((e) => (
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

  renderIssueToggle() {
    const {repository} = this.props;

    if (!repository.issues.nodes) return null;
    if (repository.issues.nodes.length < TOGGLE_THRESHOLD) return null;

    const {displayAllIssues} = this.state;

    const label = displayAllIssues ? "Hide Issues" : "Display All Issues";
    const onClick = displayAllIssues ?
          (e) => this.hideIssues(e) : (e) => this.displayAllIssues(e);

    return (
      <p className="text-right">
        <a
          href=""
          onClick={onClick}
          >
          {label}
        </a>
      </p>
    );
  }

  renderPullRequestToggle() {
    const {repository} = this.props;
    if (!repository.pullRequests.nodes) return null;
    if (repository.pullRequests.nodes.length < TOGGLE_THRESHOLD) return null;

    const {displayAllPullRequests} = this.state;
    const label = displayAllPullRequests ?
          "Hide Pull Requests" :  "Display All Pull Requests";
    const onClick = displayAllPullRequests ?
          (e) => this.hidePullRequests(e) :
          (e) => this.displayAllPullRequests(e);

    return (
      <p className="text-right">
        <a
          href=""
          onClick={onClick}
          >
          {label}
        </a>
      </p>
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
          {this.renderIssueToggle()}
        </div>

        <div>
          <h2>
            Pull Requests
            <span className="badge badge-pill badge-default ml-10">
              {repository.pullRequests.totalCount}
            </span>
          </h2>
          {this.renderList(repository.pullRequests.nodes, "pullRequest")}
          {this.renderPullRequestToggle()}
        </div>
      </div>
    );
  }
}
