import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuestController from './controller';

import * as GuestActions from '../../ducks/guest';

const GuestContainer = (props) => (
  <GuestController {...props}/>
);

GuestContainer.propTypes = {
  admin: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = ({ guestReducer }) => ({
  documentTitle: guestReducer.documentTitle,
  passcode: guestReducer.passcode,
  spotifyURI: guestReducer.spotifyURI
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(GuestActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestContainer);
