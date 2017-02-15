import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Input, Switch, Button } from 'react-toolbox';
import { get } from 'lodash';

import { statusColors } from './styles';
import { HOME_THEATER_SPEAKERS, DESK_SPEAKERS } from 'constants';

const Operations = (props) => {
  const {
    actions,
    useHTSpeakers,
    deadboltInputDisabled,
    toggleDeadboltInput,
    toggleHTSpeakers,
    updatePasscode,
    proxyResponseStatus
  } = props;

  const passcode = get(props, 'location.query.passcode', props.passcode);
  const proxy = get(props, 'location.query.proxy');
  const target = useHTSpeakers ? HOME_THEATER_SPEAKERS : DESK_SPEAKERS;
  const speakerLabelMap = {
    [HOME_THEATER_SPEAKERS]: 'Home Theater Speakers',
    [DESK_SPEAKERS]: 'Desk Speakers'
  };

  const deadboltInputClasses = classnames('submit-command', {
    disabled: deadboltInputDisabled
  });

  const triggerEvents = (events) => () => actions.emitSendEvent(passcode, proxy, events);

  const triggerGateEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'buzz', body: { code: passcode } }
  ]);

  const triggerDeadboltEvents = () => {
    triggerEvents([
      { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
      { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'deadbolt', argument: passcode }
    ])();

    toggleDeadboltInput();
  };

  const triggerPcOn = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'lamprey' }
  ]);

  const triggerDRLightEvents = triggerEvents([
    { type: 'EMIT_SEND_HUE_COMMAND', id: 1, func: 'toggle' }
  ]);

  const triggerLRLightEvents = triggerEvents([
    { type: 'EMIT_SEND_HUE_COMMAND', id: 2, func: 'toggle' }
  ]);

  const triggerMuteEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashRed' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary', name: target, argument: 'mute' }
  ]);

  return (
    <section className='operations' style={statusColors[proxyResponseStatus]}>
      {props.location.query.passcode ? null : <Input
        className='operations-passcode-input'
        type='number'
        value={passcode}
        label='Required Field'
        hint='Enter code'
        onChange={updatePasscode}
        required/>}
      <Button className='submit-command' onClick={triggerGateEvents} raised>
        Gate
      </Button>
      <Button className={deadboltInputClasses} onClick={triggerDeadboltEvents} disabled={deadboltInputDisabled} raised>
        Deadbolt
      </Button>
      <Button className='submit-command' onClick={triggerPcOn} raised>
        PC On
      </Button>
      <Button className='submit-command' onClick={triggerDRLightEvents} raised>
        DR Lights Toggle
      </Button>
      <Button className='submit-command' onClick={triggerLRLightEvents} raised>
        LR Lights Toggle
      </Button>
      <Button className='submit-command' onClick={triggerMuteEvents} raised>
        Mute {speakerLabelMap[target]}
      </Button>
      <div className='switches'>
        <Switch
          label='Deadbolt Safety'
          className={!deadboltInputDisabled ? 'switch-active' : 'switch-inactive'}
          checked={!deadboltInputDisabled}
          onChange={toggleDeadboltInput}/>
        <Switch
          label='Home Theater Speaker Control'
          className={useHTSpeakers ? 'switch-active' : 'switch-inactive'}
          checked={useHTSpeakers}
          onChange={toggleHTSpeakers}/>
      </div>
    </section>
  );
};

Operations.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      passcode: PropTypes.string
    })
  }),
  actions: PropTypes.shape({
    emitSendEvent: PropTypes.func.isRequired,
    emitPasscodeUpdate: PropTypes.func.isRequired
  }),
  deadboltInputDisabled: PropTypes.bool.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  toggleDeadboltInput: PropTypes.func.isRequired,
  toggleHTSpeakers: PropTypes.func.isRequired,
  updatePasscode: PropTypes.func.isRequired,
  passcode: PropTypes.number,
  proxyResponseStatus: PropTypes.number
};

export default Operations;
