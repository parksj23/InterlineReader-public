import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal'
import FlashCardContainer from '../../components/FlashCard/FlashCardsContainer';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import './Quizzes.css';
import { withCookies } from 'react-cookie';
import {getCharacters, getPhonetics, getRadicals} from "../../../actions/KORN351/Okpyeon";
import {getNewHanjaCombos, getPracticeSentences} from "../../../actions/KORN351/Lessons";

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            primaryQuestionList: [],
            isPracSent: false,
            quizTopic: ''
        }
    }

    componentWillMount() {
        if (this.props.characters.length === 0)
            this.props.getCharacters();
        if (this.props.phonetics.length === 0)
            this.props.getPhonetics();
        if (this.props.radicals.length === 0)
            this.props.getRadicals();
        if (this.props.newHanjaCombos.length === 0)
            this.props.getNewHanjaCombos();
        if (this.props.pracSentences.length === 0)
            this.props.getPracticeSentences();
    }

    handleClose = () => {
        this.setState({
            showModal: false,
            primaryQuestionList: [],
            secondaryQuestionList: [],
            quizTopic: ''
        })
    };

    openModal = (topic, lesson) => {
        let quizTopic = topic + "-" + lesson;

        const {characters, phonetics, radicals, newHanjaCombos, pracSentences} = this.props;
        let temp = false;
        let primQuestionList = [];

        if (topic === "new-chars") {
            characters.forEach(char => {
                if (char.lesson.toString() === lesson)
                    primQuestionList.push({
                        _id: char._id,
                        question: "Meaning: " + char.meaning + " | Primary 訓 (훈) Meaning: " + char.primaryHoonMeaning,
                        answer: char.hanja
                    })
            });
        } else if (topic === "rad") {
            radicals.forEach(rad => {
                if (rad.lesson.toString() === lesson)
                    primQuestionList.push({
                        _id: rad._id,
                        question: rad.radicalHangul,
                        answer: rad.radical
                    })
            });
        } else if (topic === "phon") {
            phonetics.forEach(phon => {
                if (phon.lesson.toString() === lesson)
                    primQuestionList.push({
                        _id: phon._id,
                        question: phon.pronunciation,
                        answer: phon.phonetic
                    })
            });
        } else if (topic === "new-combo") {
            newHanjaCombos.forEach(combo => {
                if (lesson === "0") {
                    // Build Cumulative
                    primQuestionList.push({
                        _id: combo._id,
                        question: combo.hanja + ": " + combo.kor,
                        answer: combo.eng
                    })
                } else {
                    if (combo.lesson === lesson)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ": " + combo.kor,
                            answer: combo.eng
                        })
                }
            });
        } else if (topic === "all-combo") {
            if (lesson === "0")
                newHanjaCombos.forEach(combo => {
                    // Build Cumulative
                    if (combo.isAllCombo)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ": " + combo.kor,
                            answer: combo.eng
                        })
                });
            else
                newHanjaCombos.forEach(combo => {
                    if (combo.lesson === lesson && combo.isAllCombo)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ": " + combo.kor,
                            answer: combo.eng
                        })
                });
        } else if (topic === "prac-sent") {
            temp = true;
            if (lesson === "0")
                pracSentences.forEach(sentence => {
                    primQuestionList.push({
                        _id: sentence._id,
                        question: sentence.question,
                        answer: sentence.answer
                    })
                });
            else
                pracSentences.forEach(sentence => {
                    if (sentence.lesson === lesson)
                        primQuestionList.push({
                            _id: sentence._id,
                            question: sentence.question,
                            answer: sentence.answer
                        })
                });
        }

        this.setState({
            primaryQuestionList: primQuestionList,
            quizTopic: quizTopic,
            showModal: true,
            isPracSent: temp
        })
    };

    render() {
        const {primaryQuestionList, isPracSent, quizTopic, showModal} = this.state;
        return (
            <Grid container>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={showModal}
                    onClose={this.handleClose}
                >
                    <FlashCardContainer primaryQuestionList={primaryQuestionList} isPracSent={isPracSent} quizTopic={quizTopic} cookies={this.props.cookies}/>
                </Modal>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                Quizzes
                            </h3>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <br/>
                        <h5>New Characters</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/>
                        <h5>Radicals</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("rad", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/>

                        <h5>Phonetics</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("phon", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/>

                        <h5>New Combos Vocab</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "0")}}>
                                <CardContent>
                                    Cumulative
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-combo", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/>

                        <h5>All Combos Vocab</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "0")}}>
                                <CardContent>
                                    Cumulative
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("all-combo", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/>

                        <h5>Practice Sentences</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "0")}}>
                                <CardContent>
                                    Cumulative
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "2")}}>
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "3")}}>
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "4")}}>
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "5")}}>
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "6")}}>
                                <CardContent >
                                    Lesson 6
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "7")}}>
                                <CardContent >
                                    Lesson 7
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "8")}}>
                                <CardContent >
                                    Lesson 8
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "9")}}>
                                <CardContent >
                                    Lesson 9
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "10")}}>
                                <CardContent >
                                    Lesson 10
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "11")}}>
                                <CardContent >
                                    Lesson 11
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "12")}}>
                                <CardContent >
                                    Lesson 12
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "13")}}>
                                <CardContent >
                                    Lesson 13
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "14")}}>
                                <CardContent >
                                    Lesson 14
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "15")}}>
                                <CardContent >
                                    Lesson 15
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "16")}}>
                                <CardContent >
                                    Lesson 16
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "17")}}>
                                <CardContent >
                                    Lesson 17
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "18")}}>
                                <CardContent >
                                    Lesson 18
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "19")}}>
                                <CardContent >
                                    Lesson 19
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("prac-sent", "20")}}>
                                <CardContent >
                                    Lesson 20
                                </CardContent>
                            </Card>
                        </div>
                        <br/><br/><br/><br/><br/>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        phonetics : state.okpyeon.phonetics,
        characters : state.okpyeon.characters,
        radicals : state.okpyeon.radicals,
        newHanjaCombos: state.lessons.newHanjaCombos,
        pracSentences: state.lessons.pracSentences
    };
};

export default withCookies(withRouter(connect(mapStateToProps, {getRadicals, getCharacters, getPhonetics, getNewHanjaCombos, getPracticeSentences})(Quizzes)));
