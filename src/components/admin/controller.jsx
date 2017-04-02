import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, Layout, Input } from 'react-toolbox';
import { Style } from 'radium';
import { get } from 'lodash';

import MainOperations from './main-operations';
import DeskOperations from './desk-operations';

import styles, { statusColors } from './styles';
import theme from './theme.scss';

class AdminController extends Component {
  constructor(props) {
    super(props);

    this.toggleHTSpeakers = this.toggleHTSpeakers.bind(this);
    this.toggleDeadboltInput = this.toggleDeadboltInput.bind(this);
    this.toggleDeskHeightInput = this.toggleDeskHeightInput.bind(this);
  }

  componentWillMount() {
    document.title = this.props.documentTitle;
  }

  toggleHTSpeakers() {
    return this.props.actions.emitHTSpeakersToggle(!this.props.useHTSpeakers);
  }

  toggleDeadboltInput() {
    return this.props.actions.emitToggleDeadboltInput(!this.props.deadboltInputDisabled);
  }

  toggleDeskHeightInput() {
    return this.props.actions.emitToggleDeskHeightInput(!this.props.deskHeightInputDisabled);
  }

  render() {
    const { location, tabsIndex, proxyResponseStatus, actions } = this.props;
    const passcode = get(location, 'query.passcode', this.props.passcode);
    const proxy = get(location, 'query.proxy');
    const triggerEvents = (events) => () => actions.emitSendEvent(passcode, proxy, events);

    return (
      <Layout className='admin-container' style={statusColors[proxyResponseStatus]}>
        <Style rules={styles}/>
        {location.query.passcode ? null : <Input
          className='operations-passcode-input'
          type='text'
          value={passcode}
          label='Required Field'
          hint='Enter code'
          onChange={actions.emitPasscodeUpdate}
          required/>}
        <Tabs
          index={tabsIndex}
          onChange={actions.emitHandleTabChange}
          className='tabs'
          theme={theme}>
            <Tab label='Main' className='tab'>
              <MainOperations
                triggerEvents={triggerEvents}
                toggleDeadboltInput={this.toggleDeadboltInput}
                {...this.props}
                passcode={passcode}/>
            </Tab>
            <Tab label='Desk' className='tab'>
              <DeskOperations
                triggerEvents={triggerEvents}
                toggleHTSpeakers={this.toggleHTSpeakers}
                toggleDeskHeightInput={this.toggleDeskHeightInput}
                {...this.props}/>
            </Tab>
        </Tabs>
      </Layout>
    );
  }
}

AdminController.propTypes = {
  documentTitle: PropTypes.string.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      passcode: PropTypes.string
    })
  }),
  passcode: PropTypes.string.isRequired,
  proxy: PropTypes.string,
  tabsIndex: PropTypes.number.isRequired,
  deadboltInputDisabled: PropTypes.bool.isRequired,
  deskHeightInputDisabled: PropTypes.bool.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  proxyResponseStatus: PropTypes.number,
  actions: PropTypes.shape({
    emitHandleTabChange: PropTypes.func.isRequired,
    emitPasscodeUpdate: PropTypes.func.isRequired,
    emitHTSpeakersToggle: PropTypes.func.isRequired,
    emitToggleDeadboltInput: PropTypes.func.isRequired,
    emitToggleDeskHeightInput: PropTypes.func.isRequired
  })
};

export default AdminController;
