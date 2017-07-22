import React from 'react';

import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
import UploadDownloadMonitor from 'redux-devtools-upload-download-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import Dispatcher from 'redux-devtools-dispatch';

import * as HomeActions from '../ducks/home';

const actions = {
  ...HomeActions
};

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    fluid={false}
    defaultSize={170}
    defaultPosition='bottom'
    toggleVisibilityKey='ctrl-q'
    changePositionKey='ctrl-w'
    changeMonitorKey='ctrl-e'>
    <UploadDownloadMonitor>
      <SliderMonitor keyboardEnabled/>
    </UploadDownloadMonitor>
    <LogMonitor theme='tomorrow'/>
    <Dispatcher keyboardEnabled actionCreators={actions}/>
  </DockMonitor>
);

export default DevTools;
