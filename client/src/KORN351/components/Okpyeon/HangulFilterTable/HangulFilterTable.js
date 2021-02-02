import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {getEumFilters} from '../../../../actions/KORN351/Okpyeon';
import {connect} from "react-redux";
import './HangulFilterTable.css';
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

function HangulFilterTable(props) {
    if (props.eumFilters.length === 0)
        props.getEumFilters();

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Tab label="ㄱ" {...a11yProps(1)} />
                <Tab label="ㄴ" {...a11yProps(2)} />
                <Tab label="ㄷ" {...a11yProps(3)} />
                <Tab label="ㄹ" {...a11yProps(4)} />
                <Tab label="ㅁ" {...a11yProps(5)} />
                <Tab label="ㅂ" {...a11yProps(6)} />
                <Tab label="ㅅ" {...a11yProps(7)} />
                <Tab label="ㅇ" {...a11yProps(8)} />
                <Tab label="ㅈ" {...a11yProps(9)} />
                <Tab label="ㅊ" {...a11yProps(10)} />
                <Tab label="ㅋ" {...a11yProps(11)} />
                <Tab label="ㅌ" {...a11yProps(12)} />
                <Tab label="ㅍ" {...a11yProps(13)} />
                <Tab label="ㅎ" {...a11yProps(14)} />
            </Tabs>
            <TabPanel value={value} index={0} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㄱ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㄴ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㄷ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㄹ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={4} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅁ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={5} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅂ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={6} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅅ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={7} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅇ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={8} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅈ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={9} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅊ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={10} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅋ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={11} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅌ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={12} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅍ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={13} className="tab-panel">
                <Grid container>
                    {
                        props.eumFilters.length < 1? '' :
                        props.eumFilters.filter(obj => {return obj.hangulPrefix === "ㅎ"})[0].eum.map(eum => {
                            return <Grid item xs={1} className="character-box2" onClick={() => props.filter(eum)}><h3>{eum}</h3></Grid>
                        })
                    }
                </Grid>
            </TabPanel>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        eumFilters : state.okpyeon.eumFilters,
    };
};

export default connect(mapStateToProps,{getEumFilters})(HangulFilterTable);
