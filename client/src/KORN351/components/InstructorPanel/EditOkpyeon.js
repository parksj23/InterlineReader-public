import React, {Component} from "react";
import {connect} from "react-redux";
import "./EditLesson.css";
import Divider from "@material-ui/core/Divider/Divider";
import {getCharacters, getPhonetics, getRadicals} from "../../../actions/KORN351/Okpyeon";
import {
    saveCharacter, savePhonetic, saveRadical, deleteCharacter, deleteRadical, deletePhonetic
} from "../../../actions/KORN351/Instructor";
import Button from '@material-ui/core/Button';

class EditOkpyeon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radicals: [],
            characters: [],
            phonetics: []
        };
    }

    componentWillMount() {
        let lesson = parseInt(this.props.match.params.id);
        const {characters, phonetics, radicals} = this.props;

        if (radicals.length === 0) {
            this.props.getRadicals().then(() => {
                let temp = this.props.radicals.filter(char => {
                    return char.lesson === lesson
                });
                this.setState({
                    radicals: temp
                });
            });
        }

        if (characters.length === 0)
            this.props.getCharacters().then(() => {
                let temp = this.props.characters.filter(char => {
                    return char.lesson === lesson
                });
                this.setState({
                    characters: temp
                });
            });

        if (phonetics.length === 0)
            this.props.getPhonetics().then(() => {
                let temp = this.props.phonetics.filter(phonetic => {
                    return phonetic.lesson === lesson
                });
                this.setState({
                    phonetics: temp
                });
            });
    }

    saveHanjaCharacter = (id) => {
        let additionalHoonMeaning = this.state[id + 'additionalHoonMeaning']? this.state[id + 'additionalHoonMeaning'].value.trim() : '';
        let characterStrokeCount = parseInt(this.state[id + 'characterStrokeCount'].value.trim());
        let eum = this.state[id + 'eum'].value.trim();
        let hanja = this.state[id + 'hanja'].value.trim();
        let hoonEum = this.state[id + 'hoonEum'].value.trim();
        let meaning = this.state[id + 'meaning'].value.trim();
        let phonetic = this.state[id + 'phonetic']? this.state[id + 'phonetic'].value.trim(): '';
        let primaryHoonMeaning = this.state[id + 'primaryHoonMeaning']? this.state[id + 'primaryHoonMeaning'].value.trim(): '';
        let radical = this.state[id + 'radical'].value.trim();
        let radicalHangul = this.state[id + 'radicalHangul'].value.trim();
        let radicalStrokeCount = parseInt(this.state[id + 'radicalStrokeCount'].value.trim());
        let totalStrokeCount = parseInt(this.state[id + 'totalStrokeCount'].value.trim());

        this.props.saveCharacter(parseInt(this.props.match.params.id), id, additionalHoonMeaning, characterStrokeCount, eum, hanja, hoonEum, meaning, phonetic, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount);
    };
    deleteHanjaCharacter = (id) => {
        this.props.deleteCharacter(parseInt(this.props.match.params.id), id);
    };

    savePhonetic = (id) => {
        let characters = this.state[id + 'characters'].value.split("\n");
        characters = characters.filter(ex => {
            return ex.trim() !== "";
        });
        let phonetic = this.state[id + 'phonetic'].value.trim();
        let pronunciation = this.state[id + 'pronunciation'].value.trim();

        let sub_pronunciation = [];
        let sub_characters = [];

        if (this.state[id+'sub-pronunciation'])
            sub_pronunciation = this.state[id + 'sub-pronunciation'].value.trim();
        if (this.state[id+'sub-pronunciation']) {
            sub_characters = this.state[id + 'sub-characters'].value.split("\n");
            sub_characters = sub_characters.filter(ex => {
                return ex.trim() !== "";
            });
        }


        this.props.savePhonetic(parseInt(this.props.match.params.id), id, characters, phonetic, pronunciation, sub_pronunciation, sub_characters);
    };
    deletePhonetic = (id) => {
        this.props.deletePhonetic(parseInt(this.props.match.params.id), id);
    };

    saveRadical = (id) => {
        let additionalHoonMeaning = this.state[id + 'additionalHoonMeaning']? this.state[id + 'additionalHoonMeaning'].value.trim() : '';
        let characterStrokeCount = parseInt(this.state[id + 'characterStrokeCount'].value.trim());
        let hoonEum = this.state[id + 'hoonEum'].value.trim();
        let meaning = this.state[id + 'meaning'].value.trim();
        let primaryHoonMeaning = this.state[id + 'primaryHoonMeaning']? this.state[id + 'primaryHoonMeaning'].value.trim(): '';
        let radical = this.state[id + 'radical'].value.trim();
        let radicalHangul = this.state[id + 'radicalHangul'].value.trim();
        let radicalStrokeCount = parseInt(this.state[id + 'radicalStrokeCount'].value.trim());
        let totalStrokeCount = parseInt(this.state[id + 'totalStrokeCount'].value.trim());

        this.props.saveRadical(parseInt(this.props.match.params.id), id, additionalHoonMeaning, characterStrokeCount, hoonEum, meaning, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount);
    };
    deleteRadical = (id) => {
        this.props.deleteRadical(parseInt(this.props.match.params.id), id);
    };

    render() {
        const {characters, phonetics, radicals} = this.state;
        return (
            <div className="edit-lesson-container">
                <h1>Lesson {this.props.match.params.id}</h1>
                <br/><br/>
                <div className="edit-lesson-background">
                    <h2>Hanja Characters (For Lesson's '새 한자' section & Okpyeon)</h2>
                    <Divider /><br/>
                    <div style={{textAlign: 'center'}}>
                        {characters.map((char) => {
                            return <div style={{padding: '0 5%'}}>
                                Hanja: <input type="text" defaultValue={char.hanja} style={{width: '25%'}} ref={input => this.state[char._id + 'hanja'] = input}/>
                                <br/>
                                音 (음/Eum): <input type="text" defaultValue={char.eum} style={{width: '25%'}} ref={input => this.state[char._id + 'eum'] = input}/>
                                <br/>
                                Meaning: <input type="text" defaultValue={char.meaning} style={{width: '25%'}} ref={input => this.state[char._id + 'meaning'] = input}/>
                                <br/>
                                訓 (훈) + 音 (음): <input type="text" defaultValue={char.hoonEum} style={{width: '25%'}} ref={input => this.state[char._id + 'hoonEum'] = input}/>
                                <br/>
                                Primary 訓 (훈/Hoon) Meaning: <input type="text" defaultValue={char.primaryHoonMeaning} style={{width: '50%'}} ref={input => this.state[char._id + 'primaryHoonMeaning'] = input}/>
                                <br/>
                                Additional 訓 (훈/Hoon) Meaning: <input type="text" defaultValue={char.additionalHoonMeaning} style={{width: '50%'}} ref={input => this.state[char._id + 'additionalHoonMeaning'] = input}/>
                                <br/>
                                Phonetic: <input type="text" defaultValue={char.phonetic} style={{width: '25%'}} ref={input => this.state[char._id + 'phonetic'] = input}/>
                                <br/>
                                Radical: <input type="text" defaultValue={char.radical} style={{width: '25%'}} ref={input => this.state[char._id + 'radical'] = input}/>
                                <br/>
                                Radical Hangul: <input type="text" defaultValue={char.radicalHangul} style={{width: '25%'}} ref={input => this.state[char._id + 'radicalHangul'] = input}/>
                                <br/>
                                Radical Stroke Count: <input type="text" defaultValue={char.radicalStrokeCount} style={{width: '25%'}} ref={input => this.state[char._id + 'radicalStrokeCount'] = input}/>
                                <br/>
                                Character Stroke Count: <input type="text" defaultValue={char.characterStrokeCount} style={{width: '25%'}} ref={input => this.state[char._id + 'characterStrokeCount'] = input}/>
                                <br/>
                                Total Stroke Count (Character + Radical): <input type="text" defaultValue={char.totalStrokeCount} style={{width: '25%'}} ref={input => this.state[char._id + 'totalStrokeCount'] = input}/>
                                <br/><br/>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveHanjaCharacter(char._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.deleteHanjaCharacter(char._id)}>DELETE</Button>
                                <br/><br/><br/><br/>
                            </div>
                        })

                        }
                    </div>
                </div>
                <br/><br/>

                <div className="edit-lesson-background">
                    <h2>Phonetics (For Lesson's '새 부수' section & Okpyeon)</h2>
                    <Divider /><br/>
                    <div>
                        {phonetics.map((phon) => {
                            let str = '';
                            phon.characters.forEach(char => {
                                str += char + '\n'
                            });

                            let str2 = '';
                            if (phon.sub_pronunciation !== undefined) {
                                phon.sub_characters.forEach(charac => {
                                    str2 += charac + '\n';
                                })
                            }

                            return <div style={{padding: '0 5%'}}>
                                Phonetic: <input type="text" defaultValue={phon.phonetic} style={{width: '25%'}} ref={input => this.state[phon._id + 'phonetic'] = input}/>
                                <br/>
                                Characters:
                                <textarea style={{overflowWrap: 'break-word'}} rows="5" className="edit-input" ref={input => this.state[phon._id + 'characters'] = input}>
                                    {str}
                                </textarea>
                                <br/>
                                Pronunciation: <input type="text" defaultValue={phon.pronunciation} style={{width: '25%'}} ref={input => this.state[phon._id + 'pronunciation'] = input}/>
                                <br/>
                                {
                                    phon.sub_pronunciation?
                                        <div>
                                            Sub-Pronunciation: <input type="text" defaultValue={phon.sub_pronunciation} style={{width: '25%'}} ref={input => this.state[phon._id + 'sub-pronunciation'] = input}/><br/>
                                            Sub-Characters:
                                            <textarea name="main-text" style={{overflowWrap: 'break-word'}} defaultValue={str2} rows="7" className="edit-input" ref={input => this.state[phon._id + 'sub-characters'] = input}/>
                                        </div> : ''
                                }
                                <br/>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.savePhonetic(phon._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.deletePhonetic(phon._id)}>DELETE</Button>
                                <br/><br/><br/>
                            </div>
                        })

                        }
                    </div>
                </div>
                <br/><br/>

                <div className="edit-lesson-background">
                    <h2>Radicals (For Okpyeon)</h2>
                    <Divider /><br/>
                    <div style={{textAlign: 'center'}}>
                        {radicals.map((rad) => {
                            return <div style={{padding: '0 5%'}}>
                                Radical: <input type="text" defaultValue={rad.radical} style={{width: '25%'}} ref={input => this.state[rad._id + 'radical'] = input}/>
                                <br/>
                                Radical Hangul: <input type="text" defaultValue={rad.radicalHangul} style={{width: '25%'}} ref={input => this.state[rad._id + 'radicalHangul'] = input}/>
                                <br/>
                                Meaning: <input type="text" defaultValue={rad.meaning} style={{width: '25%'}} ref={input => this.state[rad._id + 'meaning'] = input}/>
                                <br/>
                                訓 (훈) + 音 (음): <input type="text" defaultValue={rad.hoonEum} style={{width: '25%'}} ref={input => this.state[rad._id + 'hoonEum'] = input}/>
                                <br/>
                                Primary 訓 (훈/Hoon) Meaning: <input type="text" defaultValue={rad.primaryHoonMeaning} style={{width: '50%'}} ref={input => this.state[rad._id + 'primaryHoonMeaning'] = input}/>
                                <br/>
                                Additional 訓 (훈/Hoon) Meaning: <input type="text" defaultValue={rad.additionalHoonMeaning} style={{width: '50%'}} ref={input => this.state[rad._id + 'additionalHoonMeaning'] = input}/>
                                <br/>
                                Radical Stroke Count: <input type="text" defaultValue={rad.radicalStrokeCount} style={{width: '25%'}} ref={input => this.state[rad._id + 'radicalStrokeCount'] = input}/>
                                <br/>
                                Character Stroke Count: <input type="text" defaultValue={rad.characterStrokeCount} style={{width: '25%'}} ref={input => this.state[rad._id + 'characterStrokeCount'] = input}/>
                                <br/>
                                Total Stroke Count (Character + Radical): <input type="text" defaultValue={rad.totalStrokeCount} style={{width: '25%'}} ref={input => this.state[rad._id + 'totalStrokeCount'] = input}/>
                                <br/><br/>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveRadical(rad._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.deleteRadical(rad._id)}>DELETE</Button>
                                <br/><br/><br/><br/>
                            </div>
                        })

                        }
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    radicals : state.okpyeon.radicals,
    phonetics: state.okpyeon.phonetics,
    characters: state.okpyeon.characters
});

const mapDispatchToProps = {
    getRadicals,
    getPhonetics,
    getCharacters,
    saveCharacter,
    saveRadical,
    savePhonetic,deleteCharacter, deleteRadical, deletePhonetic
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOkpyeon);
