import axios from 'axios';
import { Redirect } from 'react-router-dom';

const accessToken = localStorage.getItem('accessToken') || null;

export async function getUsersOwnPlaylists(limit) {
  if (accessToken == null) return;
  let playlist;

  try {
    playlist = await axios.get('https://api.spotify.com/v1/me/playlists', {
      params: {
        limit: limit,
      },
      headers: { Authorization: 'Bearer ' + accessToken },
    });
  } catch (error) {
    console.log(error);
    return;
  }
  return playlist != null ? playlist.data.items : null;
}

async function getTracksInPlaylist(playlist_id, token) {
  if (accessToken == null) return;
  let tracks;

  try {
    tracks = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  return tracks != null ? tracks.data.items : null;
}

async function getAudioInfo(trackIdList, token) {
  if (accessToken == null) return;
  let audioInfo;

  try {
    audioInfo = await axios.get('https://api.spotify.com/v1/audio-features', {
      params: {
        ids: trackIdList.join(','),
      },
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.log(error);
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
  if (accessToken == null) return;

  // if this is an error, clear your localhost and start over!
  const entrys = await getTracksInPlaylist(playlist.id, accessToken);
  const trackIds = entrys && entrys.map(entry => entry.track.id);
  const audioInfoList = await getAudioInfo(trackIds, accessToken);

  const valenceAverage = calcAverageAttribute('valence', audioInfoList);
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
