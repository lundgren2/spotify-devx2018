import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    height: '80%',
    maxHeight: '50vh',
    overflow: 'auto',
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    chosenPlaylist: null,
  };

  handleClick = chosenPlaylist => {
    this.setState({ chosenPlaylist });
  };

  render() {
    const { classes, items, token } = this.props;
    const { chosenPlaylist } = this.state;
    if (chosenPlaylist) {
      return (
        <Redirect
          to={{
            pathname: '/overview',
            state: { playlist: chosenPlaylist, token: token },
          }}
        />
      );
    }
    return (
      <div className={classes.root}>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index} onClick={() => this.handleClick(item)} button>
              <Avatar alt="Remy Sharp" src={item.images[0].url} />
              <ListItemText primary={`${item.name}`} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
