// This is the React insertion point for the app
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import App from './components/App';
import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';

// Routes
const routes = (
  <Router history={createHistory()}>
    <Route path="/">
      <IndexRoute component={App} />
      <Route path=":tag" component={App} />
      <Route path=":tag/leaderboard" component={Leaderboard} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

// Binding to DOM
ReactDOM.render(routes, document.getElementById('main'));
