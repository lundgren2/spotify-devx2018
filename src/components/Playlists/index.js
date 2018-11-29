import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxHeight: '450px',
    overflow: 'scroll',
    backgroundColor: '#eee',
    borderRadius: 8,
    position: 'relative',
  },
});

class CheckboxListSecondary extends React.Component {
  handleClick = chosenPlaylist => {
    this.props.linkToOverview(chosenPlaylist);
  };

  render() {
    const { classes, items } = this.props;
    return (
      <div className={classes.root}>
        <List dense>
          {items &&
            items.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => this.handleClick(item)}
                button
              >
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
