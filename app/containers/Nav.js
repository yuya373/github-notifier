import {connect} from 'react-redux';
import Nav from './../components/Nav.js.jsx';

export default connect((state) => ({location: state.router.location}))(Nav);
