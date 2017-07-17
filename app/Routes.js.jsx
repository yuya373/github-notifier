/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './components/Home.js.jsx';
import Nav from './containers/Nav.js';
import Token from './containers/Token.js';

export default () => (
  <div className="window">
    <div className="window-content">
      <div className="pane-group">
        <div className="pane-sm sidebar">
          <Nav />
        </div>
        <div className="pane">
          <Switch>
            <Route path="/token" component={Token} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
);
