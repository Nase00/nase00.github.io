import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuestController from './controller';

import * as GuestActions from '../../ducks/guest';

const mapStateToProps = ({ guestReducer }) => ({
  documentTitle: guestReducer.documentTitle,
  password: guestReducer.password,
  spotifyURI: guestReducer.spotifyURI,
  rgb: guestReducer.rgb
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(GuestActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestController);
