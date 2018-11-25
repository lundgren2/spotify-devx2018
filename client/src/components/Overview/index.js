import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Button from '../ui/Button';
import { getPlaylistAudioInfo } from '../../utils/service';
import { Box } from '@smooth-ui/core-em';
import styles from '../../styles';

export default class Overview extends Component {
  // TODO: fix showChat to true
  state = {
    playlist: null,
    showChat: true,
    showOverview: true,
    playlistAttributes: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showChat: false,
      });
    }, 3500);

    setTimeout(() => {
      this.setState({
        showOverview: true,
      });
    }, 4000);

    const playlist =
      this.props.location.state && this.props.location.state.playlist;
    const token = this.props.location.state && this.props.location.state.token;
    getPlaylistAudioInfo(playlist, token).then(playlistAttributes => {
      this.setState({
        playlistAttributes: playlistAttributes,
        playlist: playlist,
      });
    });
  }
  render() {
    const { playlist, playlistAttributes, showChat, showOverview } = this.state;
    console.log(playlist);
    console.log(playlistAttributes);
    const style = {
      chatText: {
        transition: 'opacity 1s ease-in-out',
        opacity: showChat ? 1 : 0,
        display: showOverview ? 'none' : 'block',
      },
      overview: {
        transition: 'opacity 0.5s ease-in-out',
        opacity: showOverview ? 1 : 0,
        textAlign: 'left',
      },
    };

    const renderChat = () => (
      <div style={style.chatText}>
        <h2>
          Oh nice! <Emoji symbol="🥳" />
        </h2>
        <p>
          So you feel like your playlist <b>{playlist && playlist.name}?</b>‍‍‍‍
        </p>
      </div>
    );

    const emoji = '🤑';
    const color = 'green';
    const text = `Single and ready to mingle`;

    const renderOverview = () => {
      const playlistName = playlist && playlist.name;
      const playlistImg = playlist && playlist.images[0].url;
      const playlistAttr = playlistAttributes ? playlistAttributes : {};

      return (
        <div style={style.overview}>
          <div
            style={{
              color: styles.colors.gray,
              fontSize: 28,
              paddingBottom: 8,
              borderBottom: '1px solid #ccc',
              width: '100%',
            }}
          >
            Playlist information
          </div>

          <h3>{playlistName}</h3>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="#eee"
            borderRadius={12}
            p={1}
          >
            <Box borderRadius={12}>
              <img
                src={playlistImg}
                alt={playlistName}
                height="200"
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Box width={'100%'} px={2}>
              <ul>
                <li>
                  <b>Tempo:</b> {Math.floor(playlistAttr.tempo)}bpm
                </li>
                <li>
                  <b>Energy:</b> {Math.floor(playlistAttr.energy * 100)} %
                </li>
                <li>
                  <b>Danceability:</b>{' '}
                  {Math.floor(playlistAttr.danceability * 100)}%
                </li>
              </ul>
              <b>Your Emoji today:</b>
              <br />
              <Emoji symbol={emoji} />{' '}
            </Box>
          </Box>
          <Link
            to={{
              pathname: '/emotion',
              state: { emoji: emoji, color: color, text: text },
            }}
          >
            <br />
            <Button>Find friends</Button>
          </Link>
        </div>
      );
    };

    return (
      <Container>
        {renderChat()}
        {renderOverview()}
      </Container>
    );
  }
}
