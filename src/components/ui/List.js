import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 520,
    maxHeight: 320,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
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
    const { classes, items } = this.props;

    return (
      <div className={classes.root}>
        <List dense>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(value => (
            <ListItem key={value} button>
              <Avatar
                alt="Remy Sharp"
                src="https://contentpl-a.akamaihd.net/images/genre_moods/image/medium/Compilation.jpg"
              />
              <ListItemText primary={`My playlist ${value + 1}`} />
              <ListItemSecondaryAction />
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
