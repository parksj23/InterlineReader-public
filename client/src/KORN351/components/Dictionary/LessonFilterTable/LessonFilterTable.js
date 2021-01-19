import React from 'react';
import './LessonFilterTable.css';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import characters from '../../../charMockData';
import radicals from '../../../radicalMockData';
import phonetics from '../../../phoneticsMockData';

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

export default function LessonFilterTable(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentLesson, setCurrLesson] = React.useState(1);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="lesson-filter-container">
            <div className="lesson-filter">
                <h2 className="lesson-button" onClick={handleClick}>
                    Lesson {currentLesson}
                </h2>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    style={{height: '50%'}}
                >
                    <StyledMenuItem onClick={() => setCurrLesson(1)}>
                        <ListItemText primary="Lesson 1" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(2)}>
                        <ListItemText primary="Lesson 2" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(3)}>
                        <ListItemText primary="Lesson 3" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(4)}>
                        <ListItemText primary="Lesson 4" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(5)}>
                        <ListItemText primary="Lesson 5" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(6)}>
                        <ListItemText primary="Lesson 6" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(7)}>
                        <ListItemText primary="Lesson 7" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(8)}>
                        <ListItemText primary="Lesson 8" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(9)}>
                        <ListItemText primary="Lesson 9" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(10)}>
                        <ListItemText primary="Lesson 10" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(11)}>
                        <ListItemText primary="Lesson 11" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(12)}>
                        <ListItemText primary="Lesson 12" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(13)}>
                        <ListItemText primary="Lesson 13" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(14)}>
                        <ListItemText primary="Lesson 14" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(15)}>
                        <ListItemText primary="Lesson 15" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(16)}>
                        <ListItemText primary="Lesson 16" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(17)}>
                        <ListItemText primary="Lesson 17" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(18)}>
                        <ListItemText primary="Lesson 18" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(19)}>
                        <ListItemText primary="Lesson 19" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => setCurrLesson(20)}>
                        <ListItemText primary="Lesson 20" />
                    </StyledMenuItem>

                </StyledMenu>
                <br/>
                <div>
                    <h3>Radicals</h3>
                    <Divider/>
                    <br/>
                    <Grid container style={{overflowY: 'auto'}}>
                        {
                            radicals.map(char => {
                                if (char.lesson === currentLesson)
                                    return <Grid item xs={1} className="character-box2" onClick={() => props.showResult(char.hanja, char)}><h3>{char.hanja}</h3></Grid>
                            })
                        }
                    </Grid>
                    <br/><br/>

                    <h3>Characters</h3>
                    <Divider/>
                    <br/>
                    <Grid container>
                        {
                            characters.map(char => {
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
                            characters.map(char => {
                                if (char.lesson === currentLesson)
                                    return <Grid item xs={1} className="character-box2" onClick={() => props.showResult(char.hanja, char)}><h3>{char.hanja}</h3></Grid>
                            })
                        }
                    </Grid>
                    <br/><br/>
                </div>
            </div>
        </div>
    );
}
