import React, { Component } from 'react';
import './DictionaryRadicalContainer.css';
import RadicalFilterTable from '../components/RadicalFilterTable/RadicalFilterTable';
import data from '../components/RadicalFilterTable/charMockData';
import HanziWriter from 'hanzi-writer';
import Grid from "@material-ui/core/Grid";

class DictionaryRadicalContainer extends Component {
    constructor() {
        super();
        this.state = {
            filteredResult: []
        }
    }

    componentDidMount() {
        this.showCharacterAnimation();
    }

    filterResult = radical => {
        console.log(radical)
        let temp = [];
        data.forEach(char => {
            if (char.radical === radical) temp.push(char)
        });
        this.setState({
            filteredResult: temp
        })
    };

    showCharacterAnimation = hanja => {
        document.getElementById("animation").innerHTML = `<div id="character-target-div"/>`;
        HanziWriter.create('character-target-div', hanja, {
            width: 100,
            height: 100,
            padding: 5,
            showOutline: true
        }).loopCharacterAnimation();
    };

    render() {
        const {filteredResult} = this.state;
        return(

            <div style={{display: 'flex'}}>
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
                                    return <Grid item xs={3} className="character-box" onClick={() => this.showCharacterAnimation(char.hanja)}> <span className="hanja">{char.hanja}</span><span className="hangul">{char.hangul}</span> </Grid>
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className="radical-result">
                    <p>Result:</p>
                    <div id='animation'>
                        <div id="character-target-div"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DictionaryRadicalContainer;
