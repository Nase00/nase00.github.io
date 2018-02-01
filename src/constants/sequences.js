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
    deviceIds: ['355beabb5645106941fcdff91fb48e2ad827050e'],
    delay: 5750
  },
  {
    type: 'EMIT_SEND_SPOTIFY_COMMAND',
    name: 'playerPlay',
    contextUri: 'spotify:user:nasezero:playlist:67gRgPsGStLBH7anRK21ko',
    deviceId: 'eaf15736daea2d8c550795950c984067b6a3df12',
    delay: 6000
  },
  { type: 'EMIT_SEND_SPOTIFY_COMMAND', name: 'playerVolume', volumePercent: 100, delay: 5750 },
  { type: 'EMIT_SEND_UNIFIED_COMMAND', name: 'triggerCommand', value: 6, delay: 40000 },

  // Flash with beginning of song
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 6500 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 7500 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 8500 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 9500 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 10500 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'flashPurple', delay: 11500 },

  // Soften effects long-term
  { type: 'EMIT_SEND_HUE_COMMAND', func: 'effect', arg: 'none', id: 3, delay: 115000 },
  { type: 'EMIT_SEND_HUE_COMMAND', func: 'hue', arg: 65535, id: 3, delay: 115050 },
  { type: 'EMIT_SEND_HUE_COMMAND', func: 'brightness', arg: 70, id: 3, delay: 115000 },
  { type: 'EMIT_SEND_SPOTIFY_COMMAND', name: 'playerVolume', volumePercent: 90, delay: 115000 },
  { type: 'EMIT_SEND_SPOTIFY_COMMAND', name: 'playerVolume', volumePercent: 80, delay: 125000 },
  { type: 'EMIT_FORWARD_HTTP_REQUEST', key: 'rain' }
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
