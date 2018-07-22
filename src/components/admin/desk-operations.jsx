import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button } from 'react-toolbox';

import { HOME_THEATER_SPEAKERS, DESK_SPEAKERS } from 'constants';

const DeskOperations = (props) => {
  const {
    triggerEvents,
    useHTSpeakers,
    deskHeightInputDisabled,
    toggleDeskHeightInput,
    toggleHTSpeakers
  } = props;

  const target = useHTSpeakers ? HOME_THEATER_SPEAKERS : DESK_SPEAKERS;
  const speakerLabelMap = {
    [HOME_THEATER_SPEAKERS]: 'Home Theater Speakers',
    [DESK_SPEAKERS]: 'Desk Speakers'
  };

  const deskHeightInputClasses = classnames('submit-command', {
    disabled: deskHeightInputDisabled
  });

  const triggerPcOn = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'lamprey' }
  ]);

  const triggerMuteEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashRed' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary', name: target, argument: 'mute' }
  ]);

  const generateDeskFunc = (deskFuncKey, timeout) => triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashBlue' },
    {
      type: 'EMIT_FORWARD_HTTP_REQUEST',
      key: deskFuncKey,
      additionalHeaders: { timeout }
    }
  ]);

  const triggerDeskPresetTwo = generateDeskFunc('deskPreset', '10000');
  const triggerDeskRaise = generateDeskFunc('deskRaise', '500');
  const triggerDeskLower = generateDeskFunc('deskLower', '500');

  return (
    <section className='operations'>
      <Button className='submit-command' onClick={triggerPcOn} raised>
        PC On
      </Button>
      <Button
        className={deskHeightInputClasses}
        onClick={triggerDeskPresetTwo}
        disabled={deskHeightInputDisabled}
        raised>
          Desk Height Preset #2
      </Button>
      <Button
        className={deskHeightInputClasses}
        onClick={triggerDeskRaise}
        disabled={deskHeightInputDisabled}
        raised>
         Desk Height Raise (500ms)
      </Button>
      <Button
        className={deskHeightInputClasses}
        onClick={triggerDeskLower}
        disabled={deskHeightInputDisabled}
        raised>
          Desk Height Lower (500ms)
      </Button>
      <Button className='submit-command' onClick={triggerMuteEvents} raised>
        Mute {speakerLabelMap[target]}
      </Button>
      <div className='switches'>
        <Switch
          label='Desk Height Safety'
          className={!deskHeightInputDisabled ? 'switch-active' : 'switch-inactive'}
          checked={!deskHeightInputDisabled}
          onChange={toggleDeskHeightInput}/>
        <Switch
          label='Home Theater Speaker Control'
          className={useHTSpeakers ? 'switch-active' : 'switch-inactive'}
          checked={useHTSpeakers}
          onChange={toggleHTSpeakers}/>
      </div>
    </section>
  );
};

DeskOperations.propTypes = {
  password: PropTypes.string.isRequired,
  deskHeightInputDisabled: PropTypes.bool.isRequired,
  toggleDeskHeightInput: PropTypes.func.isRequired,
  triggerEvents: PropTypes.func.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  toggleHTSpeakers: PropTypes.func.isRequired
};

export default DeskOperations;
