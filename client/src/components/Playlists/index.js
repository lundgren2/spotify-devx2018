import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import { getPlaylistAudioInfo } from '../../utils/service';

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
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, items, token } = this.props;
    return (
      <div className={classes.root}>
        <List dense>
          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                getPlaylistAudioInfo(item, token).then(array => {
                  console.log(array);
                });
              }}
              button
            >
              <Avatar alt="Remy Sharp" src={item.images[0].url} />
              <ListItemText primary={`${item.name}`} />
              <ListItemSecondaryAction />
              <Checkbox
                checked={this.state.checked.indexOf(item) !== -1}
                tabIndex={-1}
                disableRipple
              />
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
