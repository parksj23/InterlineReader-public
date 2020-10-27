import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    initStory
} from '../../../actions/stories';

class EditStory extends Component {
    constructor(props) {
        super();
        this.state={
        }
    }

    componentWillMount() {
        this.props.initStory(this.props.match.params.storyName)
    }

    render() {
        console.log(this.props.stories)
        const {stories} = this.props;
        return (
            <div>
                hi
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stories: state.stories
});

const mapDispatchToProps = ({
    initStory
})

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);
