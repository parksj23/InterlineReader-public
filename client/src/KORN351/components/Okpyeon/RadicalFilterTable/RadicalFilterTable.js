import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect} from "react-redux";
import {getRadicals} from '../../../../actions/KORN351/Okpyeon';
import './RadicalFilterTable.css';
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        'aria-selected': 'false'
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
}));

function RadicalFilterTable(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (props.radicals.length === 0)
        props.getRadicals();

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                indicatorColor="primary"
            >
                <Tab label="ALL" {...a11yProps(0)} />
                <Tab label="1 Stroke" {...a11yProps(1)} />
                <Tab label="2 Strokes" {...a11yProps(2)} />
                <Tab label="3 Strokes" {...a11yProps(3)} />
                <Tab label="4 Strokes" {...a11yProps(4)} />
                <Tab label="5 Strokes" {...a11yProps(5)} />
                <Tab label="6 Strokes" {...a11yProps(6)} />
                <Tab label="7 Strokes" {...a11yProps(7)} />
                <Tab label="8 Strokes" {...a11yProps(8)} />
                <Tab label="9 Strokes" {...a11yProps(9)} />
                <Tab label="10 Strokes" {...a11yProps(10)} />
                <Tab label="11 Strokes" {...a11yProps(11)} />
                <Tab label="12 Strokes" {...a11yProps(12)} />
                <Tab label="13 Strokes" {...a11yProps(13)} />
                <Tab label="14 Strokes" {...a11yProps(14)} />
                <Tab label="15 Strokes" {...a11yProps(15)} />
                <Tab label="16 Strokes" {...a11yProps(16)} />
                <Tab label="17 Strokes" {...a11yProps(17)} />
            </Tabs>
            <TabPanel value={value} index={0} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                            <span className="hanja">{char.radical}</span>
                            <span className="hangul">{char.radicalHangul}</span>
                        </Grid>
                    })}
                </Grid>

            </TabPanel>
            <TabPanel value={value} index={1} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 1)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 2)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 3)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={4} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 4)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={5} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 5)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={6} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 6)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={7} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 7)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={8} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 8)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={9} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 9)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={10} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 10)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={11} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 11)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={12} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 12)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={13} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 13)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={14} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 14)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={15} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 15)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={16} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 16)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={17} className="tab-panel">
                <Grid container>
                    {props.radicals.map(char => {
                        if (char.radicalStrokeCount === 17)
                            return <Grid key={char} item xs={4} className="character-box" onClick={() => props.filter(char.radical)}>
                                <span className="hanja">{char.radical}</span>
                                <span className="hangul">{char.radicalHangul}</span>
                            </Grid>
                    })}
                </Grid>
            </TabPanel>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        radicals : state.okpyeon.radicals
    };
};

export default connect(mapStateToProps, {getRadicals})(RadicalFilterTable);
