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
    return;
  }
  return playlist.data.items;
}
