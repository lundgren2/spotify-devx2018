import axios from 'axios';

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
  }
  return playlist.data.items;
}

export async function getTracksInPlaylist(playlist_id, token) {
  let tracks = null;
  try {
    tracks = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );
  } catch (error) {
    console.log(error);
  }
  return tracks.data.items;
}

export async function getAudioInfo(trackIdList, token) {
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
  return auidoInfo;
}
