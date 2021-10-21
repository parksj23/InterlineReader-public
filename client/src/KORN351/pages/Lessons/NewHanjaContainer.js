import "./NewHanjaContainer.css";

import React, {Component} from "react";

import Grid from "@material-ui/core/Grid";
import HanziWriter from "hanzi-writer";
import {connect} from "react-redux";
import {getNewHanja} from "../../../actions/KORN351/Lessons";
import {withRouter} from 'react-router-dom';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import Divider from "@material-ui/core/Divider";

class NewHanjaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHanja: [],
            currentLesson: this.props.match.params.lesson
        };
    }

    componentWillMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }

        if (this.props.newHanja.length === 0 || this.props.newHanja === undefined) {
            this.props.getNewHanja().then(() => {
                const currLesson = this.props.match.params.lesson;

                    let temp = this.props.newHanja.filter(word => {
                        return word.lesson === parseInt(currLesson)
                    });

                    this.setState({
                        newHanja: temp
                    }, () => {
                        //moved contents inside componentDidMount to here
                        this.state.newHanja.forEach((pair, idx) => {
                            this.showHanjiAnimation(pair.hanja, idx)
                        });
                        if (this.state.newHanja.length === 0) {
                            const currLesson = this.props.match.params.lesson;

                            let temp = this.props.newHanja.filter(word => {
                                return word.lesson === parseInt(currLesson)
                            });
                            this.setState({
                                newHanja: temp
                            });
                        }
                    })
                }
            );
        }
    }

    showHanjiAnimation = (hanja, idx) => {
        HanziWriter.create("character-target-div-" + idx, hanja, {
            width: 100,
            height: 100,
            padding: 5,
            showOutline: true,
        }).loopCharacterAnimation()
    };

    render() {
        const {newHanja} = this.state;
        console.log(this.state.newHanja);
        return (
            <div style={{display: "flex"}}>
                <div className="new-hanja">
                    <h3 style={{paddingBottom: 10}}>새 한자</h3>
                    <div>
                        <h4 style={{textAlign: 'left', width: "50%"}}>
                            제 {this.state.currentLesson} 과
                        </h4>
                    </div>
                    <Divider style={{marginBottom: "0.5rem"}}/>
                    <br/>
                    <Grid container spacing={1} className="new-hanja-con">
                        {newHanja.map((char, idx) => {
                            return (
                                <Grid
                                    item
                                    xs={4}
                                    className="new-hanja-box"
                                    key={idx}
                                >
                                    <div className="new-hanja-char" style={{textAlign: "center"}}>
                                        <br/>
                                        <div id={"character-target-div-" + idx}/>
                                        <br/>
                                    </div>
                                    <div className="new-hanja-card">
                                        <p>
                                            <b>訓 (훈) + 音 (음):</b>&nbsp;&nbsp; {char.hoonEum}
                                        </p>
                                        <p>
                                            <b>Meaning(s):</b> &nbsp;&nbsp;
                                            {char.meaning}
                                        </p>
                                        <p>
                                            <b>Total Stroke Count:</b> &nbsp;&nbsp;
                                            {char.totalStrokeCount}
                                        </p>
                                        <p>
                                            <b>Radical:</b>&nbsp;&nbsp; {char.radical}
                                        </p>
                                        <p>
                                            <b>Radical Meaning:</b>&nbsp;&nbsp; {char.radicalMeaning}
                                        </p>
                                        <p>
                                            <b>Radical Stroke Count:</b> &nbsp;&nbsp;{" "}
                                            {char.radicalStrokeCount}
                                        </p>
                                        <p>
                                            <b>Phonetic:</b>&nbsp;&nbsp; {char.phonetic}
                                        </p>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <br/>
                    <Grid container className="root">
                        <Grid item xs={6}>
              <span id="animation" style={{textAlign: "center"}}>
                <div id="character-target-div"/>
              </span>
                        </Grid>
                    </Grid>
                </div>
                <NavigatingButtons/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newHanja: state.lessons.newHanja
    };
};

export default withRouter(connect(mapStateToProps, {getNewHanja})(NewHanjaContainer));