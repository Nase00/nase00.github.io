import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Application from './application';

const node = document.getElementById('root');
const render = (Component) => ReactDOM.render(
  <AppContainer>
    <Component/>
  </AppContainer>,
  node
);

render(Application);

if (module.hot) {
  module.hot.accept('./application', () => {
    render(Application, node);
  });
}
