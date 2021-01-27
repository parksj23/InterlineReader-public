import React, { Component } from 'react';
import './OkpyeonRadicalContainer.css';
import HanziWriter from 'hanzi-writer';
import Grid from "@material-ui/core/Grid";
import HangulFilterTable from "../../components/Okpyeon/HangulFilterTable/HangulFilterTable";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {getCharacters, getPhonetics} from '../../actions/Okpyeon';

class DictionaryHangulContainer extends Component {
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
        if (this.props.characters.length === 0)
            this.props.getCharacters();
        if (this.props.phonetics.length === 0)
            this.props.getPhonetics();
    }

    filterResult = eum => {
        let temp = [];
        this.props.characters.forEach(char => {
            if (char.eum === eum) temp.push(char)
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

            <div style={{display: 'flex'}}>
                <div className="radical-filter-container">
                    <div className="radical-first-filter">
                        <p>1) Select a Hangul (as 음/音) to search by</p>
                        <HangulFilterTable filter={this.filterResult}/>
                    </div>
                    <div className="radical-second-filter">
                        <p>2) Select a character that uses that 음/音</p>
                        <Grid container>
                            {
                                filteredResult.map(char => {
                                    return <Grid item xs={3} className="character-box" onClick={() => this.selectCharacter(char.hanja, char)}> <span className="hanja">{char.hanja}</span><span className="hangul">{char.hoonEum}</span> </Grid>
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
                    <span id='result-info'>
                        <p><b>Radical:</b>&nbsp;&nbsp; {radical} {radicalHangul === ''? '' : '('+radicalHangul+')'}</p>
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
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        characters : state.okpyeon.characters,
        phonetics : state.okpyeon.phonetics
    };
};

export default connect(mapStateToProps, {getCharacters, getPhonetics})(DictionaryHangulContainer);
