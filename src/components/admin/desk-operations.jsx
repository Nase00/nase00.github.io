import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button } from 'react-toolbox';

const DeskOperations = (props) => {
  const { triggerEvents, deskHeightInputDisabled, toggleDeskHeightInput } = props;

  const deskHeightInputClasses = classnames('submit-command', {
    disabled: deskHeightInputDisabled
  });

  const triggerPcOn = triggerEvents([
    {
      type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashNano', body: {
        write: { command: 'displayTemp', duration: 2, animName: 'Fast Green Fade' }
      }
    },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'lamprey' }
  ]);

  const generateDeskFunc = (deskFuncKey, timeout) =>
    triggerEvents([
      {
        type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashNano', body: {
          write: { command: 'displayTemp', duration: 5, animName: 'Medium Blue Fade' }
        }
      },
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
      <div className='switches'>
        <Switch
          label='Desk Height Safety'
          className={!deskHeightInputDisabled ? 'switch-active' : 'switch-inactive'}
          checked={!deskHeightInputDisabled}
          onChange={toggleDeskHeightInput} />
      </div>
    </section>
  );
};

DeskOperations.propTypes = {
  deskHeightInputDisabled: PropTypes.bool.isRequired,
  toggleDeskHeightInput: PropTypes.func.isRequired,
  triggerEvents: PropTypes.func.isRequired
};

export default DeskOperations;
