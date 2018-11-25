import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import getAccessToken from '../../utils/getAccessToken';
import Button from '../ui/Button';
import {
  getUsersOwnPlaylists,
  getTracksInPlaylist,
  getAudioInfo,
} from '../../utils/service';

export default class Dashboard extends Component {
  state = {
    playlist: null,
    redirect: false,
    token: null,
  };
  componentDidMount() {
    getAccessToken(this.props.location.search).then(token => {
      getUsersOwnPlaylists(20, token)
        .then(playlist => this.setState({ playlist: playlist, token: token }))
        .catch(() => this.setState({ redirect: true }));
    });
  }

  async getAudioInfo() {
    const { playlist, token } = this.state;
    const entrys = await getTracksInPlaylist(playlist[0].id, token);
    const trackIds = entrys.map(entry => entry.track.id);
    const audioInfoList = await getAudioInfo(trackIds, token);
    return audioInfoList;
  }

  render() {
    const { redirect, playlist } = this.state;
    if (playlist) {
      const audioInfoList = this.getAudioInfo();
      audioInfoList.then(json => {
        console.log(json);
      });

      // getTracksInPlaylist(playlist[0].id, token).then(entrys => {
      //   const trackIds = entrys.map(entry => entry.track.id);
      //   getAudioInfo(trackIds, token).then(audioInfoList => {
      //     console.log(audioInfoList);
      //   })
      //
      // });
    }
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <h2>
          Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
        </h2>
        <p>Pick one playlist that best matches your mood today!</p>
        {playlist && <Playlists items={playlist} />}
        <br />
        <Link to={'/overview'}>
          <Button>Next</Button>
        </Link>
      </Container>
    );
  }
}
