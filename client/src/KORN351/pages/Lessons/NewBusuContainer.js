import "./NewHanjaContainer.css";

import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import HanziWriter from "hanzi-writer";
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {connect} from "react-redux";
import {getNewBusu} from "../../../actions/KORN351/Okpyeon";
import { withRouter } from 'react-router-dom';
import Divider from "@material-ui/core/Divider";

class NewBusuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBusu: [],
            currentLesson: this.props.match.params.lesson
        };
    }

    componentWillMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }

      if (this.props.newBusu.length === 0 || this.props.newBusu === undefined) {
          this.props.getNewBusu().then(() => {
                  const currLesson = this.props.match.params.lesson;

                  let temp = this.props.newBusu.filter(word => {
                      return word.lesson === parseInt(currLesson)
                  });

                  this.setState({
                      newBusu: temp
                  }, () => {
                      //moved contents inside componentDidMount to here
                      this.state.newBusu.forEach((pair, idx) => {
                          this.showHanjiAnimation(pair.radical, idx)
                      });
                      if (this.state.newBusu.length === 0) {
                          const currLesson = this.props.match.params.lesson;

                          let temp = this.props.newBusu.filter(word => {
                              return word.lesson === parseInt(currLesson)
                          });
                          this.setState({
                              newBusu: temp
                          });
                      }
                  })
              }
          );
      }
    }

    showHanjiAnimation = (hanja, idx) => {
        HanziWriter.create("character-target-div-"+idx, hanja, {
            width: 100,
            height: 100,
            padding: 5,
            showOutline: true,
        }).loopCharacterAnimation()
    };

    render() {
      const {newBusu} = this.state;
        return (
            <div style={{ display: "flex" }}>
                <div className="new-hanja">
                    <h3 style={{ paddingBottom: 10 }}>새 부수</h3>
                    <div>
                        <h4 style={{textAlign: 'left', width: "50%"}}>
                            제 {this.state.currentLesson} 과
                        </h4>
                    </div>
                    <Divider style={{marginBottom: "0.5rem"}}/>
                    <br/>
                    <Grid container spacing={1} className="new-hanja-con">
                        {newBusu.map((char, idx) => {
                            return (
                                <Grid
                                    item
                                    xs={4}
                                    className="new-hanja-box"
                                >
                                    <div className="new-hanja-char" style={{ textAlign: "center" }}>
                                        <br />
                                        <div id={"character-target-div-"+idx}/>
                                        <br />
                                    </div>
                                    <div className="new-hanja-card">
                                        <p>
                                            <b>訓 (훈) + 音 (음):</b>&nbsp;&nbsp; {char.hoonEum}
                                        </p>
                                        <p>
                                            <b>뜻 Meaning(s):</b> &nbsp;&nbsp;
                                            {char.meaning}
                                        </p>
                                        <p>
                                            <b>총획수 Total Stroke Count:</b> &nbsp;&nbsp;
                                            {char.totalStrokeCount}
                                        </p>
                                        <p>
                                            <b>부수 Radical:</b>&nbsp;&nbsp; {char.radical}&nbsp;<b>(제부수)</b>
                                        </p>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <br />
                    <Grid container className="root">
                        <Grid item xs={6}>
              <span id="animation" style={{ textAlign: "center" }}>
                <div id="character-target-div" />
              </span>
                        </Grid>
                    </Grid>
                </div>
                <NavigatingButtons />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      newBusu : state.okpyeon.newBusu
  };
};

export default withRouter(connect(mapStateToProps, {getNewBusu})(NewBusuContainer));