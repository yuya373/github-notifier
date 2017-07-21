import {connect} from 'react-redux';
import Nav from './../components/Nav.js.jsx';

export default connect((state) => ({
  location: state.router.location,
  repositories: state.repositories.ids.
    map((e) => state.repositories.values.find((f) => f.nameWithOwner === e)),
}))(Nav);
