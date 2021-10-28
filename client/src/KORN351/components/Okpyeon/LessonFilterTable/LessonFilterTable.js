import React from 'react';
import './LessonFilterTable.css';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { IconButton } from '@material-ui/core';
import {getRadicals, getPhonetics, getCharacters} from "../../../../actions/KORN351/Okpyeon";
import {getNewHanja} from "../../../../actions/KORN351/Lessons";
import {connect} from "react-redux";
import _ from 'lodash';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function LessonFilterTable(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentLesson, setCurrLesson] = React.useState(1);
    const lessons = _.range(1, 20);
    const selectItem = (lesson) => {
        setCurrLesson(lesson);
        handleClose();
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {newHanja, phonetics, radicals} = props;

    if (radicals.length === 0)
        props.getRadicals();
    if (newHanja.length === 0)
        props.getNewHanja();
    if (phonetics.length === 0)
        props.getPhonetics();

    return (
        <div className="lesson-filter-container">
            <div className="lesson-filter">
                <div className="lesson-header">
                    Selected:
                    <div className="lesson-button" onClick={handleClick}>
                        Lesson {currentLesson}
                        <IconButton className="lesson-button-chevron" size="medium">
                            <i class="material-icons">expand_more</i>
                        </IconButton>
                    </div>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        style={{height: '50%'}}
                    >
                        {lessons.map(lesson => (
                            <StyledMenuItem selected={currentLesson === lesson} onClick={() => selectItem(lesson)}>
                                <ListItemText primary={'Lesson ' + lesson} />
                            </StyledMenuItem>
                        ))}

                    </StyledMenu>
                </div>
                <br/>
                <div>
                    <h3>Radicals</h3>
                    <Divider/>
                    <br/>
                    <Grid container style={{overflowY: 'auto'}}>
                        {
                            radicals.map(char => {
                                if (char.lesson === currentLesson)
                                    return <Grid item xs={1} className="character-box2" onClick={() => props.showResult(char.radical, char)}><h3>{char.radical}</h3></Grid>
                            })
                        }
                    </Grid>
                    <br/><br/>

                    <h3>Characters</h3>
                    <Divider/>
                    <br/>
                    <Grid container>
                        {
                            newHanja.map(char => {
                                if (char.lesson === currentLesson)
                                    return <Grid item xs={1} className="character-box2" onClick={() => props.showResult(char.hanja, char)}><h3>{char.hanja}</h3></Grid>
                            })
                        }
                    </Grid>
                    <br/><br/>

                    <h3>Phonetics</h3>
                    <Divider/>
                    <br/>
                    <Grid container>
                        {
                            phonetics.map(phonetic => {
                                if (phonetic.lesson === currentLesson) {
                                    return <Grid item xs={1} className="character-box2" onClick={() => props.selectPhonetic(phonetic)}><h3>{phonetic.phonetic}</h3></Grid>
                                }
                            })
                        }
                    </Grid>
                    <br/><br/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        radicals : state.okpyeon.radicals,
        phonetics: state.okpyeon.phonetics,
        newHanja: state.lessons.newHanja
    };
};

export default connect(mapStateToProps, {getRadicals, getPhonetics, getNewHanja})(LessonFilterTable);
