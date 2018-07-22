import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuestController from './controller';

import * as GuestActions from '../../ducks/guest';
import * as AdminActions from '../../ducks/admin';

const mapStateToProps = ({ guestReducer, adminReducer }) => ({
  documentTitle: guestReducer.documentTitle,
  spotifyURI: guestReducer.spotifyURI,
  rgb: guestReducer.rgb,
  hashedPassword: adminReducer.hashedPassword
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AdminActions,
      ...GuestActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestController);
