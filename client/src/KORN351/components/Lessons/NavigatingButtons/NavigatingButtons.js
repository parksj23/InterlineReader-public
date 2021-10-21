import React from "react";
import { Link, withRouter } from 'react-router-dom';
import './NavigatingButtons.css';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const NavigatingButtons = (props) => {

    const currLesson = props.match.params.lesson;

    return (
        <div className='translateContainer' >
            <Link to={"/dashboard/KORN351/lesson/" + currLesson}>
                <Tooltip title="Back to story" placement="left" style={{backgroundColor: '#00284d'}}>
                    <Fab color="primary" className="fab">
                        Story
                    </Fab>
                </Tooltip>
            </Link>
            <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/new-hanja"}>
                <Tooltip title="새 한자" placement="left" style={{backgroundColor: '#00284d'}}>
                    <Fab color="primary" className="fab">
                        새 漢字
                    </Fab>
                </Tooltip>
            </Link>
            <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/new-busu"}>
                <Tooltip title="새 부수" placement="left" style={{backgroundColor: '#00284d'}}>
                    <Fab color="primary" className="fab">
                        새 부수
                    </Fab>
                </Tooltip>
            </Link>
            <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/building-word-power"}>
                <Tooltip title="Building Word Power with 漢字" placement="left" style={{backgroundColor: '#00284d'}}>
                    <Fab color="primary" className="fab">
                        Word Power
                    </Fab>
                </Tooltip>
            </Link>
            <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/about-new-busu"}>
                <Tooltip title="새 부수에 대하여" placement="left" style={{backgroundColor: '#00284d'}}>
                    <Fab color="primary" className="fab">
                        새 부수에 대하여
                    </Fab>
                </Tooltip>
            </Link>
            <Link to={"/dashboard/KORN351/lesson/" + currLesson + "/about-new-phonetics"}>
                <Tooltip title="About the New Phonetics" placement="left" style={{backgroundColor: '#00284d'}}>
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
    )
};

export default withRouter(NavigatingButtons);
