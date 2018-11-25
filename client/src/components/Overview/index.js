import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Button, { StatusButton } from '../ui/Button';
import { getPlaylistAudioInfo } from '../../utils/service';
import { Box } from '@smooth-ui/core-em';
import styles from '../../styles';

const MOOD_HAPPY = {
  EMOJI: '😎🤗',
  COLOR: 'rgba(185, 36, 59, 1)',
};
const MOOD_SAD = {
  EMOJI: '😕😢',
  COLOR: 'rgba(123, 31, 162, 1)',
};
const MOOD_ANGRY = {
  EMOJI: '😤😠',
  COLOR: 'rgba(39, 38, 38, 1)',
};
const MOOD_PARTY = {
  EMOJI: '🥳🕺',
  COLOR: 'rgba(220, 112, 43, 1)',
};

const TEXT_1 = 'Single and ready to mingle';
const TEXT_2 = 'I want to hang out tonight';
const TEXT_3 = 'I like pets';

export default class Overview extends Component {
  // TODO: fix showChat to true
  state = {
    playlist: null,
    showChat: true,
    showOverview: false,
    playlistAttributes: null,
    text: '',
    firstTime: true,
    token: null,
  };

  componentDidMount() {
    const firstTime = this.props.location.state.firstTime;
    console.log(this.props.location.state);
    console.log(firstTime);
    if (firstTime) {
      this.state.firstTime &&
        setTimeout(() => {
          this.setState({
            showChat: true,
            firstTime: false,
          });
        }, 3500);

      this.state.firstTime &&
        setTimeout(() => {
          this.setState({
            showOverview: true,
          });
        }, 4000);
    } else {
      this.setState({
        showChat: false,
        showOverview: true,
      });
    }

    let playlist = null;
    let token = null;
    if (this.props.location.state) {
      playlist = this.props.location.state.playlist;
      token = this.props.location.state.token;
    }
    getPlaylistAudioInfo(playlist, token).then(playlistAttributes => {
      this.setState({
        playlistAttributes: playlistAttributes,
        playlist: playlist,
        token: token,
      });
    });
  }

  getMood = () => {
    const valence = this.state.playlistAttributes.valence;
    const energy = this.state.playlistAttributes.energy;
    if (valence >= 0.5 && energy >= 0.5) {
      return MOOD_PARTY;
    } else if (valence >= 0.5 && energy < 0.5) {
      return MOOD_HAPPY;
    } else if (valence < 0.5 && energy < 0.5) {
      return MOOD_SAD;
    } else {
      return MOOD_ANGRY;
    }
  };

  linkToEmotion = (emoji, color) => {
    this.props.history.push({
      pathname: '/emotion',
      state: {
        playlist: this.state.playlist,
        token: this.state.token,
        emoji: emoji,
        color: color,
        text: this.state.text,
      },
    });
  };

  render() {
    const { playlist, playlistAttributes, showChat, showOverview } = this.state;
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
          So you feel like your playlist
          <br />{' '}
          <b style={{ fontSize: 32 }}>{playlist && `${playlist.name} ?`}</b>‍‍‍‍
        </p>
      </div>
    );

    let emoji = '🤑';
    let color = 'green';
    if (playlistAttributes) {
      const mood = this.getMood();
      emoji = mood.EMOJI;
      color = mood.COLOR;
    }

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
              marginTop: 8,
              paddingBottom: 4,
              borderBottom: '1px solid #ccc',
              width: '100%',
            }}
          >
            Playlist information
          </div>
          <h3 style={{ margin: '14px 0' }}>{playlistName}</h3>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="#eee"
            borderRadius={12}
            p={1}
            maxWidth={'100%'}
          >
            <Box borderRadius={12}>
              <img
                src={playlistImg}
                alt={playlistName}
                height="120"
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Box width={'100%'} px={2}>
              <ul style={{ fontSize: 16, margin: '0px 0' }}>
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
                <li
                  style={{
                    color: '#888',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    marginTop: 4,
                  }}
                >
                  Specs
                </li>
              </ul>
              {playlistAttr.tempo > 130 ? (
                <Emoji symbol="🏎💨" />
              ) : (
                <Emoji symbol="👵" />
              )}
              {playlistAttr.energy > 0.7 ? (
                <Emoji symbol="🔥" />
              ) : (
                <Emoji symbol="☕️" />
              )}
            </Box>
          </Box>
          <div style={{ textAlign: 'center', positin: 'relative' }}>
            <b style={{ fontSize: 16 }}>
              Your emoji today based on your
              <br /> playlist:
            </b>
            <Emoji symbol={emoji} /> <br />
            <b
              style={{
                color: '#555',
                fontSize: 12,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Select your status
            </b>
            <br />
            <br />
          </div>
          <div onClick={() => this.setState({ text: TEXT_1 })}>
            <StatusButton>{TEXT_1}</StatusButton>
          </div>
          <div onClick={() => this.setState({ text: TEXT_2 })}>
            <StatusButton>{TEXT_2}</StatusButton>
          </div>
          <div onClick={() => this.setState({ text: TEXT_3 })}>
            <StatusButton>{TEXT_3}</StatusButton>
          </div>
          <div onClick={() => this.linkToEmotion(emoji, color)}>
            <br />
            <Button>Find friends</Button>
          </div>
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
