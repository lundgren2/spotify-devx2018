import axios from 'axios';
import { Redirect } from 'react-router-dom';

export async function getUsersOwnPlaylists(limit, token) {
  let playlist = null;

  try {
    playlist = await axios.get('https://api.spotify.com/v1/me/playlists', {
      params: {
        limit: limit,
      },
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.log(error);
    return;
  }
  // TODO: fix ugly solution
  return playlist ? playlist.data.items : null;
}

async function getTracksInPlaylist(playlist_id, token) {
  // if this is an error, clear your localhost and start over!

  let tracks = null;
  try {
    tracks = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  return tracks.data.items;
}

async function getAudioInfo(trackIdList, token) {
  let auidoInfo = null;
  try {
    auidoInfo = await axios.get('https://api.spotify.com/v1/audio-features', {
      params: {
        ids: trackIdList.join(','),
      },
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.log(error);
  }
  return auidoInfo.data.audio_features;
}

function calcAverageAttribute(attribute, audioInfoList) {
  const attributeList = audioInfoList.map(audioInfo => audioInfo[attribute]);
  const attributeSum = attributeList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  const attributeAverage = attributeSum / attributeList.length;
  return attributeAverage;
}

export async function getPlaylistAudioInfo(playlist, token) {
  // if this is an error, clear your localhost and start over!
  const entrys = await getTracksInPlaylist(playlist.id, token);
  const trackIds = entrys.map(entry => entry.track.id);
  const audioInfoList = await getAudioInfo(trackIds, token);

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
