import React, { useState } from 'react';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import './MainText.css';
import {connect} from "react-redux";
import {getMainText} from '../../../../actions/KORN351/Lessons';
import img1 from './1.png';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import img6 from './6.png';
import img7 from './7.png';
import img8 from './8.png';
import img9 from './9.png';
import img11 from './11.png';
import img12 from './12.png';
import img13 from './13.png';
import img14 from './14.png';
import img16 from './16.png';
import img17 from './17.png';
import img18 from './18.png';
import img19 from './19.png';

import { withRouter } from 'react-router-dom';
import { Switch } from '@material-ui/core';

const MainText = (props) => {
    const [currentText, switchText] = useState('mainText');
    const currLesson = props.match.params.lesson;
    const {mainText, subText, exampleSentences, koreanText} = props;
    let image = img1;
    if (currLesson === "2")
        image = img2;
    if (currLesson === "3")
        image = img3;
    if (currLesson === "4")
        image = img4;
    if (currLesson === "6")
        image = img6;
    if (currLesson === "7")
        image = img7;
    if (currLesson === "8")
        image = img8;
    if (currLesson === "9")
        image = img9;
    if (currLesson === "11")
        image = img11;
    if (currLesson === "12")
        image = img12;
    if (currLesson === "13")
        image = img13;
    if (currLesson === "14")
        image = img14;
    if (currLesson === "16")
        image = img16;
    if (currLesson === "17")
        image = img17;
    if (currLesson === "18")
        image = img18;
    if (currLesson === "19")
        image = img19;
    if (currLesson === "5" || currLesson === "10" || currLesson === "15")
        image = "";

    // https://stackoverflow.com/questions/46534376/javascript-convert-arabic-numerals-to-chinese-characters
    // Accessed Oct 17, 2021
    function toChineseNumber(n) {
        if (!Number.isInteger(n) && n < 0) {
            throw Error('请输入自然数');
        }

        const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const positions = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
        const charArray = String(n).split('');
        let result = '';
        let prevIsZero = false;
        //处理0  deal zero
        for (let i = 0; i < charArray.length; i++) {
            const ch = charArray[i];
            if (ch !== '0' && !prevIsZero) {
                result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
            } else if (ch === '0') {
                prevIsZero = true;
            } else if (ch !== '0' && prevIsZero) {
                result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
            }
        }
        //处理十 deal ten
        if (n < 100) {
            result = result.replace('一十', '十');
        }
        return result;
    }


    return (
        <Grid container>
            <Grid item md={1}/>
            <Grid item xs={12} md={10}>
                <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                    <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                第 {toChineseNumber(currLesson)} 課
                            </h3>
                    </div>
                    <Divider style={{marginBottom: "0.5rem"}}/>
                    <div className="main-text">
                        <img className="img" src={image}/>
                        <div>
                            <div style={{marginLeft: 500}}>
                                <Switch
                                    color="success"
                                    checked={currentText !== 'mainText'}
                                    onChange={() => currentText === 'mainText' ? switchText('koreanText') : switchText('mainText')}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            <br/>
                            <span className="text" dangerouslySetInnerHTML={{__html: currentText === 'mainText' ? mainText : koreanText}}/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <b>From the Example Sentences:</b>
                        <br/>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            {exampleSentences.map(obj => {
                                return <div style={{marginTop: 14}}><b>{obj.num}</b> <br/><br/> {obj.sentences.map(sentence => {return <p>{sentence}</p>})} <br/> </div>
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
