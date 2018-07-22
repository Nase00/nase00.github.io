import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Button } from 'react-toolbox';

import { HOME_THEATER_SPEAKERS, DESK_SPEAKERS, PLAYLIST_ONE, PLAYLIST_TWO } from 'constants';

const MusicOperations = props => {
  const { triggerEvents, useHTSpeakers, toggleHTSpeakers } = props;

  const target = useHTSpeakers ? HOME_THEATER_SPEAKERS : DESK_SPEAKERS;
  const speakerLabelMap = {
    [HOME_THEATER_SPEAKERS]: 'Home Theater Speakers',
    [DESK_SPEAKERS]: 'Desk Speakers'
  };

  const triggerSpeakersToDesk = triggerEvents([
    {
      type: 'EMIT_FORWARD_HTTP_REQUEST',
      key: 'flashGreen'
    },
    {
      type: 'EMIT_SEND_UNIFIED_COMMAND',
      name: 'triggerCommand',
      commandName: 'command4',
      id: 'Sean.CustomRun',
      delay: 100
    }
  ]);

  const triggerSpeakersToHT = triggerEvents([
    {
      type: 'EMIT_FORWARD_HTTP_REQUEST',
      key: 'flashGreen'
    },
    {
      type: 'EMIT_SEND_UNIFIED_COMMAND',
      name: 'triggerCommand',
      id: 'Sean.CustomRun',
      commandName: 'command5',
      delay: 100
    }
  ]);

  const triggerMuteEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashRed' },
    { type: 'EMIT_TRIGGER_PHOTON_FUNCTION', key: 'secretary', name: target, argument: 'mute' }
  ]);

  return (
    <section className='operations'>
      <Button className='submit-command' onClick={triggerSpeakersToDesk} raised>
        Use Desk Speakers
      </Button>
      <Button className='submit-command' onClick={triggerSpeakersToHT} raised>
        Use Home Theater Speakers
      </Button>
      <Button className='submit-command' onClick={triggerEvents(PLAYLIST_ONE)} raised>
        Trigger Playlist 1
      </Button>
      <Button className='submit-command' onClick={triggerEvents(PLAYLIST_TWO)} raised>
        Trigger Playlist 2
      </Button>
      <Button className='submit-command' onClick={triggerMuteEvents} raised>
        Mute {speakerLabelMap[target]}
      </Button>
      <div className='switches'>
        <Switch
          label='Home Theater Speaker Control'
          className={useHTSpeakers ? 'switch-active' : 'switch-inactive'}
          checked={useHTSpeakers}
          onChange={toggleHTSpeakers}/>
      </div>
    </section>
  );
};

MusicOperations.propTypes = {
  triggerEvents: PropTypes.func.isRequired,
  useHTSpeakers: PropTypes.bool.isRequired,
  toggleHTSpeakers: PropTypes.func.isRequired
};

export default MusicOperations;
