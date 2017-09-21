import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';

import MainOperations from './main-operations';
import DeskOperations from './desk-operations';

import styles, { statusColors } from './styles';
import theme from './theme.scss';

class AdminController extends PureComponent {
  componentWillMount() {
    document.title = this.props.documentTitle;
  }

  toggleHTSpeakers = () =>
    this.props.actions.emitHTSpeakersToggle(!this.props.useHTSpeakers);

  toggleDeadboltInput = () =>
    this.props.actions.emitToggleDeadboltInput(!this.props.deadboltInputDisabled);

  toggleDeskHeightInput = () =>
    this.props.actions.emitToggleDeskHeightInput(!this.props.deskHeightInputDisabled);

  render() {
    const { location, tabsIndex, proxyResponseStatus, actions } = this.props;
    const { passcode, proxy } = queryString.parse(location.search);
    const triggerEvents = events => () => actions.emitSendEvent(passcode, proxy, events);

    return (
      <Layout className='admin-container' style={statusColors[proxyResponseStatus]}>
        <Style rules={styles}/>
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
