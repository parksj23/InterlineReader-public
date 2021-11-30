import React, { Component } from 'react';
import './OkpyeonLessonContainer.css';
import HanziWriter from 'hanzi-writer';
import LessonFilterTable from "../../components/Okpyeon/LessonFilterTable/LessonFilterTable";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {getPhonetics} from '../../../actions/KORN351/Okpyeon';
import {getNewHanja} from "../../../actions/KORN351/Lessons";

class DictionaryLessonContainer extends Component {
    constructor() {
        super();
        this.state = {
            radical: '',
            radicalStrokeCount: '',
            totalStrokeCount: '',
            characterStrokeCount: '',
            meaning: '',
            hoonEum: '',
            primaryHoonMeaning: '',
            additionalHoonMeaning: '',
            radicalHangul: '',
            phonetic: ''
        }
    }

    componentDidMount() {
        if (this.props.newHanja.length === 0)
            this.props.getNewHanja();
        if (this.props.phonetics.length === 0)
            this.props.getPhonetics();
    }

    selectCharacter = (hanja, char) => {
        let temp = this.props.phonetics.filter(ph => {
            return ph.phonetic === char.phonetic
        });
        let temp2 = temp.length === 1? temp[0] : '';
        this.setState({ phonetic: temp2});
        this.showCharacterAnimation(hanja, char);
    };

    selectPhonetic = phonetic => {
        this.setState({ phonetic: phonetic});
        let temp = this.props.newHanja.filter(char => {
            return phonetic.phonetic === char.hanja
        });
        this.showCharacterAnimation(phonetic.phonetic, temp);
    };

    showCharacterAnimation = (hanja, char) => {
        document.getElementById("animation").innerHTML = `<div id="character-target-div"/>`;
        HanziWriter.create('character-target-div', hanja, {
            width: 100,
            height: 100,
            padding: 5,
            showOutline: true
        }).loopCharacterAnimation();

        if (char)
            this.setState({
                radical: char.radical,
                radicalStrokeCount: char.radicalStrokeCount,
                totalStrokeCount: char.totalStrokeCount,
                characterStrokeCount: char.characterStrokeCount,
                meaning: char.meaning,
                hoonEum: char.hoonEum,
                primaryHoonMeaning: char.primaryHoonMeaning,
                additionalHoonMeaning: char.additionalHoonMeaning,
                radicalHangul: char.radicalHangul
            })
    };

    render() {
        const {radical, radicalStrokeCount, totalStrokeCount, characterStrokeCount, meaning, hoonEum, primaryHoonMeaning, additionalHoonMeaning, radicalHangul, phonetic} = this.state;
        return(

            <div className="okpyeon-lesson-container">
                <LessonFilterTable showResult={this.selectCharacter} selectPhonetic={this.selectPhonetic}/>
                <div className="lesson-result">
                    <h3>Result:</h3>
                    <span id='animation' style={{textAlign: 'center'}}>
                        <div id="character-target-div"/>
                    </span>
                    <br/>
                    <span id='result-info'>
                        {
                            radical === '' || radical === undefined? '' :
                                <div>
                                    <div>
                                        <p><b>訓 (훈) + 音 (음):</b>&nbsp;&nbsp; {hoonEum}</p>
                                        <p style={{padding: '0 0 0 10%'}}><b>
                                            Primary 訓 meaning(s):</b>&nbsp;&nbsp; {primaryHoonMeaning}
                                        </p>
                                        <p style={{padding: '0 0 5% 10%'}}><b>
                                            Additional 訓:</b>&nbsp;&nbsp; {additionalHoonMeaning}
                                        </p>
                                    </div>
                                    <div>
                                        <p><b>Radical:</b>&nbsp;&nbsp; {radical} {radicalHangul === ''? '' : '('+radicalHangul+')'}</p>
                                        <p style={{padding: '0 0 0 10%'}}><b>Radical Meaning(s):</b> &nbsp;&nbsp;{meaning}</p>
                                        <p><b>Radical Stroke Count:</b> &nbsp;&nbsp; {radicalStrokeCount}</p>
                                        <p><b>Remainder Stroke Count:</b> &nbsp;&nbsp;{characterStrokeCount}</p>
                                        <p><b>Total Stroke Count:</b> &nbsp;&nbsp;{totalStrokeCount}</p>
                                    </div>
                                </div>
                        }
                        {
                            phonetic === '' || phonetic === undefined? '' :
                                <div>
                                    <br/>
                                    <Divider />
                                    <br/>
                                    <h3>Phonetic:</h3>
                                    <br/>
                                    <p>This character contains the phonetic element “ {phonetic.phonetic} ”. The phonetic element “ {phonetic.phonetic} ” indicates the following pronunciation(s):</p>
                                    <b>&nbsp;&nbsp;&nbsp;&nbsp;{phonetic.pronunciation}</b>
                                    <p>In the following Chinese character(s), the phonetic element “ {phonetic.phonetic} ” indicates the pronunciation  {phonetic.pronunciation} :</p>
                                    {phonetic.characters.map(charac => {return <span><b>&nbsp;&nbsp;&nbsp;&nbsp;{charac}</b></span>})}
                                </div>
                        }
                        {
                            (phonetic === '' || !phonetic.sub_pronunciation)? '' :
                                <div style={{color: 'darkred'}}>
                                    <br/>
                                    <p>Note that this phonetic can also be read as <b>{phonetic.sub_pronunciation}</b>:</p>
                                    {phonetic.sub_characters.map(charac => {return <span><b>&nbsp;&nbsp;&nbsp;&nbsp;{charac}</b></span>})}
                                </div>
                        }
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newHanja : state.lessons.newHanja,
        phonetics : state.okpyeon.phonetics
    };
};

export default connect(mapStateToProps, {getNewHanja, getPhonetics})(DictionaryLessonContainer);
