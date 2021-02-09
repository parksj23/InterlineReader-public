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

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            primaryQuestionList: [],
            secondaryQuestionList: [],
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

        const {characters, phonetics, radicals} = this.props;

        if (topic === "new-chars-new-busu") {
            let primQuestionList = [];
            let secQuestionList = [];

            characters.forEach(char => {
                primQuestionList.push({
                    _id: char._id,
                    question: "Meaning: " + char.meaning + " | Primary 訓 (훈) Meaning: " + char.primaryHoonMeaning,
                    answer: char.hanja
                })
            });

            radicals.forEach(rad => {
                secQuestionList.push({
                    _id: rad._id,
                    question: rad.radicalHangul,
                    answer: rad.radical
                })
            });

            this.setState({
                primaryQuestionList: primQuestionList,
                secondaryQuestionList: secQuestionList,
                quizTopic: quizTopic
            })
        }

        this.setState({
            showModal: true
        });
    };

    render() {
        const {primaryQuestionList, secondaryQuestionList, quizTopic, showModal} = this.state;
        return (
            <Grid container>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={showModal}
                    onClose={this.handleClose}
                >
                    <FlashCardContainer primaryQuestionList={primaryQuestionList} secondaryQuestionList={secondaryQuestionList} quizTopic={quizTopic} cookies={this.props.cookies}/>
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
                        <h5>New Characters & 부수</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card" onClick={() => {this.openModal("new-chars-new-busu", "1")}}>
                                <CardContent>
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>

                        </div>


                        <br/><br/>
                        <h5>Radicals</h5><br/>

                        <h5>Phonetics</h5><br/>

                        <h5>New Combos Vocab</h5><br/>

                        <h5>All Combos Vocab</h5><br/>

                        <h5>Practice Sentences</h5><br/>


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
        radicals : state.okpyeon.radicals
    };
};

export default withCookies(withRouter(connect(mapStateToProps, {getRadicals, getCharacters, getPhonetics})(Quizzes)));
