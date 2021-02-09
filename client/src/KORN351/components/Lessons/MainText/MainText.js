import React from 'react';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import './MainText.css';
import {connect} from "react-redux";
import {getMainText} from '../../../../actions/KORN351/MainText';
import img from './img.png';
import { withRouter } from 'react-router-dom';

const MainText = (props) => {
    const currLesson = props.match.params.lesson;
    const {mainText, subText, exampleSentences} = props;

    return (
        <Grid container>
            <Grid item md={1}/>
            <Grid item xs={12} md={10}>
                <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                    <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <span style={{textAlign: 'left', width: "50%"}}>
                              <h3> 제 {currLesson} 과</h3>
                            </span>
                    </div>
                    <Divider style={{marginBottom: "0.5rem"}}/>
                    <div className="main-text">
                        <img className="img" src={img}/>
                        <span className="text" dangerouslySetInnerHTML={{__html: mainText}}/>
                    </div>
                    <br/>
                    <div>
                        <b>From the Example Sentences:</b>
                        <br/>
                        <div style={{display: 'flex', width: '100%'}}>
                            {exampleSentences.map(obj => {
                                return <div style={{margin: '3%'}}><b>{obj.num}</b> <br/><br/> {obj.sentences.map(sentence => {return <p>{sentence}</p>})} <br/> </div>
                            })}
                        </div>
                    </div>
                    {
                        subText !== ''?
                            <div>
                                <b>{subText.subHeading}:</b>
                                <br/>
                                <div style={{margin: '3%'}}>
                                    {subText.content}
                                </div>
                            </div> : ''
                    }
                </div>
            </Grid>
        </Grid>
    )
};

const mapStateToProps = (state) => {
    return {
        mainText : state.lessons.mainText,
        subText : state.lessons.subText,
        exampleSentences: state.lessons.exampleSentences
    };
};

export default withRouter(connect(mapStateToProps, {getMainText})(MainText));
