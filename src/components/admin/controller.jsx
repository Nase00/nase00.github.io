import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';
import scrypt from 'scrypt-async';

import { HASH_INTERVAL_REFRESH, SCRYPT_SETTINGS } from 'constants';
import MainOperations from './main-operations';
import DeskOperations from './desk-operations';
import MusicOperations from './music-operations';
import styles, { statusColors } from './styles';
import theme from './theme.scss';

class AdminController extends PureComponent {
  componentWillMount() {
    document.title = this.props.documentTitle;

    this.generateHash();
    setInterval(this.generateHash(), HASH_INTERVAL_REFRESH);
  }

  generateHash() {
    const { actions, location } = this.props;
    const { password = '', id } = queryString.parse(location.search);

    scrypt(password, id, SCRYPT_SETTINGS, hashedPassword => {
      actions.emithashedPasswordUpdate(hashedPassword);
    });
  }

  toggleHTSpeakers = () => this.props.actions.emitHTSpeakersToggle(!this.props.useHTSpeakers);

  toggleDeadboltInput = () =>
    this.props.actions.emitToggleDeadboltInput(!this.props.deadboltInputDisabled);

  toggleDeskHeightInput = () =>
    this.props.actions.emitToggleDeskHeightInput(!this.props.deskHeightInputDisabled);

  render() {
    const { location, tabsIndex, hashedPassword, proxyResponseStatus, actions } = this.props;
    const { id, proxy } = queryString.parse(location.search);
    const triggerEvents = events => () =>
      actions.emitSendEvent({
        id,
        hashedPassword,
        proxy,
        events
      });

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
              {...this.props}
              triggerEvents={triggerEvents}
              toggleDeadboltInput={this.toggleDeadboltInput}
              {...this.props}/>
          </Tab>
          <Tab label='Desk' className='tab'>
            <DeskOperations
              {...this.props}
              triggerEvents={triggerEvents}
              toggleDeskHeightInput={this.toggleDeskHeightInput}/>
          </Tab>
          <Tab label='Music' className='tab'>
            <MusicOperations
              {...this.props}
              triggerEvents={triggerEvents}
              toggleHTSpeakers={this.toggleHTSpeakers}/>
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
      password: PropTypes.string
    })
  }),
  hashedPassword: PropTypes.string.isRequired,
  proxy: PropTypes.string,
  tabsIndex: PropTypes.number.isRequired,
  deadboltInputDisabled: PropTypes.bool.isRequired,
  deskHeightInputDisabled: PropTypes.bool.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  proxyResponseStatus: PropTypes.number,
  actions: PropTypes.shape({
    emitHandleTabChange: PropTypes.func.isRequired,
    emitPasswordUpdate: PropTypes.func.isRequired,
    emitHTSpeakersToggle: PropTypes.func.isRequired,
    emitToggleDeadboltInput: PropTypes.func.isRequired,
    emitToggleDeskHeightInput: PropTypes.func.isRequired
  })
};

export default AdminController;
