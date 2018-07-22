import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AdminController from './controller';

import * as AdminActions from '../../ducks/admin';

const mapStateToProps = ({ adminReducer }) => ({
  documentTitle: adminReducer.documentTitle,
  tabsIndex: adminReducer.tabsIndex,
  useHTSpeakers: adminReducer.useHTSpeakers,
  deadboltInputDisabled: adminReducer.deadboltInputDisabled,
  deskHeightInputDisabled: adminReducer.deskHeightInputDisabled,
  hashedPassword: adminReducer.hashedPassword,
  proxyResponseStatus: adminReducer.proxyResponseStatus
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AdminActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminController);
