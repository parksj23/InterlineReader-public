import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import './AboutNewPhonetics.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";

class AboutNewPhonetics extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                Hello
                <NavigatingButtons />
            </div>
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