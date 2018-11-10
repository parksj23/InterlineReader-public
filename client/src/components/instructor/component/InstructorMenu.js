import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../style/instructorMenu.css'

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: "#328644",
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
    '&:hover': {
      textDecoration: "none"
    },
    display: "flex"
  },
  primary: {},
  icon: {},
});



const InstructorMenu = (props) => {
  const { classes} = props;

  return (
    <div>
      <MenuList>
        <MenuItem className={classes.menuItem} onClick={()=> props.history.push('/instructor/analytics')}>
            <ListItemIcon className={classes.icon} >
              <i className="material-icons">bar_chart</i>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Analytics" />
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={()=> props.history.push('/instructor/stories')}>
            <ListItemIcon className={classes.icon}>
              <i className="material-icons">library_books</i>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Stories" />
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={()=> props.history.push('/instructor/addStory')}>
            <ListItemIcon className={classes.icon}>
              <i className="material-icons">chrome_reader_mode</i>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Add New Story" />
        </MenuItem>
      </MenuList>
      </div>
  );
}

export default withStyles(styles)(InstructorMenu);
