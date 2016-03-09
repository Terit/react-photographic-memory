// This is the React insertion point for the app

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { createHistory } from 'history';

import App from './components/App';
import NotFound from './components/NotFound';

// Routes
var routes = (
  <Router history={createHistory()}>
    <Route path='/' component={App} />
    <Route path='/:tag' component={App} />
    <Route path='*' component={NotFound} />
  </Router>
)

// Binding to DOM
ReactDOM.render(routes, document.getElementById('main'));
