import React from 'react';

export default function Header({children}) {
  return (
    <header className="toolbar toolbar-header">
      <h1 className="title">
        {children}
      </h1>
    </header>
  );
}
