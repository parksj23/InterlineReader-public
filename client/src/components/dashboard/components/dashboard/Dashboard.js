import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import ClassCard from '../classCard';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';
import './Dashboard.css';

const styles = {
    cardContainer: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: " 0.4rem",
        paddingRight: "3rem"
    }
}

class Dashboard extends Component {

    componentWillMount(){
    }

    renderClassStories = (aStory, classIndex) => {
        const {classes} = this.props
        return (
            <Grid
                classes={{
                    item: classes.cardContainer
                }}
                item xs={4} key={'story_badge' + classIndex}>
                {
                    <ClassCard story={aStory} style={{width: "100%"}}/>
                }
            </Grid>
        )
    }

    render() {
        const {storyList} = this.props;
        return (
            <div className="dashboard">
                <div className="instructor-heading" style={{marginBottom: '1%'}}>
                    <h2 style={{fontWeight: 'bold'}}>KORN 410 : Dashboard</h2>
                    <p>Click on any of the KORN 410 stories below to read a story, go over flashcards, and to select vocabularies and grammars to save.</p>
                </div>
                <div style={{top: "40vh", left: "45%", position: "absolute", display: "flex"}}>
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#36D7B7'}
                        loading={this.props.dashboard.isDashboardLoading}
                    />
                </div>
                { <Grid className="ir-Dashboard-gridContainer" container >
                    {storyList ? storyList.map((aClass,classIndex) => {
                        return this.renderClassStories(aClass, classIndex)
                    }): null}
                </Grid> }
            </div>
        );
    }
}

Dashboard.propTypes = {
    //deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
