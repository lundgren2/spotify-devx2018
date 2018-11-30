import axios from 'axios';
import config from '../config';
import queryString from 'query-string';

const accessToken =
  localStorage.getItem('accessToken') ||
  queryString.parse(window.location.search).access_token;

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) return;
  const response = await axios.get(`${config.BACKEND_URI}/refresh_token`, {
    params: {
      refresh_token: refreshToken,
    },
  });

  localStorage.setItem('accessToken', response.data.access_token);
}

export async function getUsersOwnPlaylists(limit) {
  let playlist;

  try {
    playlist = await axios.get(`${config.SPOTIFY_API}/me/playlists`, {
      params: {
        limit: limit,
      },
      headers: { Authorization: 'Bearer ' + accessToken },
    });
  } catch (error) {
    console.log(error);
    refreshAccessToken();
  }
  return playlist != null ? playlist.data.items : null;
}

async function getTracksInPlaylist(playlist_id) {
  let tracks;
  try {
    tracks = await axios.get(
      `${config.SPOTIFY_API}/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
    refreshAccessToken();
  }
  return tracks != null ? tracks.data.items : null;
}

async function getAudioInfo(trackIdList) {
  let audioInfo;

  try {
    audioInfo = await axios.get(`${config.SPOTIFY_API}/audio-features`, {
      params: {
        ids: trackIdList.join(','),
      },
      headers: { Authorization: 'Bearer ' + accessToken },
    });
  } catch (error) {
    console.log(error);
    refreshAccessToken();
  }
  return audioInfo != null ? audioInfo.data.audio_features : null;
}

function calcAverageAttribute(attribute, audioInfoList) {
  if (!audioInfoList) return;
  const attributeList = audioInfoList.map(audioInfo => audioInfo[attribute]);
  const attributeSum = attributeList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  const attributeAverage = attributeSum / attributeList.length;
  return attributeAverage;
}

export async function getPlaylistAudioInfo(playlist) {
  // if this is an error, clear your localhost and start over!
  const entrys = await getTracksInPlaylist(playlist.id);
  const trackIds = entrys && entrys.map(entry => entry.track.id);
  const audioInfoList = await getAudioInfo(trackIds);
  const valenceAverage =
    audioInfoList && calcAverageAttribute('valence', audioInfoList);
  const energyAverage = calcAverageAttribute('energy', audioInfoList);
  const danceabilityAverage = calcAverageAttribute(
    'danceability',
    audioInfoList
  );
  const acousticnessAverage = calcAverageAttribute(
    'acousticness',
    audioInfoList
  );
  const instrumentalnessAverage = calcAverageAttribute(
    'instrumentalness',
    audioInfoList
  );
  const livenessAverage = calcAverageAttribute('liveness', audioInfoList);
  const loudnessAverage = calcAverageAttribute('loudness', audioInfoList);
  const modeAverage = calcAverageAttribute('mode', audioInfoList);
  const speechinessAverage = calcAverageAttribute('speechiness', audioInfoList);
  const tempoAverage = calcAverageAttribute('tempo', audioInfoList);

  const audioAverages = {
    valence: valenceAverage,
    energy: energyAverage,
    danceability: danceabilityAverage,
    acousticness: acousticnessAverage,
    instrumentalness: instrumentalnessAverage,
    liveness: livenessAverage,
    loudness: loudnessAverage,
    mode: modeAverage,
    speechiness: speechinessAverage,
    tempo: tempoAverage,
  };

  return audioAverages;
}
