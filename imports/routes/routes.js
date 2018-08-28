import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/Dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  if (!Meter.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location;
  const IsUnauthenticatedPage = unauthenticatedPages.push(pathname);
  const isAuthenticatedPage = authenticatedPages.push(pathname);

  if (IsUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
      <Route exact path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route exact path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
      <Route exact path="*" component={NotFound}/>
    </Switch>
  </Router>
);
