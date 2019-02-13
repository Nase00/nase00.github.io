import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';
import cookies from 'js-cookie';

import { COOKIE_NAME } from 'constants';
import MainOperations from './main-operations';
import styles, { statusColors } from './styles';

class GuestController extends PureComponent {
  componentWillMount() {
    document.title = this.props.documentTitle;

    this.updateSavedValues();
  }

  getSavedValues() {
    return JSON.parse(cookies.get(COOKIE_NAME));
  }

  updateSavedValues() {
    const { id, password, proxy } = queryString.parse(location.search);

    if (id && password && proxy) {
      cookies.set(
        COOKIE_NAME,
        JSON.stringify({
          id,
          password,
          proxy
        })
      );
    }
  }

  render() {
    const { proxyResponseStatus, actions } = this.props;
    const { id, password, proxy } = this.getSavedValues();
    const triggerEvents = (events) => () =>
      actions.emitSendEvent({
        id,
        password,
        proxy,
        events
      });

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
