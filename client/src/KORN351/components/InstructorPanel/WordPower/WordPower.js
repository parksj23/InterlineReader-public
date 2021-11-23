import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import './WordPower.css';

import { Button, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Divider, IconButton, Typography, Modal, Box, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlusIcon from '@material-ui/icons/Add';
import TabPanel, { a11yProps } from "../../../../components/common/TabPanel";
import axios from 'axios';
import _ from 'lodash';
import {connect} from "react-redux";
import {getNewHanja, getNewHanjaCombos} from "../../../../actions/KORN351/Lessons";


class WordPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordPowerData: [],
            unmatchedYemun: [],
            wordPowerToEdit: {},
            yemunToEdit: {},
            showLoading: false,
            isWordPowerModalOpen: false,
            isYemunModalOpen: false,
            newWordPower: {},
            newYemun: {},
            tabIndex: 0,
            yemunTabIdx: 0,
            isSaving: false,
            newHanja: [],
            newHanjaCombos: [],
            clickedHanja: null,
            clickedHanjaTab: null,
            selectedWordPower: null
        }
        this.currentLesson = parseInt(this.props.lesson);

        this.createWordPower = this.createWordPower.bind(this);
        this.saveWordPower = this.saveWordPower.bind(this);
        this.deleteWordPower = this.deleteWordPower.bind(this);
        this.onWordPowerModalOpen = this.onWordPowerModalOpen.bind(this);
        this.onYemunModalOpen = this.onYemunModalOpen.bind(this);
        this.createWordPower = this.createWordPower.bind(this);
        this.saveYemun = this.saveYemun.bind(this);
        this.deleteYemun = this.deleteYemun.bind(this);
    }

    componentDidMount() {
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedHanja: {id: "null"}});

        if (this.props.newHanja.length === 0 || this.props.newHanja === undefined) {
            this.props.getNewHanja().then(() => {
                    const currLesson = this.currentLesson;

                    this.setState({
                        newHanja: this.props.newHanja.filter(word => {
                            return word.lesson === currLesson
                        })
                    });
                }
            );
        }

        if (this.props.newHanjaCombos.length === 0 || this.props.newHanjaCombos === undefined) {
            this.props.getNewHanjaCombos().then(() => {
                    const currLesson = this.currentLesson;

                    let temp = this.props.newHanjaCombos.filter(combo => {
                        return combo.lesson === currLesson
                    });
                    this.setState({
                        newHanjaCombos: temp
                    })
                }
            );
        }
    }

    componentWillMount() {
        if (this.state.newHanja.length === 0) {
            const currLesson = this.currentLesson;

            let temp = this.props.newHanja.filter(char => {
                return char.lesson === currLesson
            });
            this.setState({
                newHanja: temp
            });
        }

        if (this.state.newHanjaCombos.length === 0) {
            const currLesson = this.currentLesson;

            let temp = this.props.newHanjaCombos.filter(combo => {
                return combo.lesson === currLesson
            });
            this.setState({
                newHanjaCombos: temp
            });
        }
    }

    getWordPowerYemunData = (id) => {
        axios({
            method: "get",
            url: '/api/wordPower/list',
            params: {lesson: this.currentLesson, clickedHanja: id}
        })
            .then(({ data }) => {
                const wordPowerToEdit = {};
                const yemunToEdit = {};
                // console.log(data.unmatchedYemunWithWords);
                // console.log(data.unmatchedYemunWithWords.length)
                data.wordPowerList.forEach(d => {
                    wordPowerToEdit[d._id] = {};
                    yemunToEdit[d._id] = this._getEmptyObjWithKeys(d.examples.map(e => e._id));
                });
                data.unmatchedYemunWithWords.forEach(d => {
                    wordPowerToEdit[d.wordPower._id] = {};
                    yemunToEdit[d.wordPower._id] = this._getEmptyObjWithKeys(d.unmatchedYemun.map(e => e._id));
                });
                this.setState({
                    wordPowerData: data.wordPowerList,
                    unmatchedYemun: data.unmatchedYemunWithWords,
                    showLoading: false,
                    wordPowerToEdit,
                    yemunToEdit});
            })
            .catch(() => {
                alert("Error receiving wordPower data");
            });
    }

    handleOnChangeHanjaTab = (event, value) => {
        this.setState({clickedHanja: event.currentTarget, clickedHanjaTab: value});
        this.setState({showLoading: true});
        this.getWordPowerYemunData(event.currentTarget.id);
    }

    _getEmptyObjWithKeys(keys) {
        const obj = {};
        keys.forEach(key => obj[key] = {});
        return obj;
    }

    saveWordPower(id) {
        const { wordPowerToEdit } = this.state;
        this.setState({ isSaving: true }, () => {
            axios({
                method: 'put',
                url: `/api/wordPower/${id}`,
                data: wordPowerToEdit[id]
            }).then(_ => {
                this.setState(prevState => ({
                    wordPowerData: prevState.wordPowerData.map(w => {
                        if (w._id === id) {
                            return Object.assign(w, wordPowerToEdit[id]);
                        }
                        return w;
                    }),
                    isSaving: false
                }));
            });
        });
    }

    createWordPower() {
        const { newWordPower } = this.state;
        if (_.isEmpty(newWordPower)) { return; }
        newWordPower.lesson = this.currentLesson;
        axios({
            method: 'post',
            url: '/api/wordPower/createWordPower',
            data: newWordPower
        }).then(({ data }) => {
            this.setState(prevState => ({
                wordPowerData: [data, ...prevState.wordPowerData],
                isWordPowerModalOpen: false,
                wordPowerToEdit: {...prevState.wordPowerToEdit, [data._id]: {}}
            }));
        });
    }

    deleteWordPower(id) {
        axios({
            method: 'delete',
            url: `/api/wordPower/${id}`
        }).then(_ => {
            this.setState(prevState => ({
                wordPowerData: prevState.wordPowerData.filter(w => w._id !== id)
            }));
        });
    }

    createYemun(wordpowerId) {
        const { newYemun } = this.state;
        if (_.isEmpty(newYemun)) { return; }
        
        newYemun.lesson = this.currentLesson;
        axios({
            method: 'post',
            url: '/api/wordPower/createYemun',
            data: newYemun
        }).then(({ data }) => {
            this.setState(prevState => {
                const clonedYemunToEdit = _.clone(prevState.yemunToEdit);
                clonedYemunToEdit[wordpowerId][data._id] = {};
                return {
                    wordPowerData: prevState.wordPowerData.map(wordpower => {
                        if (wordpower._id === wordpowerId) {
                            wordpower.examples = [data, ...wordpower.examples];
                        }
                        return wordpower;
                    }),
                    isYemunModalOpen: false,
                    yemunToEdit: clonedYemunToEdit
                };
            });
        });
    }

    saveYemun(wordpowerId, yemunId) {
        const { yemunToEdit } = this.state;
        yemunToEdit[wordpowerId][yemunId].lesson = this.currentLesson;
        this.setState({ isSaving: true }, () => {
            axios({
                method: 'put',
                url: `/api/wordPower/yemun/${yemunId}`,
                data: yemunToEdit[wordpowerId][yemunId]
            }).then(_ => {
                this.setState(prevState => ({
                    wordPowerData: prevState.wordPowerData.map(w => {
                        if (w._id === wordpowerId) {
                            w.examples = w.examples.map(example => {
                                if (example._id === yemunId) {
                                    return Object.assign(example, yemunToEdit[wordpowerId][yemunId]);
                                }
                                return example;
                            });
                        }
                        return w;
                    }),
                    isSaving: false,
                    isYemunModalOpen: false
                }));
            });
        });
    }

    deleteYemun(wordpowerId, yemunId) {
        axios({
            method: 'delete',
            url: `/api/wordPower/yemun/${yemunId}`
        }).then(_ => {
            this.setState(prevState => ({
                wordPowerData: prevState.wordPowerData.map(w => {
                    if (w._id === wordpowerId) {
                        w.examples = w.examples.filter(example => example._id !== yemunId);
                    }
                    return w;
                })
            }));
        });
    }

    onWordPowerModalOpen() {
        this.setState(prevState => ({ isWordPowerModalOpen: !prevState.isWordPowerModalOpen, newWordPower: {} }));
    }

    onYemunModalOpen(id) {
        this.setState(prevState => ({ isYemunModalOpen: !prevState.isYemunModalOpen, newYemun: {}, selectedWordPower: id }));
    }

    render() {
        const {isSaving, showLoading, wordPowerData, unmatchedYemun, wordPowerToEdit, isWordPowerModalOpen, newWordPower, tabIndex, yemunTabIdx, yemunToEdit, newYemun, isYemunModalOpen} = this.state;
        const {newHanja} = this.state;
        const {newHanjaCombos} = this.state;

        return (
            <div className="ir-WordPower edit-lesson-background">
                <Divider/>
                <br/>
                <Typography color="textSecondary">
                    Select a 漢字 tab to show words that contain that 漢字.
                </Typography>
                <Box>
                    <Tabs
                        value={this.state.clickedHanjaTab}
                        onChange={this.handleOnChangeHanjaTab}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="scrollable"
                        scrollbuttons="auto"
                        style={{padding: '2%'}}
                        wrapped
                    >
                        {newHanja.map((hanjaTab) => {
                            let tabId = hanjaTab.hanja.replace(/\s/g, '').trim().normalize('NFC');
                            return (
                                <Tab
                                    id={tabId}
                                    label={
                                        <React.Fragment>
                                            {hanjaTab.hoonEum.split(" ")[0]} {hanjaTab.hanja.trim().normalize('NFC')}({hanjaTab.hoonEum.split(" ")[1]}) &nbsp;&nbsp;
                                        </React.Fragment>
                                    }
                                />
                            )
                        })}
                    </Tabs>
                </Box>
                <Divider/>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={(e, tabIndex) => this.setState({ tabIndex })} aria-label="basic tabs example">
                        <Tab label="Words" />
                        <Tab label="Unmatched yemun" />
                    </Tabs>
                </Box>

                {this.state.clickedHanja !== null &&
                <div>
                    <TabPanel value={tabIndex} index={0}>
                        <div className="ir-WordPower-header">
                            <h4>Words</h4>
                            <IconButton size="medium" onClick={this.onWordPowerModalOpen} className="primary-button" variant="contained"><PlusIcon /></IconButton>
                        </div>
                        <Modal
                            open={isWordPowerModalOpen}
                            onClose={this.onWordPowerModalOpen}
                        >
                            <Box className="ir-WordPower-modal">
                                <Typography variant="h6" component="h6">Add Yemun</Typography>
                                <br />
                                Hanja: <input type="text" placeholder="Type Hanja.."
                                                    style={{width: 300}}
                                                    onChange={event => newWordPower.hanqca = event.target.value}/><br/>
                                <br />
                                Hankul: <input type="text" placeholder="Type Hankul.."
                                                        style={{width: 300}}
                                                        onChange={event => newWordPower.hankul = event.target.value}/><br/>
                                <br />
                                English Gloss: <input type="text" placeholder="Type English Gloss.."
                                                        style={{width: 300}}
                                                        onChange={event => newWordPower.englishGloss = event.target.value}/><br/>
                                <br />
                                <Button style={{
                                    marginRight: '4px',
                                    backgroundColor: '#00284d',
                                    color: 'white',
                                    width: '20%'
                                }} onClick={() => this.createWordPower()}>Create</Button>
                                <Button variant="contained" onClick={() => this.onWordPowerModalOpen()}>Cancel</Button>
                            </Box>
                        </Modal>

                        <Modal
                            open={isYemunModalOpen}
                            onClose={this.onYemunModalOpen}
                        >
                            <Box className="ir-WordPower-modal">
                                <Typography variant="h6" component="h6">Add Example</Typography>
                                <br />
                                Simple Hanja:<br/>
                                    <textarea 
                                        defaultValue={newYemun.simpleHanqca}
                                        style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                        onChange={event => newYemun.simpleHanqca = event.target.value}
                                    ></textarea><br/>
                                <br />
                                Hanjaized Sentence:<br/>
                                    <textarea
                                        defaultValue={newYemun.hanqcaizedSentence}
                                        style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                        onChange={event => newYemun.hanqcaizedSentence = event.target.value}
                                    ></textarea><br/>
                                <br />
                                Korean Sentence:<br/>
                                    <textarea
                                        defaultValue={newYemun.koreanSentence}
                                        style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                        onChange={event => newYemun.koreanSentence = event.target.value}>
                                    </textarea><br/>
                                <br />
                                Translation:<br/>
                                    <textarea
                                        defaultValue={newYemun.translation}
                                        style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                        onChange={event => newYemun.translation = event.target.value}>
                                    </textarea><br/>
                                <br />
                                <Button style={{
                                    marginRight: '4px',
                                    backgroundColor: '#00284d',
                                    color: 'white',
                                    width: '20%'
                                }} onClick={() => this.createYemun(this.state.selectedWordPower)}>Create</Button>
                                <Button variant="contained" onClick={() => this.onYemunModalOpen()}>Cancel</Button>
                            </Box>
                        </Modal>

                        <Divider/><br/>
                        {(wordPowerData || []).map(wordpower => (
                            <div key={wordpower._id}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>{wordpower.hanqca + '(' + wordpower.hankul + ')' + '   ' + wordpower.englishGloss}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            Hanja: <input type="text" defaultValue={wordpower.hanqca}
                                                                style={{width: 300}}
                                                                onChange={event => wordPowerToEdit[wordpower._id].hanqca = event.target.value}/><br/>
                                            <br />
                                            Hankul: <input type="text" defaultValue={wordpower.hankul}
                                                                    style={{width: 300}}
                                                                    onChange={event => wordPowerToEdit[wordpower._id].hankul = event.target.value}/><br/>
                                            <br />
                                            English Gloss: <input type="text" defaultValue={wordpower.englishGloss}
                                                                    style={{width: 300}}
                                                                    onChange={event => wordPowerToEdit[wordpower._id].englishGloss = event.target.value}/><br/>
                                            <br />
                                            {isSaving && <CircularProgress className="ir-WordPower-saving" size="small" />}
                                            <Button style={{
                                                marginRight: '4px',
                                                backgroundColor: '#00284d',
                                                color: 'white',
                                            }} onClick={() => this.saveWordPower(wordpower._id)}>{isSaving ? 'Saving ...' : 'Save'}</Button>
                                            <Button style={{
                                                marginRight: '4px',
                                                backgroundColor: '#f6152f',
                                                color: 'white',
                                            }}
                                            onClick={() => this.deleteWordPower(wordpower._id)}>Delete</Button>
                                            <Button style={{
                                                marginRight: '4px',
                                                backgroundColor: '#fabc05',
                                                color: 'white',
                                            }} onClick={() => this.onYemunModalOpen(wordpower._id)}>Add Yemun</Button>

                                            <div className="ir-WordPower-header">
                                                <h4>Examples</h4>
                                            </div>
                                            {wordpower.examples.length ? wordpower.examples.map(example => (
                                                <Accordion key={example._id}>
                                                    <AccordionSummary style={{display: 'flex', justifyContent: 'spaceBetween', backgroundColor: '#f7f2f2'}} expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography>{example.translation}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div>
                                                            Simple Hanja:<br/>
                                                                <textarea 
                                                                    defaultValue={example.simpleHanqca}
                                                                    style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                                    onChange={event => yemunToEdit[wordpower._id][example._id].simpleHanqca = event.target.value}
                                                                ></textarea><br/>
                                                            <br />
                                                            Hanjaized Sentence:<br/>
                                                                <textarea
                                                                    defaultValue={example.hanqcaizedSentence}
                                                                    style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                                    onChange={event => yemunToEdit[wordpower._id][example._id].hanqcaizedSentence = event.target.value}
                                                                ></textarea><br/>
                                                            <br />
                                                            Korean Sentence:<br/>
                                                                <textarea
                                                                    defaultValue={example.koreanSentence}
                                                                    style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                                    onChange={event => yemunToEdit[wordpower._id][example._id].koreanSentence = event.target.value}>
                                                                </textarea><br/>
                                                            <br />
                                                            Translation:<br/>
                                                                <textarea
                                                                    defaultValue={example.translation}
                                                                    style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                                    onChange={event => yemunToEdit[wordpower._id][example._id].translation = event.target.value}>
                                                                </textarea><br/>
                                                            <br />
                                                            {isSaving && <CircularProgress className="ir-WordPower-saving" size="small" />}
                                                            <Button style={{
                                                                marginRight: '4px',
                                                                backgroundColor: '#00284d',
                                                                color: 'white',
                                                                width: '20%'
                                                            }} onClick={() => this.saveYemun(wordpower._id, example._id)}>{isSaving ? 'Saving ...' : 'Save'}</Button>
                                                            <Button style={{
                                                                marginRight: '4px',
                                                                backgroundColor: '#f6152f',
                                                                color: 'white',
                                                                width: '20%'
                                                            }}
                                                            onClick={() => this.deleteYemun(wordpower._id, example._id)}>Delete</Button>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )) : <h6>No examples found</h6>}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <br/>
                            </div>
                        ))}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        <div className="ir-WordPower-header">
                            <h4>Unmatched Yemun</h4>
                        </div>
                        <Divider/><br/>
                        {showLoading ? <CircularProgress style={{display: 'flex', margin: '10px auto'}}/> : (
                            <div className="ir-WordPower-examples">
                                {unmatchedYemun.length ? <Tabs variant="scrollable" className="ir-WordPower-tabs" value={yemunTabIdx} orientation="vertical" onChange={(e, yemunTabIdx) => this.setState({ yemunTabIdx })}>
                                    {unmatchedYemun.map((obj, idx) =>
                                        <Tab key={idx} label={obj.wordPower.hanqca + '(' + obj.wordPower.hankul + ')' + '   ' + obj.wordPower.englishGloss} {...a11yProps(idx)}
                                            // <Tab key={obj.wordPower._id} label={obj.wordPower.hanqca + '(' + obj.wordPower.hankul + ')' + '   ' + obj.wordpower.englishGloss} {...a11yProps(idx)}
                                        />)}
                                </Tabs> :
                                    <h6 style={{color: "green"}}><i>All yemun matched.</i></h6>
                                }

                                <div className="ir-WordPower-tabpanels">
                                    {unmatchedYemun.map((obj, idx) => <TabPanel index={idx} value={yemunTabIdx} key={obj.wordPower._id}>
                                        <div className="ir-WordPower-header">
                                            <h5>Unmatched yemun of {obj.wordPower.hanqca + '(' + obj.wordPower.hankul + ')'}</h5>
                                        </div>
                                        <div className="ir-WordPower-header">
                                            <span><i>Please edit if necessary. If not, leave as is.</i></span>
                                        </div>
                                        {obj.unmatchedYemun.map(example => (
                                            <Accordion>
                                                <AccordionSummary style={{display: 'flex', justifyContent: 'spaceBetween'}} expandIcon={<ExpandMoreIcon/>}>
                                                    <Typography>{example.hanqcaizedSentence}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div>
                                                        Simple Hanja:<br/>
                                                        <textarea
                                                            defaultValue={example.simpleHanqca}
                                                            style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                            onChange={event => yemunToEdit[obj.wordPower._id][example._id].simpleHanqca = event.target.value}
                                                        ></textarea><br/>
                                                        <br />
                                                        Hanjaized Sentence:<br/>
                                                        <textarea
                                                            defaultValue={example.hanqcaizedSentence}
                                                            style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                            onChange={event => yemunToEdit[obj.wordPower._id][example._id].hanqcaizedSentence = event.target.value}
                                                        ></textarea><br/>
                                                        <br />
                                                        Korean Sentence:<br/>
                                                        <textarea
                                                            defaultValue={example.koreanSentence}
                                                            style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                            onChange={event => yemunToEdit[obj.wordPower._id][example._id].koreanSentence = event.target.value}>
                                                    </textarea><br/>
                                                        <br />
                                                        Translation:<br/>
                                                        <textarea
                                                            defaultValue={example.translation}
                                                            style={{overflowWrap: 'break-word', width: 450}} rows="2"
                                                            onChange={event => yemunToEdit[obj.wordPower._id][example._id].translation = event.target.value}>
                                                    </textarea><br/>
                                                        <br />
                                                        {isSaving && <CircularProgress className="ir-WordPower-saving" size="small" />}
                                                        <Button style={{
                                                            marginRight: '4px',
                                                            backgroundColor: '#00284d',
                                                            color: 'white',
                                                            width: '20%'
                                                        }} onClick={() => this.saveYemun(obj.wordPower._id, example._id)}>{isSaving ? 'Saving ...' : 'Save'}</Button>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))
                                            // : <h6 style={{color: "green"}}><i>All yemun matched.</i></h6>
                                        }
                                    </TabPanel>)}
                                </div>
                            </div>
                        )}
                    </TabPanel>
                </div>
                }
            </div>
        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            newHanja: state.lessons.newHanja,
            newHanjaCombos: state.lessons.newHanjaCombos
        };
    };


export default withRouter(connect(mapStateToProps, {getNewHanja, getNewHanjaCombos})(WordPower));
