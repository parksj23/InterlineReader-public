import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    initStory
} from '../../../actions/KORN410/stories';
import EditStoryTable from './EditStoryTable'

const headers = [
    {
        label: "Lines (Click on the Pencil Icon to edit. You can only edit ONE row at a time.)",
        value: "text"
    }
];

class EditStory extends Component {
    constructor(props) {
        super();
        this.state={
            rowsKOR: [],
            rowsENG: []
        }
    }

    componentWillMount() {
        this.props.initStory(this.props.match.params.storyName).then(() => {
            let storyInfo = this.props.stories;
            let kor = [];
            let eng = [];

            storyInfo.MODKR.storyText.forEach(line => {
                kor.push({order_id: line.order_id, text: line.text, id: line._id})});
            storyInfo.ENGSH.storyText.forEach(line => {
                eng.push({order_id: line.order_id, text: line.text, id: line._id})});

            this.setState({
                rowsKOR: kor,
                rowsENG: eng
            });
        });
    }

    forceRefresh = () => {
        let storyInfo = this.props.stories;
        let kor = [];
        let eng = [];

        storyInfo.MODKR.storyText.forEach(line => {
            kor.push({order_id: line.order_id, text: line.text, id: line._id})});
        storyInfo.ENGSH.storyText.forEach(line => {
            eng.push({order_id: line.order_id, text: line.text, id: line._id})});

        this.setState({
            rowsKOR: kor,
            rowsENG: eng
        });
    };

    render() {
        const {rowsKOR, rowsENG} = this.state;

        return (
            <div>
                <h1 style={{padding: '2% 5%'}}>KOREAN</h1>
                <EditStoryTable
                    tableHeaders={headers}
                    list={rowsKOR}
                    storyName={this.props.match.params.storyName}
                    language="kor"
                    forceRefresh={this.forceRefresh}
                />

                <h1 style={{padding: '2% 5%'}}>ENGLISH</h1>
                <EditStoryTable
                    tableHeaders={headers}
                    list={rowsENG}
                    storyName={this.props.match.params.storyName}
                    language="eng"
                    forceRefresh={this.forceRefresh}
                />
                <br/><br/>
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
