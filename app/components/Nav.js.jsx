import React from 'react';
import Link from './nav/Link.js.jsx';
import Icon from './Icon.js.jsx';

export default function Nav({location}) {
  return (
    <nav className="nav-group">
      <h5 className="nav-group-title">Config</h5>
      <Link to="/" location={location} >
        <span className="icon icon-home" /> Home
      </Link>
      <Link to="/token" location={location} >
        <Icon name="icon-key" />
        Token
      </Link>
    </nav>
  );
}
