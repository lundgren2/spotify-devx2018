import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Button from '../ui/Button';
import { getPlaylistAudioInfo } from '../../utils/service';

const MOOD_HAPPY = {
  EMOJI: '😎',
  COLOR: 'pink',
  TEXT: 'Single and ready to mingle',
};
const MOOD_SAD = {
  EMOJI: '😕',
  COLOR: 'purple',
  TEXT: 'Single and ready to mingle',
};
const MOOD_ANGRY = {
  EMOJI: '😤 ',
  COLOR: 'gray',
  TEXT: 'Single and ready to mingle',
};
const MOOD_PARTY = {
  EMOJI: '💃🏽',
  COLOR: 'orange',
  TEXT: 'Single and ready to mingle',
};

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

  getMood = () => {
    console.log(this.state.playlistAttributes);
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

  render() {
    const { playlist, showChat, showOverview, playlistAttributes } = this.state;
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

    let emoji = '🤑';
    let color = 'green';
    let text = `Single and ready to mingle`;
    if (playlistAttributes) {
      const mood = this.getMood();
      emoji = mood.EMOJI;
      color = mood.COLOR;
      text = mood.TEXT;
    }

    const renderOverview = () => (
      <div style={style.overview}>
        Here is some information about your playlist
        <h3>{playlist && playlist.name}</h3>
        <ul>
          <li>
            <b>BPM:</b> 128bpm
          </li>
          <li>
            <b>Emotion:</b> Fire <Emoji symbol="🔥" />
          </li>
        </ul>
        {/* <Link to={`/emotion/${emoji}/$`} */}
        <Link
          to={{
            pathname: '/emotion',
            state: { emoji: emoji, color: color, text: text },
          }}
        >
          <Button>Find friends</Button>
        </Link>
      </div>
    );

    return (
      <Container>
        {renderChat()}
        {renderOverview()}
      </Container>
    );
  }
}
