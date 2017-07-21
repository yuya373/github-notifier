import {connect} from 'react-redux';
import Issue from './../components/Issue.js.jsx';

const findIssueOrPullRequest =
      ({repositories}, {name, owner, number}) => {
        const repo = repositories.values.
              find((e) => e.name === name && e.owner.login === owner);
        const n = Number.parseInt(number, 10);

        return repo.issues.nodes.find((e) => e.number === n) ||
          repo.pullRequests.nodes.find((e) => e.number === n);
      };

export default connect(
  (state, props) => ({
    ...findIssueOrPullRequest(state, props.match.params),
  })
)(Issue);
