import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    initStory
} from '../../../actions/stories';
import EditStoryTable from './EditStoryTable'

const headers = [
    {
        label: "Lines (Double-click to Edit)",
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

    render() {
        const {rowsKOR, rowsENG} = this.state;

        return (
            <div>
                <h1 style={{padding: '2% 5%'}}>KOREAN</h1>
                <EditStoryTable
                    tableHeaders={headers}
                    list={rowsKOR}/>

                <h1 style={{padding: '2% 5%'}}>ENGLISH</h1>
                <EditStoryTable
                    tableHeaders={headers}
                    list={rowsENG}/>
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
