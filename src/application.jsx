/* globals document */
import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import history from './config/history';
import store from './store';

import Body from './components/body';
import Home from './components/home/static';
import AdminContainer from './components/admin/container';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

injectTapEventPlugin();

const Application = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Body}>
        <IndexRoute component={Home}/>
        <Route path='admin' component={AdminContainer}/>
      </Route>
    </Router>
  </Provider>
);

export default Application;
