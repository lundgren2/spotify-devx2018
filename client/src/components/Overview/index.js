import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import fakePlaylist from './fakePlaylist';
import Emoji from '../Emoji';
import Button from '../ui/Button';

export default class Overview extends Component {
  // TODO: fix showChat to true
  state = { playlist: fakePlaylist, showChat: true, showOverview: true };

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
  }
  render() {
    const { playlist, showChat, showOverview } = this.state;
    console.log(playlist);

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
          So you feel like your playlist <b>{playlist.name}?</b>‍‍‍‍
        </p>
      </div>
    );

    const emoji = '🤑';
    const color = 'green';
    const text = `Single and ready to mingle`;

    const renderOverview = () => (
      <div style={style.overview}>
        Here is some information about your playlist
        <h3>{playlist.name}</h3>
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
