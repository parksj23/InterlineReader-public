import React, { Component } from 'react';
import './DictionaryRadicalContainer.css';
import data from '../charMockData';
import HanziWriter from 'hanzi-writer';
import Grid from "@material-ui/core/Grid";
import HangulFilterTable from "../components/Dictionary/HangulFilterTable/HangulFilterTable";

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
            additionalHoonMeaning: ''
        }
    }

    componentDidMount() {
        this.showCharacterAnimation();
    }

    filterResult = eum => {
        let temp = [];
        data.forEach(char => {
            if (char.eum === eum) temp.push(char)
        });
        this.setState({
            filteredResult: temp
        })
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
                additionalHoonMeaning: char.additionalHoonMeaning
            })
    };

    render() {
        const {filteredResult, radical, radicalStrokeCount, totalStrokeCount, characterStrokeCount, meaning, hoonEum, primaryHoonMeaning, additionalHoonMeaning} = this.state;
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
                                    return <Grid item xs={3} className="character-box" onClick={() => this.showCharacterAnimation(char.hanja, char)}> <span className="hanja">{char.hanja}</span><span className="hangul">{char.hangul}</span> </Grid>
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
                        <p><b>Radical:</b>&nbsp;&nbsp; {radical}</p>
                        <p><b>Radical Stroke Count:</b> &nbsp;&nbsp; {radicalStrokeCount}</p>
                        <p><b>Character Stroke Count:</b> &nbsp;&nbsp;{characterStrokeCount}</p>
                        <p><b>Total Stroke Count:</b> &nbsp;&nbsp;{totalStrokeCount}</p>
                        <p><b>Meaning(s):</b> &nbsp;&nbsp;{meaning}</p>
                        <p><b>訓 (훈) + 音 (음):</b>&nbsp;&nbsp; {hoonEum}</p>
                        <p><b>Primary 訓 meaning(s):</b>&nbsp;&nbsp; {primaryHoonMeaning}</p>
                        <p><b>Additional 訓:</b>&nbsp;&nbsp; {additionalHoonMeaning}</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default DictionaryHangulContainer;
