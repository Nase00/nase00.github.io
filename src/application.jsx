/* globals document */
import React from 'react';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from './config/history';
import store from './store';

import Body from './components/body';
import Home from './components/home/static';
import AdminContainer from './components/admin/container';
import GuestContainer from './components/guest/container';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

System.import('react-tap-event-plugin').then(injectTapEventPlugin => {
  try {
    // Unideal workaround to prevent invariant warnings from hot-reloading plugin
    injectTapEventPlugin();
  } catch (e) {} // eslint-disable-line
});

const Application = () => (
  <Provider store={store}>
    <HashRouter history={history}>
      <Body>
        <Route path='/' exact component={Home}/>
        <Route path='/admin' exact component={AdminContainer}/>
        <Route path='/guest' exact component={GuestContainer}/>
      </Body>
    </HashRouter>
  </Provider>
);

export default Application;
