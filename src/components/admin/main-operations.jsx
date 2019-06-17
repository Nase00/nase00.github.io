import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button } from 'react-toolbox';

const MainOperations = (props) => {
  const { id, hashedPassword, triggerEvents, deadboltInputDisabled, toggleDeadboltInput } = props;

  const deadboltInputClasses = classnames('submit-command', {
    disabled: deadboltInputDisabled
  });

  const triggerGateEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'buzz', body: { code: hashedPassword } }
  ]);

  const triggerDeadboltEvents = () => {
    triggerEvents([
      { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
      { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'deadbolt' }
    ])();

    toggleDeadboltInput();
  };

  const triggerKILightEvents = triggerEvents([
    { type: 'EMIT_SEND_HUE_COMMAND', id: 1, func: 'toggle' }
  ]);

  const triggerDRLightEvents = triggerEvents([
    { type: 'EMIT_SEND_HUE_COMMAND', id: 4, func: 'toggle' }
  ]);

  const triggerLRLightEvents = triggerEvents([
    { type: 'EMIT_SEND_HUE_COMMAND', id: 3, func: 'toggle' },
    { type: 'EMIT_SEND_HUE_COMMAND', id: 2, func: 'toggle' }
  ]);

  return (
    <section className='operations'>
      <Button className='submit-command' onClick={triggerGateEvents} raised>
        Gate
      </Button>
      <Button
        className={deadboltInputClasses}
        onClick={triggerDeadboltEvents}
        disabled={deadboltInputDisabled}
        raised>
        Deadbolt
      </Button>
      <Button className='submit-command' onClick={triggerDRLightEvents} raised>
        DR Lights Toggle
      </Button>
      <Button className='submit-command' onClick={triggerLRLightEvents} raised>
        LR Lights Toggle
      </Button>
      <Button className='submit-command' onClick={triggerKILightEvents} raised>
        KI Lights Toggle
      </Button>
      <div className='switches'>
        <Switch
          label='Deadbolt Safety'
          className={!deadboltInputDisabled ? 'switch-active' : 'switch-inactive'}
          checked={!deadboltInputDisabled}
          onChange={toggleDeadboltInput}/>
      </div>
    </section>
  );
};

MainOperations.propTypes = {
  id: PropTypes.string,
  hashedPassword: PropTypes.string.isRequired,
  triggerEvents: PropTypes.func.isRequired,
  deadboltInputDisabled: PropTypes.bool.isRequired,
  toggleDeadboltInput: PropTypes.func.isRequired
};

export default MainOperations;
