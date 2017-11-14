import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import store from './store/configureStore';

import Layout from './components/Layout';
import { UserList } from './containers/Users';
import { Login } from './containers/Auth';
import NotFoundPage from './containers/NotFoundPage';
import '../sass/main.scss';

function NotAuthRequired(nextState, replace) {
  const token = sessionStorage.getItem('token');

  if (token) {
    replace('/users');
  }
}

function AuthRequired(nextState, replace) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    replace('/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="login" component={Login} onEnter={NotAuthRequired} />
      <Route path="/" component={Layout} onEnter={AuthRequired}>
        <IndexRoute component={UserList} />
        <Route path="users" component={UserList} />
      </Route>
      <Redirect from="/" to="users" />
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>, document.getElementById('app'));
