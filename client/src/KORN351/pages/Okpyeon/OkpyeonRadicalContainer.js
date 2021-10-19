import React, { Component } from 'react';
import './OkpyeonRadicalContainer.css';
import RadicalFilterTable from '../../components/Okpyeon/RadicalFilterTable/RadicalFilterTable';
import HanziWriter from 'hanzi-writer';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {getPhonetics} from '../../../actions/KORN351/Okpyeon';
import {getNewHanja} from "../../../actions/KORN351/Lessons";

class DictionaryRadicalContainer extends Component {
    constructor() {
        super();
        this.state = {
            filteredResult: [],
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

    filterResult = radical => {
        let temp = [];
        this.props.newHanja.forEach(char => {
            if (char.radical === radical) temp.push(char)
        });
        this.setState({
            filteredResult: temp
        })
    };

    selectCharacter = (hanja, char) => {
        let temp = this.props.phonetics.filter(ph => {
            return ph.phonetic === char.phonetic
        });
        let temp2 = temp.length === 1? temp[0] : '';
        this.setState({ phonetic: temp2});
        this.showCharacterAnimation(hanja, char);
    };

    showCharacterAnimation = (hanja, char) => {
        document.getElementById("animation").innerHTML = `<div id="character-target-div"/>`;
        HanziWriter.create('character-target-div', hanja, {
            width: 100,
            height: 100,
            padding: 5,
            showOutline: true
        }).loopCharacterAnimation();

        if (char !== undefined)
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
        const {filteredResult, radical, radicalStrokeCount, totalStrokeCount, characterStrokeCount, meaning, hoonEum, primaryHoonMeaning, additionalHoonMeaning, radicalHangul, phonetic} = this.state;
        return(

            <div className="okpyeon-radical-container">
                <div className="radical-filter-container">
                    <div className="radical-first-filter">
                        <p>1) Select a radical to search by</p>
                        <RadicalFilterTable filter={this.filterResult}/>
                    </div>
                    <div className="radical-second-filter">
                        <p>2) Select a character that uses that radical</p>
                        <Grid container>
                            {
                                filteredResult.map(char => {
                                    return <Grid key={char} item xs={3} className="character-box" onClick={() => this.selectCharacter(char.hanja, char)}> <span className="hanja">{char.hanja}</span><span className="hangul">{char.hoonEum}</span> </Grid>
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className="radical-result">
                    <h3>Result:</h3>
                    <span id='animation' style={{textAlign: 'center'}}>
                        <div id="character-target-div"/>
                    </span>
                    <br/>
                    <div id='result-info'>
                        <p><b>Radical:</b>&nbsp;&nbsp; {radical} {radicalHangul === '' || radicalHangul === undefined? '' : '('+radicalHangul+')'}</p>
                        <p><b>Radical Stroke Count:</b> &nbsp;&nbsp; {radicalStrokeCount}</p>
                        <p><b>Character Stroke Count:</b> &nbsp;&nbsp;{characterStrokeCount}</p>
                        <p><b>Total Stroke Count:</b> &nbsp;&nbsp;{totalStrokeCount}</p>
                        <p><b>Meaning(s):</b> &nbsp;&nbsp;{meaning}</p>
                        <p><b>訓 (훈) + 音 (음):</b>&nbsp;&nbsp; {hoonEum}</p>
                        <p><b>Primary 訓 meaning(s):</b>&nbsp;&nbsp; {primaryHoonMeaning}</p>
                        <p><b>Additional 訓:</b>&nbsp;&nbsp; {additionalHoonMeaning}</p>
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
                    </div>
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

export default connect(mapStateToProps, {getNewHanja, getPhonetics})(DictionaryRadicalContainer);
