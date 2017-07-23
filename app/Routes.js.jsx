/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './components/Home.js.jsx';
import Nav from './containers/Nav.js';
import Token from './containers/Token.js';
import AddRepository from './containers/AddRepository.js';
import Repository from './containers/Repository.js';
import Issue from './containers/Issue.js';
import PullRequests from './containers/PullRequests.js';
import Issues from './containers/Issues.js';
import Timers from './containers/Timers.js';

const Routes = () => (
  <div className="window">
    <div className="window-content">
      <div className="pane-group">
        <div className="pane-sm sidebar">
          <Nav />
        </div>
        <div className="pane">
          <Switch>
            <Route
              path="/repositories/:owner/:name/issues"
              component={Issues}
              />
            <Route
              path="/repositories/:owner/:name/pullRequests"
              component={PullRequests}
              />
            <Route
              path="/repositories/:owner/:name/:number"
              component={Issue}
              />
            <Route
              path="/repositories/:owner/:name"
              component={Repository}
              />
            <Route
              path="/addRepository"
              component={AddRepository}
              />
            <Route
              path="/token"
              component={Token}
              />
            <Route
              path="/timers"
              component={Timers}
              />
            <Route
              path="/"
              component={Home}
              />
          </Switch>
        </div>
      </div>
    </div>
  </div>
);

export default Routes;
