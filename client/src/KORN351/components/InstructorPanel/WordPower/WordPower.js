import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import './WordPower.css';

import { Button, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Divider, IconButton, Typography, Modal, Box, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TabPanel, { a11yProps } from '../../../../components/common/TabPanel';
import PlusIcon from '@material-ui/icons/Add';
import axios from 'axios';
import _ from 'lodash';


class WordPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordPowerData: [],
            wordPowerToEdit: {},
            yemunToEdit: {},
            showLoading: true,
            isWordPowerModalOpen: false,
            isYemunModalOpen: false,
            newWordPower: {},
            newYemun: {},
            tabIndex: 0,
            yemunTabIdx: 0
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
        console.log('-------', this.currentLesson);
        axios({
            method: "get",
            url: '/api/wordPower/list',
            params: {lesson: this.currentLesson}
        })
            .then(({ data }) => {
                const wordPowerToEdit = {};
                const yemunToEdit = {};
                data.forEach(d => {
                    wordPowerToEdit[d._id] = {};
                    yemunToEdit[d._id] = d.examples.map(e => ({ [e._id]: {} }))
                });
                this.setState({wordPowerData: data, showLoading: false, wordPowerToEdit, yemunToEdit});
            })
            .catch(() => {
                console.log("Error receiving wordPower data");
            });
    }

    saveWordPower(id) {
        const { wordPowerToEdit } = this.state;
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
                })
            }));
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
                })
            }));
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

    onYemunModalOpen() {
        this.setState(prevState => ({ isYemunModalOpen: !prevState.isYemunModalOpen, newYemun: {} }));
    }

    render() {
        const {showLoading, wordPowerData, wordPowerToEdit, isWordPowerModalOpen, newWordPower, tabIndex, yemunTabIdx, yemunToEdit, newYemun, isYemunModalOpen} = this.state;

        return showLoading ? <CircularProgress style={{display: 'flex', margin: '10px auto'}}/> : (
            <div className="ir-WordPower edit-lesson-background">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={(e, tabIndex) => this.setState({ tabIndex })} aria-label="basic tabs example">
                        <Tab label="Words" />
                        <Tab label="Examples" />
                    </Tabs>
                </Box>
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
                                                style={{width: 200}}
                                                onChange={event => newWordPower.hanqca = event.target.value}/><br/>
                            <br />
                            Hankul: <input type="text" placeholder="Type Hankul.."
                                                    style={{width: 200}}
                                                    onChange={event => newWordPower.hankul = event.target.value}/><br/>
                            <br />
                            English Gloss: <input type="text" placeholder="Type English Gloss.."
                                                    style={{width: 200}}
                                                    onChange={event => newWordPower.englishGloss = event.target.value}/><br/>
                            <br />
                            <Button style={{
                                marginRight: '4px',
                                backgroundColor: '#00284d',
                                color: 'white',
                                width: '20%'
                            }} onClick={() => this.createWordPower()}>Save</Button>
                            <Button variant="contained" onClick={() => this.onWordPowerModalOpen()}>Cancel</Button>
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
                                                            style={{width: 200}}
                                                            onChange={event => wordPowerToEdit[wordpower._id].hanqca = event.target.value}/><br/>
                                        <br />
                                        Hankul: <input type="text" defaultValue={wordpower.hankul}
                                                                style={{width: 200}}
                                                                onChange={event => wordPowerToEdit[wordpower._id].hankul = event.target.value}/><br/>
                                        <br />
                                        English Gloss: <input type="text" defaultValue={wordpower.englishGloss}
                                                                style={{width: 200}}
                                                                onChange={event => wordPowerToEdit[wordpower._id].englishGloss = event.target.value}/><br/>
                                        <br />
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#00284d',
                                            color: 'white',
                                            width: '20%'
                                        }} onClick={() => this.saveWordPower(wordpower._id)}>Save</Button>
                                        <Button style={{
                                            marginRight: '4px',
                                            backgroundColor: '#f6152f',
                                            color: 'white',
                                            width: '20%'
                                        }}
                                        onClick={() => this.deleteWordPower(wordpower._id)}>Delete</Button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </div>
                    ))}
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <div className="ir-WordPower-header">
                        <h4>Examples</h4>
                    </div>
                    <Divider/><br/>
                    <div className="ir-WordPower-examples">
                        <Tabs variant="scrollable" className="ir-WordPower-tabs" value={yemunTabIdx} orientation="vertical" onChange={(e, yemunTabIdx) => this.setState({ yemunTabIdx })}>
                            {wordPowerData.map((wordpower, idx) => <Tab key={wordpower._id} label={wordpower.hanqca + '(' + wordpower.hankul + ')' + '   ' + wordpower.englishGloss} {...a11yProps(idx)} />)}
                        </Tabs>
                        <div className="ir-WordPower-tabpanels">
                            {wordPowerData.map((wordpower, idx) => <TabPanel index={idx} value={yemunTabIdx} key={wordpower._id}>
                                <div className="ir-WordPower-header">
                                    <h5>Examples of {wordpower.hanqca + '(' + wordpower.hankul + ')' + '   ' + wordpower.englishGloss}</h5>
                                    <IconButton size="small" onClick={this.onYemunModalOpen} className="primary-button" variant="contained"><PlusIcon /></IconButton>
                                </div>
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
                                        }} onClick={() => this.createYemun(wordpower._id)}>Save</Button>
                                        <Button variant="contained" onClick={() => this.onYemunModalOpen()}>Cancel</Button>
                                    </Box>
                                </Modal>
                                {wordpower.examples.length ? wordpower.examples.map(example => (
                                    <Accordion>
                                        <AccordionSummary style={{display: 'flex', justifyContent: 'spaceBetween'}} expandIcon={<ExpandMoreIcon/>}>
                                            <Typography>{example.translation}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                Simple Hanja:<br/>
                                                    <textarea 
                                                        defaultValue={example.simpleHanqca}
                                                        style={{overflowWrap: 'break-word', width: 300}} rows="3"
                                                        onChange={event => yemunToEdit[example._id].simpleHanqca = event.target.value}
                                                    ></textarea><br/>
                                                <br />
                                                Hanjaized Sentence:<br/>
                                                    <textarea
                                                        defaultValue={example.hanqcaizedSentence}
                                                        style={{overflowWrap: 'break-word', width: 300}} rows="3"
                                                        onChange={event => yemunToEdit[example._id].hanqcaizedSentence = event.target.value}
                                                    ></textarea><br/>
                                                <br />
                                                Korean Sentence:<br/>
                                                    <textarea
                                                        defaultValue={example.koreanSentence}
                                                        style={{overflowWrap: 'break-word', width: 300}} rows="3"
                                                        onChange={event => yemunToEdit[example._id].koreanSentence = event.target.value}>
                                                    </textarea><br/>
                                                <br />
                                                Translation:<br/>
                                                    <textarea
                                                        defaultValue={example.translation}
                                                        style={{overflowWrap: 'break-word', width: 300}} rows="3"
                                                        onChange={event => yemunToEdit[example._id].translation = event.target.value}>
                                                    </textarea><br/>
                                                <br />
                                                <Button style={{
                                                    marginRight: '4px',
                                                    backgroundColor: '#00284d',
                                                    color: 'white',
                                                    width: '20%'
                                                }} onClick={() => this.saveYemun(wordpower._id, example._id)}>Save</Button>
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
                            </TabPanel>)}
                        </div>
                    </div>
                </TabPanel>
            </div>
        );
    }
}


export default withRouter(WordPower);
