/* globals document */
import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';

import history from './config/history';
import store from './store';

import Body from './components/body';
import Home from './components/home/static';
import AdminContainer from './components/admin/container';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

System.import('react-tap-event-plugin').then((injectTapEventPlugin) => {
  try { // Unideal workaround to prevent invariant warnings from hot-reloading plugin
    injectTapEventPlugin();
  } catch (e) {} // eslint-disable-line
});

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
