import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
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
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
      <Route exact path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route exact path="/links" component={Link} onEnter={onEnterPrivatePage}/>
      <Route exact path="*" component={NotFound}/>
    </Switch>
  </Router>
);
