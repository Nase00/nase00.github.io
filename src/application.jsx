import React from 'react';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Body from './components/body';
import Home from './components/home/static';
import AdminContainer from './components/admin/container';
import GuestContainer from './components/guest/container';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

const Application = () => (
  <Provider store={store}>
    <HashRouter>
      <Body>
        <Route path='/' exact component={Home}/>
        <Route path='/admin' exact component={AdminContainer}/>
        <Route path='/guest' exact component={GuestContainer}/>
      </Body>
    </HashRouter>
  </Provider>
);

export default Application;
