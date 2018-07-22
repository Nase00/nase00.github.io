import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'react-toolbox';
import { Style } from 'radium';
import queryString from 'query-string';

import MainOperations from './main-operations';

import styles, { statusColors } from './styles';

class GuestController extends PureComponent {
  componentWillMount() {
    document.title = this.props.documentTitle;
  }

  render() {
    const { location, proxyResponseStatus, actions } = this.props;
    const { password, proxy } = queryString.parse(location.search);
    const triggerEvents = events => () => actions.emitSendEvent({ password, proxy, events });

    return (
      <Layout className='guest-container' style={statusColors[proxyResponseStatus]}>
        <Style rules={styles}/>
        <MainOperations
          triggerEvents={triggerEvents}
          toggleDeadboltInput={this.toggleDeadboltInput}
          {...this.props}
          password={password}/>
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
  password: PropTypes.string.isRequired,
  proxy: PropTypes.string,
  proxyResponseStatus: PropTypes.number
};

export default GuestController;
