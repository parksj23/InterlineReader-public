import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryList from '../Common/StoryList/StoryList'
import {Route, Switch } from 'react-router-dom';
import EditStory from './EditStory'


import{ getVocabulary, resetEditVocab } from "../../../actions/KORN410/instructor";

import Grid from '@material-ui/core/Grid'

class EditStoryContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentWillUnmount(){
    }

    renderStoryList = () => {
        return <StoryList storyList={this.props.storyLists.allStories} component={'editStory'}/>
    }

    render() {
        return (
            <div className="edit-Vocabulary-container">
                <Grid container>
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/instructor/editStory" component={this.renderStoryList} />
                            <Route path="/instructor/editStory/:storyName" component={EditStory} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    instructor: state.instructor,
    storyLists: state.app.storyLists
});

const mapDispatchToProps = ({
    getVocabulary,
    resetEditVocab
})

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryContainer);
