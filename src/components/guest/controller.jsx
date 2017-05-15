import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'react-toolbox';
import { Style } from 'radium';
import { get } from 'lodash';

import MainOperations from './main-operations';

import styles, { statusColors } from './styles';

class GuestController extends PureComponent {
  componentWillMount() {
    document.title = this.props.documentTitle;
  }

  render() {
    const { location, proxyResponseStatus, actions } = this.props;
    const passcode = get(location, 'query.passcode', this.props.passcode);
    const proxy = get(location, 'query.proxy');
    const triggerEvents = (events) => () => actions.emitSendEvent(passcode, proxy, events);

    return (
      <Layout className='guest-container' style={statusColors[proxyResponseStatus]}>
        <Style rules={styles}/>
        <MainOperations
          triggerEvents={triggerEvents}
          toggleDeadboltInput={this.toggleDeadboltInput}
          {...this.props}
          passcode={passcode}/>
      </Layout>
    );
  }
}

GuestController.propTypes = {
  documentTitle: PropTypes.string.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      passcode: PropTypes.string
    })
  }),
  passcode: PropTypes.string.isRequired,
  proxy: PropTypes.string,
  proxyResponseStatus: PropTypes.number
};

export default GuestController;
