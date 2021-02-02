import React, {Component} from "react";
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import MainText from "../../components/Lessons/MainText/MainText";
import {enableSideBarButton, resetSideBar} from '../../../actions/KORN410/sideBar';
import {disableSideBarButton} from '../../../actions/KORN410/dashboard';
import {getMainText} from '../../../actions/KORN351/MainText';
import '../../components/Lessons/NavigatingButtons/NavigatingButtons.css';
import SideBarContainer from '../../components/sideBar/sideBarContainer';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";

class MainTextContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillMount() {
        const currLesson = this.props.match.params.lesson;
        this.props.getMainText(currLesson);
    }

    componentDidMount() {
        this.props.enableSideBarButton();
    }

    componentWillUnmount() {
        this.props.resetSideBar();
        this.props.disableSideBarButton();
    }

    render() {
        return (
            this.props.mainText !== '' ?
                <div className={'story-container'}>
                    <SideBarContainer />
                    <MainText/>
                    <NavigatingButtons />
                </div>
                :
                <div style={{position: 'relative', padding: '17%'}}>
                    <h3 style={{position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%,-50%)'}}>Loading Story . . .</h3>
                    <LinearProgress style={{width: '50%', position: 'absolute', left: '50%', transform: 'translate(-50%,1500%)'}}/>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mainText : state.lessons.mainText,
        subText : state.lessons.subText,
        exampleSentences: state.lessons.exampleSentences
    };
};

export default withRouter(connect(mapStateToProps, {getMainText, enableSideBarButton, resetSideBar, disableSideBarButton})(MainTextContainer));
