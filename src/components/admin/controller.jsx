import React, { Component, PropTypes } from 'react';
import { Layout, Panel } from 'react-toolbox';
import { Style } from 'radium';

import Operations from './operations';

import styles from './styles';

class AdminController extends Component {
  componentWillMount() {
    document.title = this.props.documentTitle;
  }

  render() {
    const { useHTSpeakers, deadboltInputDisabled, actions } = this.props;
    const {
      emitPasscodeUpdate,
      emitHTSpeakersToggle,
      emitToggleDeadboltInput,
    } = actions;
    const updatePasscode = (passcode) => emitPasscodeUpdate(parseInt(passcode, 10) || 0);
    const toggleHTSpeakers = () => emitHTSpeakersToggle(!useHTSpeakers);
    const toggleDeadboltInput = () => emitToggleDeadboltInput(!deadboltInputDisabled);

    return (
      <Layout className='admin-container'>
        <Panel>
          <Style rules={styles}/>
          <Operations
            updatePasscode={updatePasscode}
            toggleHTSpeakers={toggleHTSpeakers}
            toggleDeadboltInput={toggleDeadboltInput}
            {...this.props}/>
        </Panel>
      </Layout>
    );
  }
}

AdminController.propTypes = {
  documentTitle: PropTypes.string.isRequired,
  deadboltInputDisabled: PropTypes.bool.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitPasscodeUpdate: PropTypes.func.isRequired
  })
};

export default AdminController;
