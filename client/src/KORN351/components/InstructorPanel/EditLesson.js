import React, {Component} from "react";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import {getAboutNewBusu, getMainText, getNewHanjaCombos, getNewVocabulary} from "../../../actions/KORN351/Lessons";
import {saveMainText, saveExampleSentence, saveOthers, saveAboutNewBusu, saveNewPhonetic, saveNewHanjaCombo, saveSideBarVocab, deleteAboutNewBusu, deleteNewHanjaCombo, deleteNewPhonetic} from "../../../actions/KORN351/Instructor";
import "./EditLesson.css";
import Divider from "@material-ui/core/Divider/Divider";
import {getPhonetics} from "../../../actions/KORN351/Okpyeon";

class EditLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: 1,
            mainText: '',
            subText: '',
            exampleSentences: [],
            aboutNewBusu: [],
            phonetics: [],
            newHanjaCombos: [],
            newVocabMainText: [],
            newVocabExampleSentences: []
        };
    }

    componentWillMount() {
        let lesson = this.props.match.params.id;
        let mainText = '';
        let subText = '';
        let exampleSentences = [];

        if (this.props.mainText === '')
            this.props.getMainText(lesson).then(() => {
                this.setState({
                    lesson: lesson,
                    mainText: this.props.mainText,
                    subText: this.props.subText,
                    exampleSentences: this.props.exampleSentences
                });
            });
        else {
            mainText = this.props.mainText;
            subText = this.props.subText;
            exampleSentences = this.props.exampleSentences;
            this.setState({
                lesson: lesson,
                mainText: mainText,
                subText: subText,
                exampleSentences: exampleSentences
            });
        }

        if (this.props.aboutNewBusu.length === 0 || this.props.aboutNewBusu === undefined) {
            this.props.getAboutNewBusu().then(() => {

                    let temp = this.props.aboutNewBusu.filter(word => {
                        return word.lesson === lesson
                    });
                    this.setState({
                        aboutNewBusu: temp
                    })
                }
            );
        } else {
            this.setState({
                aboutNewBusu: this.props.aboutNewBusu
            });
        }

        //phonetics
        if (this.props.phonetics.length === 0 || this.props.phonetics === undefined) {
            this.props.getPhonetics().then(() => {

                    let temp = this.props.phonetics.filter(phonetic => {
                        return phonetic.lesson.toString() === lesson
                    });
                    this.setState({
                        phonetics: temp
                    })
                }
            );
        } else {
            this.setState({
                phonetics: this.props.phonetics
            });
        }

        //newHanjaCombos
        if (this.props.newHanjaCombos.length === 0 || this.props.newHanjaCombos === undefined) {
            this.props.getNewHanjaCombos().then(() => {

                    let temp = this.props.newHanjaCombos.filter(combo => {
                        return combo.lesson === lesson
                    });
                    this.setState({
                        newHanjaCombos: temp
                    })
                }
            );
        } else {
            this.setState({
                newHanjaCombos: this.props.newHanjaCombos
            });
        }

        //sidebar
        if (this.props.newVocab === '') {
            this.props.getNewVocabulary(lesson).then(() => {
                this.setState({
                    newVocabMainText: this.props.newVocab.mainText,
                    newVocabExampleSentences: this.props.newVocab.exSentences
                })
            })
        } else {
            this.setState({
                newVocabMainText: this.props.newVocab.mainText,
                newVocabExampleSentences: this.props.newVocab.exSentences
            })
        }
    }

    handleMainTextChange = event => {
        this.setState({
            subText: event.target.value
        });
    };

    saveMainText = () => {
        this.props.saveMainText(this.state.lesson, this.state.mainText);
    };

    saveOthers = () => {
        const subheading = this.subheading.value;
        const subcontent = this.subcontent.value;

        this.props.saveOthers(this.state.lesson, subheading, subcontent);
    };

    saveExSentence = (num) => {
        let sentencesString = this.state[num].value;
        let temp = sentencesString.split("\n");
        temp = temp.filter(sentence => {
            return sentence.trim() !== "";
        });

        let exampleSentences = this.state.exampleSentences;
        exampleSentences.forEach(sentence => {
            if (sentence.num === num) {
                sentence.sentences = temp;
            }
        });

        this.props.saveExampleSentence(this.state.lesson, exampleSentences);
    };

    saveNewBusu = (id) => {
        let characters = this.state[id].value.split("\n");
        characters = characters.filter(ex => {
            return ex.trim() !== "";
        });
        characters = characters.map(ex => {
            let temp = ex.split(":");
            return {
                word: temp[0].trim(),
                def: temp[1].trim()
            }
        });

        this.props.saveAboutNewBusu(this.state.lesson, id, this.state[id+'word'].value.trim(), this.state[id+'def'].value.trim(), this.state[id+'busu'].value.trim(), this.state[id+'desc'].value.trim(), characters);
    };

    deleteNewBusu = (id) => {
        this.props.deleteAboutNewBusu(this.state.lesson, id);
    };

    saveNewPhonetics = (id) => {
        let examples = this.state[id].value.split("\n");
        examples = examples.filter(ex => {
            return ex.trim() !== "";
        });

        let subPronunciation = [];
        let subCharacters = [];

        if (this.state[id+'sub-pronunciation'])
            subPronunciation = this.state[id+'sub-pronunciation'].value.trim();
        if (this.state[id + 'sub-characters']) {
            subCharacters = this.state[id+ 'sub-characters'].value.split("\n");
            subCharacters = subCharacters.filter(ex => {
                return ex.trim() !== "";
            });
        }
        this.props.saveNewPhonetic(this.state.lesson, id, this.state[id+'phonetic'].value.trim(), this.state[id+'pronunciation'].value.trim(), examples, subPronunciation, subCharacters);
    };
    deleteNewPhonetics = (id) => {
        this.props.deleteNewPhonetic(this.state.lesson, id);
    };

    saveNewHanjaCombo = (id) => {
        let hanja = this.state[id + 'hanja'].value.trim();
        let kor = this.state[id + 'kor'].value.trim();
        let eng = this.state[id + 'eng'].value.trim();

        this.props.saveNewHanjaCombo(this.state.lesson, id, hanja, kor, eng);
    };
    deleteNewHanjaCombo = (id) => {
        this.props.deleteNewHanjaCombo(this.state.lesson, id);
    };

    saveSideBarVocab = () => {
        let mainText = this.state['sidebar-mainText'].value.split("\n");
        mainText = mainText.filter(ex => {
            return ex.trim() !== "";
        });
        mainText = mainText.map(voc => {
            let temp = voc.split(":");
            return {
                kor: temp[0].trim(),
                eng: temp[1].trim()
            }
        });

        let exampleSentences = this.state['sidebar-exSent'].value.split("\n");
        exampleSentences = exampleSentences.filter(ex => {
            return ex.trim() !== "";
        });
        exampleSentences = exampleSentences.map(voc => {
            let temp = voc.split(":");
            return {
                kor: temp[0].trim(),
                eng: temp[1].trim()
            }
        });

        this.props.saveSideBarVocab(this.state.lesson, mainText, exampleSentences);
    };

    render() {
        const {mainText, subText, exampleSentences} = this.props;
        const {aboutNewBusu, phonetics, newHanjaCombos, lesson, newVocabMainText, newVocabExampleSentences} = this.state;

        let newVocabMainTextStr = '';
        newVocabMainText.forEach(vocab => {
            newVocabMainTextStr += vocab.kor + ' : ' + vocab.eng + '\n';
        });

        let newVocabExSentencesStr = '';
        newVocabExampleSentences.forEach(vocab => {
            newVocabExSentencesStr += vocab.kor + ' : ' + vocab.eng + '\n';
        });

        return (
            <div className="edit-lesson-container">
                <h1>Lesson {this.props.match.params.id}</h1>
                <br/><br/>
                <div className="edit-lesson-background">
                    <h2>Main Text & Example Sentences (& Others)</h2>
                    <Divider /><br/>
                    <div>
                        <h4>Main Text</h4>
                        <textarea name="main-text" style={{overflowWrap: 'break-word'}} value={this.state.mainText} rows="7" className="edit-input" onChange={this.handleMainTextChange}/>
                        <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%', textAlign: 'center'}} onClick={() => this.saveMainText()}>SAVE</Button>
                        <br/><br/>
                        <h4>Example Sentences</h4>
                        {this.state.exampleSentences.map((num) => {
                            let str = '';
                            num.sentences.forEach(sentence => {
                                str += sentence + '\n'
                            });
                            let unique = num.num;
                            return <div style={{padding: '0 5%'}}>
                                Num: {num.num}
                                <br/>
                                Sentences:
                                <textarea style={{overflowWrap: 'break-word'}} rows="5" className="edit-input" ref={input => this.state[unique] = input}>
                                    {str}
                                </textarea>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveExSentence(num.num)}>SAVE</Button>
                                <br/><br/>
                            </div>
                        })}
                        <br/><br/>
                        {
                            subText !== '' || subText !== null ?
                                <div>
                                    <h4>Others</h4>
                                    <div style={{padding: '0 5%'}}>
                                        Sub Heading:
                                        <input type="text" defaultValue={this.state.subText.subHeading} style={{width: '50%'}} ref={input => this.subheading = input}/><br/>
                                        Content:
                                        <textarea style={{overflowWrap: 'break-word'}} rows="5" className="edit-input" defaultValue={subText.content} ref={input => this.subcontent = input}/>
                                        <br/><br/>
                                    </div>
                                    <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveOthers()}>SAVE</Button>
                                </div> : ''
                        }
                        <br/><br/>
                        <h4>Side-bar Vocabulary</h4>
                        From Main Text:
                        <textarea style={{overflowWrap: 'break-word'}} rows="7" className="edit-input" defaultValue={newVocabMainTextStr} ref={input => this.state['sidebar-mainText'] = input}/>
                        <br/>
                        From Example Sentences:
                        <textarea style={{overflowWrap: 'break-word'}} rows="7" className="edit-input" defaultValue={newVocabExSentencesStr} ref={input => this.state['sidebar-exSent'] = input}/>
                        <br/>
                        <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveSideBarVocab()}>SAVE</Button>
                    </div>
                </div>
                <br/><br/>
                {/**<div className="edit-lesson-background">
                    <h2>새 한자</h2>
                    <Divider /><br/>

                </div>
                <br/><br/>**/}
                <div className="edit-lesson-background">
                    <h2>새 부수에 대하여</h2>
                    <Divider /><br/>
                    {
                        aboutNewBusu.map(busu => {
                            let str = '';
                            busu.examples.forEach(ex => {
                                str += ex.word + ':' + ex.def + '\n'
                            });

                            return <div>
                                Word:  <input type="text" defaultValue={busu.word} style={{width: '25%'}} ref={input => this.state[busu._id + 'word'] = input}/><br/>
                                Definition:  <input type="text" defaultValue={busu.def} style={{width: '25%'}} ref={input => this.state[busu._id + 'def'] = input}/><br/>
                                Busu:  <input type="text" defaultValue={busu.busu} style={{width: '25%'}} ref={input => this.state[busu._id + 'busu'] = input}/><br/>
                                Description: <input type="text" defaultValue={busu.description} style={{width: '100%'}} ref={input => this.state[busu._id + 'desc'] = input}/><br/>
                                Examples:
                                <textarea name="main-text" style={{overflowWrap: 'break-word'}} defaultValue={str} rows="7" className="edit-input" ref={input => this.state[busu._id] = input}/>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveNewBusu(busu._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.deleteNewBusu(busu._id)}>DELETE</Button>
                                <br/><br/><br/>
                            </div>
                        })
                    }
                </div>
                <br/><br/>
                <div className="edit-lesson-background">
                    <h2>About the New Phonetics</h2>
                    <Divider /><br/>
                    {
                        phonetics.map(phonetic => {
                            let str = '';
                            phonetic.characters.forEach(charac => {
                                str += charac + '\n';
                            });

                            let str2 = '';
                            if (phonetic.sub_pronunciation !== undefined) {
                                phonetic.sub_characters.forEach(charac => {
                                    str2 += charac + '\n';
                                })
                            }

                            return <div>
                                Phonetic:  <input type="text" defaultValue={phonetic.phonetic} style={{width: '25%'}} ref={input => this.state[phonetic._id + 'phonetic'] = input}/><br/>
                                Pronunciation:  <input type="text" defaultValue={phonetic.pronunciation} style={{width: '25%'}} ref={input => this.state[phonetic._id + 'pronunciation'] = input}/><br/>
                                Characters:
                                <textarea name="characters" style={{overflowWrap: 'break-word'}} defaultValue={str} rows="7" className="edit-input" ref={input => this.state[phonetic._id] = input}/>
                                {
                                    phonetic.sub_pronunciation?
                                        <div>
                                            Sub-Pronunciation: <input type="text" defaultValue={phonetic.sub_pronunciation} style={{width: '25%'}} ref={input => this.state[phonetic._id + 'sub-pronunciation'] = input}/><br/>
                                            Sub-Characters:
                                            <textarea name="main-text" style={{overflowWrap: 'break-word'}} defaultValue={str2} rows="7" className="edit-input" ref={input => this.state[phonetic._id + 'sub-characters'] = input}/>
                                        </div> : ''
                                }
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.saveNewPhonetics(phonetic._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} onClick={() => this.deleteNewPhonetics(phonetic._id)}>DELETE</Button>
                                <br/><br/><br/>
                            </div>
                        })
                    }
                </div>
                <br/><br/>
                <div className="edit-lesson-background">
                    <h2>New 한자 Combos</h2>
                    <Divider /><br/>
                    {
                        newHanjaCombos.map(combo => {
                            return <div style={{textAlign: 'center'}}>
                                Hanja:  <input type="text" defaultValue={combo.hanja} style={{width: '25%'}} ref={input => this.state[combo._id + 'hanja'] = input}/><br/>
                                Korean:  <input type="text" defaultValue={combo.kor} style={{width: '25%'}} ref={input => this.state[combo._id + 'kor'] = input}/><br/>
                                English:  <input type="text" defaultValue={combo.eng} style={{width: '25%'}} ref={input => this.state[combo._id + 'eng'] = input}/><br/>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '10%'}} onClick={() => this.saveNewHanjaCombo(combo._id)}>SAVE</Button>
                                <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '10%'}} onClick={() => this.deleteNewHanjaCombo(combo._id)}>DELETE</Button>
                                <br/><br/><br/>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mainText : state.lessons.mainText,
    subText : state.lessons.subText,
    exampleSentences: state.lessons.exampleSentences,
    aboutNewBusu : state.lessons.aboutNewBusu,
    phonetics : state.okpyeon.phonetics,
    newHanjaCombos : state.lessons.newHanjaCombos,
    newVocab : state.lessons.newVocabulary
});

const mapDispatchToProps = {
    getMainText,
    getAboutNewBusu,
    saveMainText,
    saveExampleSentence,
    saveOthers,
    saveAboutNewBusu,
    getPhonetics,
    saveNewPhonetic,
    getNewHanjaCombos,
    saveNewHanjaCombo,
    getNewVocabulary,
    saveSideBarVocab,
    deleteAboutNewBusu, deleteNewHanjaCombo, deleteNewPhonetic
};

export default connect( mapStateToProps, mapDispatchToProps )(EditLesson);