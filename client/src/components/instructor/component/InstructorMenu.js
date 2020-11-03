import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
      background: '#c0d0e5'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: 'auto'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'relative'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'relative'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    position: 'relative'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    position: 'relative'
  }
});

class InstructorMenu extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes} = this.props;

      // Original: <ListItem ... disabled={this.props.isLoading}
    return (
      <div className={classes.root}>
          <List>
            <ListItem button key={'analytics'}
                      onClick={()=> {
                        this.props.history.push('/instructor/analytics');
                        this.props.changeSelectedMenu("Analytics")
                      }}>
              <ListItemIcon><i className="material-icons">bar_chart</i></ListItemIcon>
              <ListItemText primary={'Analytics'} />
            </ListItem>
            <ListItem button key={'classes'}
                      onClick={()=> {
                        this.props.history.push('/instructor/classes');
                        this.props.changeSelectedMenu("Classes")
                      }}>
              <ListItemIcon><i className="material-icons">library_books</i></ListItemIcon>
              <ListItemText primary={'Classes'} />
            </ListItem>
              <ListItem button key={'addStory'}
                        onClick={()=> {
                            this.props.history.push('/instructor/addStory')
                            this.props.changeSelectedMenu("Add Story")
                        }}>
                  <ListItemIcon><i className="material-icons">chrome_reader_mode</i></ListItemIcon>
                  <ListItemText primary={'Add Story'} />
              </ListItem>
              <ListItem button key={'editStory'}
                        onClick={()=> {
                            this.props.history.push('/instructor/editStory')
                            this.props.changeSelectedMenu("Edit Story")
                        }}>
                  <ListItemIcon><i className="material-icons">chrome_reader_mode</i></ListItemIcon>
                  <ListItemText primary={'Edit Story'} />
              </ListItem>
            <ListItem button key={'editVocab'}
                      onClick={()=> {
                        this.props.history.push('/instructor/editVocab');
                        this.props.changeSelectedMenu("Edit Vocabulary")
                      }}>
              <ListItemIcon><i className="material-icons">sort_by_alpha</i></ListItemIcon>
              <ListItemText primary={'Edit Vocabulary'} />
            </ListItem>
            <ListItem button key={'editGrammar'}
                      onClick={()=> {
                        this.props.history.push('/instructor/editGrammar');
                        this.props.changeSelectedMenu("Edit Grammar")
                      }}>
              <ListItemIcon><i className="material-icons">g_translate</i></ListItemIcon>
              <ListItemText primary={'Edit Grammar'} />
            </ListItem>
              <ListItem button key={'addMidKRVoc'}
                        onClick={()=> {
                            this.props.history.push('/instructor/addMidKRVocab');
                            this.props.changeSelectedMenu("Add Middle Korean Vocabulary")
                        }}>
                  <ListItemIcon><i className="material-icons">sort_by_alpha</i></ListItemIcon>
                  <ListItemText primary={'Add Middle Korean Vocabulary'} />
              </ListItem>
            <ListItem button key={'addMidKRGram'}
                      onClick={()=> {
                        this.props.history.push('/instructor/addMidKRGram');
                        this.props.changeSelectedMenu("Add Middle Korean")
                      }}>
              <ListItemIcon><i className="material-icons">g_translate</i></ListItemIcon>
              <ListItemText primary={'Add Middle Korean Grammar'} />
            </ListItem>
            <ListItem button key={'files'}
                      onClick={()=> {
                        this.props.history.push('/instructor/files');
                        this.props.changeSelectedMenu("Files")
                      }}>
              <ListItemIcon><i className="material-icons">attachment</i></ListItemIcon>
              <ListItemText primary={'Files'} />
            </ListItem>
          </List>
      </div>
    );
  }
}

InstructorMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(InstructorMenu);