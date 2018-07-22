import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';
import scrypt from 'scrypt-async';

import { HASH_INTERVAL_REFRESH, SCRYPT_SETTINGS } from 'constants';
import MainOperations from './main-operations';
import styles, { statusColors } from './styles';

class GuestController extends PureComponent {
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

  render() {
    const { location, hashedPassword, proxyResponseStatus, actions } = this.props;
    const { password, id, proxy } = queryString.parse(location.search);
    const triggerEvents = events => () =>
      actions.emitSendEvent({ password, hashedPassword, id, proxy, events });

    return (
      <Layout className='guest-container' style={statusColors[proxyResponseStatus]}>
        <Style rules={styles}/>
        <MainOperations
          triggerEvents={triggerEvents}
          toggleDeadboltInput={this.toggleDeadboltInput}
          {...this.props}/>
      </Layout>
    );
  }
}

GuestController.propTypes = {
  documentTitle: PropTypes.string.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      password: PropTypes.string
    })
  }),
  hashedPassword: PropTypes.string.isRequired,
  proxy: PropTypes.string,
  proxyResponseStatus: PropTypes.number
};

export default GuestController;
