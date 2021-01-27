import React, {Component} from "react";
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import './AboutNewPhonetics.css';

class AboutNewPhonetics extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const currLesson = this.props.match.params.lesson;

        return (
            <div>Hello</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mainText : state.lessons.mainText,
        subText : state.lessons.subText,
        exampleSentences: state.lessons.exampleSentences
    };
};

export default withRouter(connect(mapStateToProps, {})(AboutNewPhonetics));