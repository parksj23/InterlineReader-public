import React, {Component} from "react";
import {connect} from "react-redux";
import "./EditLesson.css";
import Divider from "@material-ui/core/Divider/Divider";
import {getPhonetics, getRadicals} from "../../../actions/KORN351/Okpyeon";
import {
    saveHanjaCharacter, savePhonetic, saveRadical, deleteHanjaCharacter, deleteRadical, deletePhonetic
} from "../../../actions/KORN351/Instructor";
import { getNewHanja } from "../../../actions/KORN351/Lessons";
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Modal, Box, Button, Tab, Tabs, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";

class EditOkpyeon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radicals: [],
            newHanja: [],
            phonetics: [],
            isPhoneticModalOpen: false,
            newPhonetic: {},
            isRadicalModalOpen: false,
            newRadical: {},
            isHanjaAddModalOpen: false,
            newHanjaChar: {}
        };

        this.lesson = parseInt(this.props.match.params.id);
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }

        this.setState({tabValue: 0});

        const {newHanja, phonetics, radicals} = this.props;

        if (radicals.length === 0) {
            this.props.getRadicals().then(() => {
                let temp = this.props.radicals.filter(char => {
                    return char.lesson === this.lesson
                });
                this.setState({
                    radicals: temp
                });
            });
        }

        if (newHanja.length === 0)
            this.props.getNewHanja().then(() => {
                let temp = this.props.newHanja.filter(char => {
                    return char.lesson === this.lesson
                });

                this.setState({
                    newHanja: temp
                });
            });

        if (phonetics.length === 0)
            this.props.getPhonetics().then(() => {
                let temp = this.props.phonetics.filter(phonetic => {
                    return phonetic.lesson === this.lesson
                });
                this.setState({
                    phonetics: temp
                });
            });
    }

    createHanjaChar = () => {
        const { newHanjaChar } = this.state;
        newHanjaChar.lesson = this.lesson;
        axios({
            method: 'POST',
            data: newHanjaChar,
            url: '/api/instructor351/addHanjaCharacter'
        }).then(res => {
            newHanjaChar._id = res.data;
            this.setState(prevState => ({ newHanja: [newHanjaChar, ...prevState.newHanja] }));
            this.onHanjaAddModalToggle();
        });
    }

    saveHanjaCharacter = (id) => {
        let additionalHoonMeaning = this.state[id + 'additionalHoonMeaning'] ? this.state[id + 'additionalHoonMeaning'].value.trim() : '';
        let characterStrokeCount = parseInt(this.state[id + 'characterStrokeCount'].value.trim());
        let eum = this.state[id + 'eum'].value.trim();
        let hanja = this.state[id + 'hanja'].value.trim();
        let hoonEum = this.state[id + 'hoonEum'].value.trim();
        let meaning = this.state[id + 'meaning'].value.trim();
        let phonetic = this.state[id + 'phonetic'] ? this.state[id + 'phonetic'].value.trim() : '';
        let primaryHoonMeaning = this.state[id + 'primaryHoonMeaning'] ? this.state[id + 'primaryHoonMeaning'].value.trim() : '';
        let radical = this.state[id + 'radical'].value.trim();
        let radicalHangul = this.state[id + 'radicalHangul'].value.trim();
        let radicalStrokeCount = parseInt(this.state[id + 'radicalStrokeCount'].value.trim());
        let totalStrokeCount = parseInt(this.state[id + 'totalStrokeCount'].value.trim());

        this.props.saveHanjaCharacter(parseInt(this.props.match.params.id), id, additionalHoonMeaning, characterStrokeCount, eum, hanja, hoonEum, meaning, phonetic, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount);
    };
    deleteHanjaCharacter = (id, hanja) => {
        if (window.confirm("Are you sure you want to delete " + hanja + " from Hanja Characters?")) {
            this.props.deleteHanjaCharacter(parseInt(this.props.match.params.id), id);
            window.alert(hanja + " has been deleted!");
        } else {
            alert(hanja + " has NOT been deleted.");
        }
    };

    createPhonetic = () => {
        const { newPhonetic } = this.state;
        if (newPhonetic.characters) {
            newPhonetic.characters = newPhonetic.characters.split(',').map(c => c.trim()).filter(c => !!c);
        }
        if (newPhonetic.sub_characters) {
            newPhonetic.sub_characters = newPhonetic.sub_characters.split(',').map(c => c.trim()).filter(c => !!c);
        }
        newPhonetic.lesson = this.lesson;

        axios({
            method: 'POST',
            data: newPhonetic,
            url: '/api/instructor351/addPhonetic'
        }).then(res => {
            newPhonetic._id = res.data;
            this.setState(prevState => ({ phonetics: [newPhonetic, ...prevState.phonetics] }));
            this.onPhoneticAddModalToggle();
        });
    }

    createRadical = () => {
        const { newRadical } = this.state;
        newRadical.lesson = this.lesson;
        axios({
            method: 'POST',
            data: newRadical,
            url: '/api/instructor351/addRadical'
        }).then(res => {
            newRadical._id = res.data;
            this.setState(prevState => ({ radicals: [newRadical, ...prevState.radicals] }));
            this.onRadicalAddModalToggle();
        });
    }

    savePhonetic = (id) => {
        let characters = this.state[id + 'characters'].value.split("\n");
        characters = characters.filter(ex => {
            return ex.trim() !== "";
        });
        let phonetic = this.state[id + 'phonetic'].value.trim();
        let pronunciation = this.state[id + 'pronunciation'].value.trim();

        let sub_pronunciation = [];
        let sub_characters = [];

        if (this.state[id + 'sub-pronunciation'])
            sub_pronunciation = this.state[id + 'sub-pronunciation'].value.trim();
        if (this.state[id + 'sub-pronunciation']) {
            sub_characters = this.state[id + 'sub-characters'].value.split("\n");
            sub_characters = sub_characters.filter(ex => {
                return ex.trim() !== "";
            });
        }


        this.props.savePhonetic(parseInt(this.props.match.params.id), id, characters, phonetic, pronunciation, sub_pronunciation, sub_characters);
    };
    deletePhonetic = (id, phonetic) => {
        if (window.confirm("Are you sure you want to delete " + phonetic + " from Phonetics?")) {
            this.props.deletePhonetic(parseInt(this.props.match.params.id), id);
            window.alert(phonetic + " has been deleted!");
        } else {
            alert(phonetic + " has NOT been deleted.");
        }
    };

    onHanjaAddModalToggle = () => {
        this.setState(prevState => ({ isHanjaAddModalOpen: !prevState.isHanjaAddModalOpen, newHanjaChar: {} }));
    }

    onPhoneticAddModalToggle = () => {
        this.setState(prevState => ({ isPhoneticModalOpen: !prevState.isPhoneticModalOpen, newPhonetic: {} }));
    }

    onRadicalAddModalToggle = () => {
        this.setState(prevState => ({ isRadicalModalOpen: !prevState.isRadicalModalOpen, newRadical: {} }));
    }

    saveRadical = (id) => {
        let additionalHoonMeaning = this.state[id + 'additionalHoonMeaning'] ? this.state[id + 'additionalHoonMeaning'].value.trim() : '';
        let characterStrokeCount = parseInt(this.state[id + 'characterStrokeCount'].value.trim());
        let hoonEum = this.state[id + 'hoonEum'].value.trim();
        let meaning = this.state[id + 'meaning'].value.trim();
        let primaryHoonMeaning = this.state[id + 'primaryHoonMeaning'] ? this.state[id + 'primaryHoonMeaning'].value.trim() : '';
        let radical = this.state[id + 'radical'].value.trim();
        let radicalHangul = this.state[id + 'radicalHangul'].value.trim();
        let radicalStrokeCount = parseInt(this.state[id + 'radicalStrokeCount'].value.trim());
        let totalStrokeCount = parseInt(this.state[id + 'totalStrokeCount'].value.trim());

        this.props.saveRadical(parseInt(this.props.match.params.id), id, additionalHoonMeaning, characterStrokeCount, hoonEum, meaning, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount);
    };
    deleteRadical = (id, radical) => {
        if (window.confirm("Are you sure you want to delete " + radical + " from Radicals?")) {
            this.props.deleteRadical(parseInt(this.props.match.params.id), id);
            window.alert(radical + " has been deleted!");
        } else {
            alert(radical + " has NOT been deleted.");
        }
    };

    handleOnChangeTab = (event, value) => {
        this.setState({tabValue: value});
    }

    render() {
        const {newHanja, phonetics, radicals, newPhonetic, newRadical, isPhoneticModalOpen, isRadicalModalOpen, isHanjaAddModalOpen, newHanjaChar} = this.state;
        return (
            <div className="edit-lesson-container">
                <h2>Lesson {this.props.match.params.id}</h2>
                <h5><i>Editing Okpyeon: Click on a category to edit</i></h5>

                <div>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleOnChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        style={{padding: '2%'}}
                    >
                        <Tab label="Hanja Characters"/>
                        <Tab label="Phonetics"/>
                        <Tab label="Radicals"/>
                    </Tabs>
                </div>

                {this.state.tabValue === 0 &&
                <div className="edit-lesson-background">
                    <div className="ir-EditOkpyeon-header">
                        <h2>Hanja Characters (For Lesson's '새 한자' section & Okpyeon)</h2>
                        <IconButton size="medium" onClick={this.onHanjaAddModalToggle} className="primary-button" variant="contained"><PlusIcon /></IconButton>
                    </div>
                    <Divider/><br/>
                    <Modal
                        open={isHanjaAddModalOpen}
                        onClose={this.onHanjaAddModalToggle}
                    >
                        <Box className="ir-EditOkpyeon-modal">
                            <Typography variant="h6" component="h6">Add Hanja Character</Typography>
                            <label>Hanja:</label>
                            <input type="text" placeholder="Type Hanja.." style={{width: 400}} onChange={event => newHanjaChar.hanja = event.target.value}/>
                            <br />
                            <label>音 (음/Eum):</label>
                            <input type="text" placeholder="Type 音 (음/Eum).." style={{width: 400}} onChange={event => newHanjaChar.eum = event.target.value}/>
                            <br />
                            <label>Meaning:</label>
                            <textarea placeholder="Type Meaning.." style={{width: 400}} rows="3"
                                onChange={event => newHanjaChar.meaning = event.target.value}></textarea>
                            <br />
                            <label>訓 (훈) + 音 (음):</label>
                            <input placeholder="Type 訓 (훈) + 音 (음).."  type="text" style={{width: 400}} onChange={event => newHanjaChar.hoonEum = event.target.value} />
                            <br />
                            <label>Primary 訓 (훈/Hoon) Meaning:</label>
                            <textarea placeholder="Type Primary 訓 (훈/Hoon) Meaning.." style={{width: 400}} onChange={event => newHanjaChar.primaryHoonMeaning = event.target.value}></textarea>
                            <br />
                            <label>Additional 訓 (훈/Hoon) Meaning:</label>
                            <textarea placeholder="Type Additional 訓 (훈/Hoon) Meaning.." style={{width: 400}} onChange={event => newHanjaChar.additionalHoonMeaning = event.target.value}></textarea>
                            <br />
                            <label>Phonetic:</label>
                            <input placeholder="Add Phonetic.." type="text" style={{width: 400}} onChange={event => newHanjaChar.phonetic = event.target.value}/>
                            <br />
                            <label>Radical:</label>
                            <input placeholder="Add Radical.." type="text" style={{width: 400}} onChange={event => newHanjaChar.radical = event.target.value} />
                            <br />
                            <label>Radical Hangul:</label>
                            <input placeholder="Add Radical Hangul.." type="text" style={{width: 400}} onChange={event => newHanjaChar.radicalHangul = event.target.value} />
                            <br />
                            <label>Radical Stroke Count:</label>        
                            <input placeholder="Add Radical Stroke Count.." type="text" style={{width: 400}} onChange={event => newHanjaChar.radicalStrokeCount = event.target.value} />
                            <br />
                            <label>Character Stroke Count:</label>
                            <input placeholder="Add Character Stroke Count.." type="text" style={{width: 400}} onChange={event => newHanjaChar.characterStrokeCount = event.target.value} />
                            <br/>
                            <label>Total Stroke Count (Character + Radical):</label>
                            <input placeholder="Add Total Stroke Count.." type="text" style={{width: 400}} onChange={event => newHanjaChar.totalStrokeCount = event.target.value} />      
                            <br /><br />
                            <Button style={{
                                marginRight: '4px',
                                backgroundColor: '#00284d',
                                color: 'white',
                                width: '20%'
                            }} onClick={this.createHanjaChar}>Create</Button>
                            <Button variant="contained" onClick={this.onHanjaAddModalToggle}>Cancel</Button>
                        </Box>
                    </Modal>
                    <div style={{textAlign: 'center'}}>
                        {newHanja.map((char) => {
                            return <div key={char._id} style={{padding: '0 5%'}}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>{char.hanja} {char.eum}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Hanja: <input type="text" defaultValue={char.hanja} style={{width: '25%'}}
                                                      ref={input => this.state[char._id + 'hanja'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        音 (음/Eum): <input type="text" defaultValue={char.eum} style={{width: '25%'}}
                                                          ref={input => this.state[char._id + 'eum'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Meaning: <textarea input type="text" defaultValue={char.meaning} style={{width: '25%'}}
                                                           ref={input => this.state[char._id + 'meaning'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        訓 (훈) + 音 (음): <input type="text" defaultValue={char.hoonEum}
                                                              style={{width: '25%'}}
                                                              ref={input => this.state[char._id + 'hoonEum'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Primary 訓 (훈/Hoon) Meaning: <textarea input type="text"
                                                                              defaultValue={char.primaryHoonMeaning}
                                                                              style={{width: '50%'}}
                                                                              ref={input => this.state[char._id + 'primaryHoonMeaning'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Additional 訓 (훈/Hoon) Meaning: <textarea input type="text"
                                                                                 defaultValue={char.additionalHoonMeaning}
                                                                                 style={{width: '50%'}}
                                                                                 ref={input => this.state[char._id + 'additionalHoonMeaning'] = input}/>
                                    </AccordionDetails>

                                    <AccordionDetails>
                                        Phonetic: <input type="text" defaultValue={char.phonetic} style={{width: '25%'}}
                                                         ref={input => this.state[char._id + 'phonetic'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Radical: <input type="text" defaultValue={char.radical} style={{width: '25%'}}
                                                        ref={input => this.state[char._id + 'radical'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Radical Hangul: <input type="text" defaultValue={char.radicalHangul}
                                                               style={{width: '25%'}}
                                                               ref={input => this.state[char._id + 'radicalHangul'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Radical Stroke Count: <input type="text" defaultValue={char.radicalStrokeCount}
                                                                     style={{width: '25%'}}
                                                                     ref={input => this.state[char._id + 'radicalStrokeCount'] = input}/>
                                    </AccordionDetails>

                                    <AccordionDetails>
                                        Character Stroke Count: <input type="text"
                                                                       defaultValue={char.characterStrokeCount}
                                                                       style={{width: '25%'}}
                                                                       ref={input => this.state[char._id + 'characterStrokeCount'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Total Stroke Count (Character + Radical): <input type="text"
                                                                                         defaultValue={char.totalStrokeCount}
                                                                                         style={{width: '25%'}}
                                                                                         ref={input => this.state[char._id + 'totalStrokeCount'] = input}/>
                                        <br/><br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#00284d',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.saveHanjaCharacter(char._id)}>SAVE</Button>

                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#f6152f',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.deleteHanjaCharacter(char._id, char.hanja)}>DELETE</Button>
                                    </AccordionDetails>
                                </Accordion>
                                <br/>
                            </div>
                        })
                        }
                    </div>
                </div>
                }

                {this.state.tabValue === 1 &&
                <div className="edit-lesson-background">
                    <div className="ir-EditOkpyeon-header">
                        <h2>Phonetics (For Lesson's '새 부수' section & Okpyeon)</h2>
                        <IconButton size="medium" onClick={this.onPhoneticAddModalToggle} className="primary-button" variant="contained"><PlusIcon /></IconButton>
                    </div>
                    <Divider/><br/>
                    <Modal
                        open={isPhoneticModalOpen}
                        onClose={this.onPhoneticAddModalToggle}
                    >
                        <Box className="ir-EditOkpyeon-modal">
                            <Typography variant="h6" component="h6">Add Phonetic</Typography>
                            <label>Phonetic:</label>
                            <input type="text" placeholder="Type Phonetic.." style={{width: 400}} onChange={event => newPhonetic.phonetic = event.target.value}/>
                            <br />
                            <label>Characters:</label>
                            <textarea placeholder="Type Characters separated by commas" style={{width: 400}} rows="3" className="edit-input"
                                onChange={event => newPhonetic.characters = event.target.value}></textarea>
                            <br />
                            <label>Pronounciation:</label>
                            <input type="text" placeholder="Type Pronounciation.." style={{width: 400}} onChange={event => newPhonetic.pronunciation = event.target.value}/>
                            <br />
                            <label>Sub-Pronounciation:</label>
                            <input type="text" placeholder="Type Sub-Pronounciation.." style={{width: 400}} onChange={event => newPhonetic.sub_pronunciation = event.target.value}/>
                            <br />
                            <label>Sub-Characters:</label>
                            <textarea placeholder="Type Sub-Characters separated by commas" style={{width: 400}} rows="3" className="edit-input"
                                onChange={event => newPhonetic.sub_characters = event.target.value}></textarea>
                            <br /><br />
                            <Button style={{
                                marginRight: '4px',
                                backgroundColor: '#00284d',
                                color: 'white',
                                width: '20%'
                            }} onClick={this.createPhonetic}>Create</Button>
                            <Button variant="contained" onClick={this.onPhoneticAddModalToggle}>Cancel</Button>
                        </Box>
                    </Modal>
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

                            return <div key={phon._id} style={{padding: '0 5%'}}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>{phon.phonetic}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Phonetic: <input type="text" defaultValue={phon.phonetic} style={{width: '25%'}}
                                                         ref={input => this.state[phon._id + 'phonetic'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Characters:
                                        <textarea style={{overflowWrap: 'break-word', width: '50%'}} rows="5" className="edit-input"
                                                  ref={input => this.state[phon._id + 'characters'] = input}>
                                    {str}
                                </textarea>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Pronunciation: <input type="text" defaultValue={phon.pronunciation}
                                                              style={{width: '25%'}}
                                                              ref={input => this.state[phon._id + 'pronunciation'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        {
                                            phon.sub_pronunciation ?
                                                <div>
                                                    Sub-Pronunciation: <input type="text"
                                                                              defaultValue={phon.sub_pronunciation}
                                                                              style={{width: '25%'}}
                                                                              ref={input => this.state[phon._id + 'sub-pronunciation'] = input}/><br/>
                                                    Sub-Characters:
                                                    <textarea name="main-text" style={{overflowWrap: 'break-word'}}
                                                              defaultValue={str2} rows="7" className="edit-input"
                                                              ref={input => this.state[phon._id + 'sub-characters'] = input}/>
                                                </div> : ''
                                        }
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#00284d',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.savePhonetic(phon._id)}>SAVE</Button>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#f6152f',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.deletePhonetic(phon._id, phon.phonetic)}>DELETE</Button>
                                    </AccordionDetails>
                                </Accordion>
                                <br/>
                            </div>
                        })
                        }
                    </div>
                </div>
                }

                {this.state.tabValue === 2 &&
                <div className="edit-lesson-background">
                    <div className="ir-EditOkpyeon-header">
                        <h2>Radicals (For Okpyeon)</h2>
                        <IconButton size="medium" onClick={this.onRadicalAddModalToggle} className="primary-button" variant="contained"><PlusIcon /></IconButton>
                    </div>
                    <Divider/><br/>
                    <Modal
                        open={isRadicalModalOpen}
                        onClose={this.onRadicalAddModalToggle}
                    >
                        <Box className="ir-EditOkpyeon-modal">
                            <Typography variant="h6" component="h6">Add Radical</Typography>
                            <label>Radical:</label>
                            <input type="text" placeholder="Type Radical.." style={{width: 400}} onChange={event => newRadical.radical = event.target.value}/>
                            <br />
                            <label>Radical Hangul:</label>
                            <input type="text" placeholder="Type Radical.." style={{width: 400}} onChange={event => newRadical.radicalHangul = event.target.value}/>
                            <br />
                            <label>Meaning:</label>
                            <textarea placeholder="Type Meaning.." style={{width: 400}} className="edit-input"
                                onChange={event => newRadical.meaning = event.target.value}></textarea>
                            <br />
                            <label>訓 (훈) + 音 (음):</label>
                            <input placeholder="Type 訓 (훈) + 音 (음).." type="text" style={{width: 400}} onChange={event => newRadical.hoonEum = event.target.value} />
                            <br />
                            <label>Primary 訓 (훈/Hoon) Meaning:</label>
                            <textarea placeholder="Type Primary 訓 (훈/Hoon) Meaning.." style={{width: 400}} onChange={event => newRadical.primaryHoonMeaning = event.target.value}></textarea>
                            <br />
                            <label>Additional 訓 (훈/Hoon) Meaning:</label>
                            <textarea placeholder="Type Additional 訓 (훈/Hoon) Meaning.." style={{width: 400}} onChange={event => newRadical.additionalHoonMeaning = event.target.value}></textarea>
                            <br/>
                            <label>Radical Stroke Count:</label>
                            <input placeholder="Type Radical Stroke Count.." type="text" style={{width: 400}} onChange={event => newRadical.radicalStrokeCount = event.target.value} />
                            <br/>
                            <label>Character Stroke Count:</label>
                            <input placeholder="Type Character Stroke Count.." type="text" style={{width: 400}} onChange={event => newRadical.characterStrokeCount = event.target.value} />
                            <br/>
                            <label>Total Stroke Count (Character + Radical):</label>
                            <input placeholder="Type Total Stroke Count.." type="text" style={{width: 400}} onChange={event => newRadical.totalStrokeCount = event.target.value} />   
                            <br /><br />
                            <Button style={{
                                marginRight: '4px',
                                backgroundColor: '#00284d',
                                color: 'white',
                                width: '20%'
                            }} onClick={this.createRadical}>Create</Button>
                            <Button variant="contained" onClick={this.onPhoneticAddModalToggle}>Cancel</Button>
                        </Box>
                    </Modal>
                    <div style={{textAlign: 'center'}}>
                        {radicals.map((rad) => {
                            return <div key={rad._id} style={{padding: '0 5%'}}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>{rad.radical} {rad.radicalHangul}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Radical: <input type="text" defaultValue={rad.radical} style={{width: '25%'}}
                                                        ref={input => this.state[rad._id + 'radical'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Radical Hangul: <input type="text" defaultValue={rad.radicalHangul}
                                                               style={{width: '25%'}}
                                                               ref={input => this.state[rad._id + 'radicalHangul'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Meaning: <textarea input type="text" defaultValue={rad.meaning} style={{width: '25%'}}
                                                           ref={input => this.state[rad._id + 'meaning'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        訓 (훈) + 音 (음): <input type="text" defaultValue={rad.hoonEum}
                                                              style={{width: '25%'}}
                                                              ref={input => this.state[rad._id + 'hoonEum'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Primary 訓 (훈/Hoon) Meaning: <textarea input type="text"
                                                                              defaultValue={rad.primaryHoonMeaning}
                                                                              style={{width: '50%'}}
                                                                              ref={input => this.state[rad._id + 'primaryHoonMeaning'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Additional 訓 (훈/Hoon) Meaning: <textarea input type="text"
                                                                                 defaultValue={rad.additionalHoonMeaning}
                                                                                 style={{width: '50%'}}
                                                                                 ref={input => this.state[rad._id + 'additionalHoonMeaning'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Radical Stroke Count: <input type="text" defaultValue={rad.radicalStrokeCount}
                                                                     style={{width: '25%'}}
                                                                     ref={input => this.state[rad._id + 'radicalStrokeCount'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Character Stroke Count: <input type="text"
                                                                       defaultValue={rad.characterStrokeCount}
                                                                       style={{width: '25%'}}
                                                                       ref={input => this.state[rad._id + 'characterStrokeCount'] = input}/>
                                        <br/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        Total Stroke Count (Character + Radical): <input type="text"
                                                                                         defaultValue={rad.totalStrokeCount}
                                                                                         style={{width: '25%'}}
                                                                                         ref={input => this.state[rad._id + 'totalStrokeCount'] = input}/>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#00284d',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.saveRadical(rad._id)}>SAVE</Button>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#f6152f',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.deleteRadical(rad._id, rad.radical)}>DELETE</Button>
                                    </AccordionDetails>
                                </Accordion>
                                <br/>
                            </div>
                        })
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    radicals: state.okpyeon.radicals,
    phonetics: state.okpyeon.phonetics,
    newHanja : state.lessons.newHanja,
});

const mapDispatchToProps = {
    getRadicals,
    getPhonetics,
    getNewHanja,
    saveHanjaCharacter,
    saveRadical,
    savePhonetic,
    deleteHanjaCharacter,
    deleteRadical,
    deletePhonetic
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOkpyeon);