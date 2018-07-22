// Alpha
export const PLAYLIST_ONE = [
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerPause',
    deviceIds: ['eaf15736daea2d8c550795950c984067b6a3df12']
  },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerShuffle',
    state: false,
    deviceIds: ['eaf15736daea2d8c550795950c984067b6a3df12']
  },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'cylon' },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple' },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'transferPlayback',
    deviceIds: ['355beabb5645106941fcdff91fb48e2ad827050e']
  },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerPlay',
    contextUri: 'spotify:user:nasezero:playlist:67gRgPsGStLBH7anRK21ko',
    deviceId: 'eaf15736daea2d8c550795950c984067b6a3df12'
  }
];

// S
export const PLAYLIST_TWO = [
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerPause',
    deviceIds: ['eaf15736daea2d8c550795950c984067b6a3df12']
  },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerShuffle',
    state: false,
    deviceIds: ['eaf15736daea2d8c550795950c984067b6a3df12']
  },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'rain' },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple' },
  { type: 'EMIT_SEND_HUE_COMMAND', func: 'brightness', arg: 75, id: 3 },
  { type: 'EMIT_SEND_HUE_COMMAND', func: 'brightness', arg: 75, id: 2 },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'transferPlayback',
    deviceIds: ['355beabb5645106941fcdff91fb48e2ad827050e']
  },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerPlay',
    contextUri: 'spotify:user:nasezero:playlist:4CcQ8E6VpYIOEKvFRTdnuU',
    deviceId: 'eaf15736daea2d8c550795950c984067b6a3df12'
  }
];
