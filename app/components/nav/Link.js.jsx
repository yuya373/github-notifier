import React from 'react';
import {Link} from 'react-router-dom';

export default function ({
  location, to, children
}) {
  const className = `nav-group-item ${location.pathname === to ? "active" : ""}`;

  return (
    <Link
      to={to}
      className={className}
      >
      {children}
    </Link>
  )
}
