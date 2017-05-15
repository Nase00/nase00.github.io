import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AdminController from './controller';

import * as AdminActions from '../../ducks/admin';

const AdminContainer = (props) => (
  <AdminController {...props}/>
);

AdminContainer.propTypes = {
  admin: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = ({ adminReducer }) => ({
  documentTitle: adminReducer.documentTitle,
  tabsIndex: adminReducer.tabsIndex,
  useHTSpeakers: adminReducer.useHTSpeakers,
  deadboltInputDisabled: adminReducer.deadboltInputDisabled,
  deskHeightInputDisabled: adminReducer.deskHeightInputDisabled,
  passcode: adminReducer.passcode,
  proxyResponseStatus: adminReducer.proxyResponseStatus
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AdminActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
