import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Button } from 'react-toolbox';
import { HuePicker } from 'react-color';

import { genRGB } from '../../utils';
import SpotifyURIInput from './spotify-uri-input';
import styles from './styles';
import theme from './theme.scss';

const MainOperations = props => {
  const { actions, passcode, spotifyURI, rgb, triggerEvents } = props;
  const color = genRGB(...Object.values(rgb));

  const spotifyParams = {
    device_id: '355beabb5645106941fcdff91fb48e2ad827050e',
    conditions: { locked: false, ajar: true }
  };

  const beginDelay = 10000;
  const resetDelay = 110000;

  const triggerGateEvents = triggerEvents([
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen', delay: beginDelay },
    { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'buzz', body: { code: passcode }, delay: beginDelay },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerPlay',
      uris: [spotifyURI],
      delay: beginDelay,
      ...spotifyParams
    },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerShuffle',
      state: true,
      delay: beginDelay,
      ...spotifyParams
    },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerVolume',
      volumePercent: 100,
      delay: beginDelay,
      ...spotifyParams
    },
    {
      type: 'EMIT_SEND_HUE_COMMAND',
      func: 'rgb',
      arg: Object.values(rgb),
      id: 3,
      conditions: { locked: false, ajar: true },
      delay: beginDelay
    },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerPlay',
      context_uri: 'spotify:user:nasezero:playlist:4KSxM9RXXLrDJxgb9zxAlo',
      delay: resetDelay,
      ...spotifyParams
    },
    {
      type: 'EMIT_SEND_SPOTIFY_COMMAND',
      name: 'playerVolume',
      volumePercent: 70,
      delay: resetDelay
    },
    { type: 'EMIT_SEND_HUE_COMMAND', func: 'white', arg: 255, id: 3, delay: resetDelay - 50 },
    { type: 'EMIT_SEND_HUE_COMMAND', func: 'brightness', arg: 70, id: 3, delay: resetDelay - 25 }
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
      <p className='operations-header'>
        Use this app to get through the gate. The lights will change to
        your <span style={styles.coloredText(color)}>selected color </span>
        and your song will play once you enter the apartment.
      </p>
      <HuePicker height='30px' width='100%' color={rgb} onChange={actions.emitRGBUpdate}/>
      <br/>
      <table className='operations-table'>
        <tbody>
          <tr>
            <td><Avatar icon='queue_music'/></td>
            <td><SpotifyURIInput value={spotifyURI} {...props}/></td>
          </tr>
        </tbody>
      </table>
      <table className='operations-table'>
        <tbody>
          <tr>
            <td><Avatar icon='fingerprint'/></td>
            <td>
              <Input
                theme={theme}
                className='operations-input'
                type='text'
                value={passcode}
                label='Enter Passcode'
                hint='Only cool people have this'
                onChange={actions.emitPasscodeUpdate}
                required/>
            </td>
          </tr>
        </tbody>
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
    emitPasscodeUpdate: PropTypes.func.isRequired,
    emitRGBUpdate: PropTypes.func.isRequired
  }),
  rgb: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
  }),
  passcode: PropTypes.string.isRequired,
  spotifyURI: PropTypes.string.isRequired,
  triggerEvents: PropTypes.func.isRequired
};

export default MainOperations;
