import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Button } from 'react-toolbox';

import SpotifyURIInput from './spotify-uri-input';
import theme from './theme.scss';

const MainOperations = (props) => {
  const {
    actions,
    passcode,
    spotifyURI,
    triggerEvents
  } = props;

  const triggerGateEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'buzz', body: { code: passcode } },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerPlay',
      uris: [spotifyURI],
      device_id: '355beabb5645106941fcdff91fb48e2ad827050e',
      conditions: { locked: false, ajar: true }
    },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerPlay',
      context_uri: 'spotify:user:nasezero:playlist:4KSxM9RXXLrDJxgb9zxAlo',
      conditions: { locked: false, ajar: true },
      delay: 60000
    }
  ]);

  const helpLink = (
    <a
      target='_blank'
      href='https://support.spotify.com/us/using_spotify/share_music/sharing-music/'>
        here
    </a>
  );

  return (
    <section className='operations'>
      <table className='operations-table'>
        <td><tr><Avatar icon='queue_music'/></tr></td>
        <td><tr><SpotifyURIInput value={spotifyURI} {...props}/></tr></td>
      </table>
      <table className='operations-table'>
        <td><tr><Avatar icon='fingerprint'/></tr></td>
        <td><tr>
        <Input
          theme={theme}
          className='operations-input'
          type='text'
          value={passcode}
          label='Enter Passcode'
          hint='Only cool people have this'
          onChange={actions.emitPasscodeUpdate}
          required/>
        </tr></td>
      </table>
      <Button className='submit-command' onClick={triggerGateEvents} raised>
        Open Gate
      </Button>
      <p className='operations-help'>
        Click {helpLink} for help on finding Spotify URIs
      </p>
    </section>
  );
};

MainOperations.propTypes = {
  actions: PropTypes.shape({
    emitPasscodeUpdate: PropTypes.func.isRequired
  }),
  passcode: PropTypes.string.isRequired,
  spotifyURI: PropTypes.string.isRequired,
  triggerEvents: PropTypes.func.isRequired
};

export default MainOperations;
