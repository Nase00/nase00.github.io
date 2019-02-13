import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'react-toolbox';
import { HuePicker } from 'react-color';

import { genRGB } from '../../utils';
import SpotifyURIInput from './spotify-uri-input';
import styles from './styles';

class MainOperations extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      emitRGBUpdate: PropTypes.func.isRequired
    }),
    rgb: PropTypes.shape({
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired
    }),
    hashedPassword: PropTypes.string.isRequired,
    spotifyURI: PropTypes.string.isRequired,
    triggerEvents: PropTypes.func.isRequired
  };

  SPOTIFY_PARAMS = {
    device_id: 'eaf15736daea2d8c550795950c984067b6a3df12',
    conditions: { locked: false, ajar: true }
  };

  BEGIN_DELAY = 10000;
  RESET_DELAY = 110000;

  triggerGateEvents = (hashedPassword) =>
    this.props.triggerEvents([
      { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashGreen' },
      {
        type: 'EMIT_FORWARD_HTTP_REQUEST',
        key: 'buzz',
        body: { code: hashedPassword }
      },
      {
        type: 'EMIT_SEND_SPOTIFY_COMMAND',
        name: 'playerPlay',
        uris: [this.props.spotifyURI],
        delay: this.BEGIN_DELAY,
        ...this.SPOTIFY_PARAMS
      },
      {
        type: 'EMIT_SEND_SPOTIFY_COMMAND',
        name: 'playerShuffle',
        state: true,
        delay: this.BEGIN_DELAY,
        ...this.SPOTIFY_PARAMS
      },
      {
        type: 'EMIT_SEND_SPOTIFY_COMMAND',
        name: 'playerVolume',
        volumePercent: 100,
        delay: this.BEGIN_DELAY,
        ...this.SPOTIFY_PARAMS
      },
      {
        type: 'EMIT_SEND_HUE_COMMAND',
        func: 'rgb',
        arg: Object.values(this.props.rgb),
        id: 3,
        conditions: { locked: false, ajar: true },
        delay: this.BEGIN_DELAY
      },
      {
        type: 'EMIT_SEND_SPOTIFY_COMMAND',
        name: 'playerPlay',
        context_uri: 'spotify:user:nasezero:playlist:4IZGEV2ts6jdIDjtug7ekr', // Halloween special
        delay: this.RESET_DELAY,
        ...this.SPOTIFY_PARAMS
      },
      {
        type: 'EMIT_SEND_SPOTIFY_COMMAND',
        name: 'playerVolume',
        volumePercent: 70,
        delay: this.RESET_DELAY
      },
      {
        type: 'EMIT_SEND_HUE_COMMAND',
        func: 'ct',
        arg: 350,
        id: 3,
        delay: this.RESET_DELAY - 50
      },
      {
        type: 'EMIT_SEND_HUE_COMMAND',
        func: 'brightness',
        arg: 20,
        id: 3,
        delay: this.RESET_DELAY - 25
      }
    ]);

  render() {
    const { actions, hashedPassword, spotifyURI, rgb } = this.props;
    const color = genRGB(...Object.values(rgb));

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
          Use this app to get through the gate. The lights will change to your{' '}
          <span style={styles.coloredText(color)}>selected color </span>
          and your song will play once you enter the apartment.
        </p>
        <HuePicker height='30px' width='100%' color={rgb} onChange={actions.emitRGBUpdate}/>
        <br/>
        <table className='operations-table'>
          <tbody>
            <tr>
              <td>
                <Avatar icon='queue_music'/>
              </td>
              <td>
                <SpotifyURIInput value={spotifyURI} {...this.props}/>
              </td>
            </tr>
          </tbody>
        </table>
        <Button className='submit-command' onClick={this.triggerGateEvents(hashedPassword)}>
          Open Gate
        </Button>
        <p className='operations-help'>Click {helpLink} for help on finding Spotify URIs</p>
      </section>
    );
  }
}

export default MainOperations;
