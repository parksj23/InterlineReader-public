import React, {Component} from "react";
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import MainText from "../../components/Lessons/MainText/MainText";
import {enableSideBarButton, resetSideBar} from '../../../actions/KORN410/sideBar';
import {disableSideBarButton} from '../../../actions/KORN410/dashboard';
import {getMainText} from '../../../actions/KORN351/MainText';
import './MainTextContainer.css';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import SideBarContainer from '../../components/sideBar/sideBarContainer';

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

    foo = () => {

    }

    componentWillUnmount() {
        this.props.resetSideBar();
        this.props.disableSideBarButton();
    }

    render() {
        const currLesson = this.props.match.params.lesson;

        return (
            this.props.mainText !== '' ?
                <div className={'story-container'}>
                    <div>
                        <SideBarContainer />
                    </div>
                    <MainText/>
                    <div className='translateContainer' >
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/new-hanja"}>
                            <Tooltip title="새 한자" placement="left" style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab" onClick={()=> this.foo()}>
                                    새 漢字
                                </Fab>
                            </Tooltip>
                        </Link>
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/new-busu"}>
                            <Tooltip title="새 부수" placement="left" style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab"  onClick={()=> this.foo()}>
                                    새 부수
                                </Fab>
                            </Tooltip>
                        </Link>
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/building-word-power"}>
                            <Tooltip title="Building Word Power with 漢字" placement="left" style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab" onClick={()=> this.foo()}>
                                    Word Power
                                </Fab>
                            </Tooltip>
                        </Link>
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/about-new-busu"}>
                            <Tooltip title="새 부수에 대하여" placement="left" onClick={()=> this.foo()} style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab">
                                    새 부수에 대하여
                                </Fab>
                            </Tooltip>
                        </Link>
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/about-new-phonetics"}>
                            <Tooltip title="About the New Phonetics" placement="left" onClick={() => this.foo()} style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab">
                                    New Phon.
                                </Fab>
                            </Tooltip>
                        </Link>
                        <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/new-hanja-combos"}>
                            <Tooltip title="New 한자 Combos" placement="left" style={{backgroundColor: '#00284d'}}>
                                <Fab color="primary" className="fab">
                                    漢字 Comb.
                                </Fab>
                            </Tooltip>
                        </Link>
                    </div>
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
