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
                    <ListItem button key={'editLessons'}
                              onClick={()=> {
                                  this.props.history.push('/instructor351/editLesson')
                                  this.props.changeSelectedMenu("Edit Lesson")
                              }}>
                        <ListItemIcon><i className="material-icons">chrome_reader_mode</i></ListItemIcon>
                        <ListItemText primary={'Edit Lesson'} />
                    </ListItem>
                    {/**
                     // TODO: implement this option

                     <ListItem button key={'insertNewLesson'}
                     onClick={()=> {
                                  this.props.history.push('/instructor351/insertNew');
                                  this.props.changeSelectedMenu("Create New Lesson")
                              }}>
                     <ListItemIcon><i className="material-icons">library_books</i></ListItemIcon>
                     <ListItemText primary={'Create New Lesson'} />
                     </ListItem>

                     **/}

                    <ListItem button key={'editOkpyeon'}
                              onClick={()=> {
                                  this.props.history.push('/instructor351/editOkpyeon');
                                  this.props.changeSelectedMenu("Edit Hanja Characters, Radicals & Phonetics (For Okpyeon & Lessons)")
                              }}>
                        <ListItemIcon><i className="material-icons">g_translate</i></ListItemIcon>
                        <ListItemText primary={'Edit Okpyeon (Also for Lessons)'} />
                    </ListItem>

                    <ListItem button key={'tutorial'}
                              onClick={()=> {
                                  this.props.history.push('/instructor351/tutorial');
                                  this.props.changeSelectedMenu("Instructor User Guide")
                              }}>
                        <ListItemIcon><i className="material-icons">help</i></ListItemIcon>
                        <ListItemText primary={'Instructor User Guide'} />
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