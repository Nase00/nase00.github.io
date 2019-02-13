import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';
import cookies from 'js-cookie';
import { forEach } from 'lodash';

import { COOKIE_NAME } from 'constants';
import MainOperations from './main-operations';
import DeskOperations from './desk-operations';
import MusicOperations from './music-operations';
import AuthOperations from './auth-operations';
import styles, { statusColors } from './styles';
import theme from './theme.scss';

class AdminController extends PureComponent {
  componentWillMount() {
    document.querySelector('link[rel=manifest]').href = '/manifest-admin.json';
    document.title = this.props.documentTitle;

    this.updateSavedValues();
  }

  getSavedValues() {
    const cookie = cookies.get(COOKIE_NAME);

    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error(e); // eslint-disable-line
        cookies.remove(COOKIE_NAME);
      }
    }

    return {};
  }

  updateSavedValues() {
    const { location } = this.props;
    const { actions, id, password, proxy } = queryString.parse(location.search);

    if (id && password && proxy) {
      cookies.set(
        COOKIE_NAME,
        JSON.stringify({
          id,
          password,
          proxy
        })
      );

      forEach((value, key) => {
        actions.emitInputUpdate(key, value);
      });
    }
  }

  toggleHTSpeakers = () => this.props.actions.emitHTSpeakersToggle(!this.props.useHTSpeakers);

  toggleDeadboltInput = () =>
    this.props.actions.emitToggleDeadboltInput(!this.props.deadboltInputDisabled);

  toggleDeskHeightInput = () =>
    this.props.actions.emitToggleDeskHeightInput(!this.props.deskHeightInputDisabled);

  render() {
    const { tabsIndex, proxyResponseStatus, actions } = this.props;
    const { id, password, proxy } = this.getSavedValues();
    const triggerEvents = (events) => () =>
      actions.emitSendEvent({
        id,
        password,
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
              id={id}
              triggerEvents={triggerEvents}
              toggleDeadboltInput={this.toggleDeadboltInput}/>
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
          <Tab label='Auth' className='tab'>
            <AuthOperations {...this.props}/>
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
    emitHTSpeakersToggle: PropTypes.func.isRequired,
    emitToggleDeadboltInput: PropTypes.func.isRequired,
    emitToggleDeskHeightInput: PropTypes.func.isRequired
  })
};

export default AdminController;
