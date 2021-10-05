import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FlashCard from './FlashCard';
import PracticeSentencesFlashCard from "./PracticeSentencesFlashCard";
import StoreAccessor from '../../../utils/localStore';

import './FlashCardsContent.css';
import { QUIZ_TOPIC_MAP } from '../../../config';


class FlashCardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            questionQueueById: {},
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null,
            nextQuestionId: null,
            openDialog: false
        });

        const inProgressCardsKey = '351inprogress:' + props.quizTopic + ':' + props.lesson;
        const savedCardsKey = '351saved:' + props.quizTopic + ':' + props.lesson;
        this.inProgressCardsStore = new StoreAccessor(inProgressCardsKey);
        this.savedCardsStore = new StoreAccessor(savedCardsKey);
        this.currentStore = this.props.showInProgressCards ? this.inProgressCardsStore : this.savedCardsStore;
    }

    componentDidMount() {
        this.initialize();
    }

    initialize(startOver = false) {
        let { primaryQuestionList, showInProgressCards } = this.props;
        const questionQueue = [];
        const questionQueueById = {};
        const savedCards = this.savedCardsStore.get() || { score: 0, questionIds: [], answeredQuestionIds: [] }

        // Temp measure to fix infinite loop (Add static options) :
        let numVocabsRequired = 4 - primaryQuestionList.length;
        if (0 < primaryQuestionList.length && primaryQuestionList.length < 4)
            for (let i = primaryQuestionList.length ; i < 4 ; i++) {
                primaryQuestionList.push({question: `Add ${numVocabsRequired} more vocabs`, answer: `Add ${numVocabsRequired} more vocabs`, _id: "1"})
            }

        _.shuffle(primaryQuestionList).forEach(function (question) {
            const questionId = question._id.toString();
            let options = [];
            let a = question.answer;
            let answer = {
                answer: a,
                isAnswer: true
            };
            options.push(answer);
            let indexUsed = [];
            for (let i = 0; i < 3; i++) {
                let index = Math.floor((Math.random() * +primaryQuestionList.length));
                while (primaryQuestionList[index] === question || indexUsed.indexOf(index) !== -1) {
                    index = Math.floor((Math.random() * +primaryQuestionList.length));
                }
                options.push({
                    answer: primaryQuestionList[index].answer,
                    isAnswer: false
                });
                indexUsed.push(index);
            }
            let rotate = Math.floor((Math.random() * options.length + 1))
            for (let i = 0; i < rotate; i++) {
                options.push(options[0]);
                options.splice(0, 1);
            }
            const quesObj = {
                answer: question.answer,
                question: question.question,
                options,
                questionId: questionId,
                isSaved: savedCards.questionIds.includes(questionId) || false
            };
            questionQueue.push(quesObj);
            questionQueueById[questionId] = quesObj;
        });
        //
        // if (secondaryQuestionList.length > 0) {
        //     secondaryQuestionList.forEach(function (question) {
        //         let options = [];
        //         let a = question.answer;
        //         let answer = {
        //             answer: a,
        //             isAnswer: true
        //         };
        //         options.push(answer);
        //         let indexUsed = [];
        //         for (let i = 0; i < 3; i++) {
        //             let index = Math.floor((Math.random() * +secondaryQuestionList.length));
        //             while (secondaryQuestionList[index] === question || indexUsed.indexOf(index) !== -1) {
        //                 index = Math.floor((Math.random() * +secondaryQuestionList.length));
        //             }
        //             options.push({
        //                 answer: secondaryQuestionList[index].answer,
        //                 isAnswer: false
        //             });
        //             indexUsed.push(index);
        //         }
        //         let rotate = Math.floor((Math.random() * options.length + 1))
        //         for (let i = 0; i < rotate; i++) {
        //             options.push(options[0]);
        //             options.splice(0, 1);
        //         }
        //         questionQueue.push({
        //             answer: question.answer,
        //             question: question.question,
        //             options: options,
        //             questionId: question._id
        //         })
        //     });
        // }

        // Start from saved place
        const savedFlashCard = this.currentStore.get();
        this.setState({ questionQueueById, nextQuestionId: questionQueue.length ? questionQueue[0].questionId : null },
            () => {
                if (savedFlashCard) {
                    const savedScore = startOver ? 0 : savedFlashCard.score || 0;
                    const savedQuestionIds = savedFlashCard.questionIds || [];
                    let savedQuestionQueueById = null;
                    if (!showInProgressCards) {
                        savedQuestionQueueById = Object.keys(questionQueueById)
                            .filter(key => savedQuestionIds.includes(key))
                            .reduce((obj, key) => {
                                obj[key] = questionQueueById[key];
                                return obj;
                            }, {});
                    }


                    let answeredQuestions = questionQueue.filter(q => savedQuestionIds.includes(q.questionId));
                    if (!showInProgressCards && !startOver) {
                        answeredQuestions = questionQueue.filter(q => (savedFlashCard.answeredQuestionIds || []).includes(q.questionId))
                    } else if (startOver) {
                        answeredQuestions = [];
                    }

                    const nextQuestionId = this.getNextQuestionId(answeredQuestions);

                    this.setState({
                        answeredCurrentQuestion: false,
                        answeredCorrectly: null,
                        nextQuestionId,
                        answeredQuestions,
                        score: savedScore,
                        questionQueueById: savedQuestionQueueById || questionQueueById
                    });
                }});
    }

    onQuestionSave = (questionId) => {
        const { questionQueueById } = this.state;
        const savedCards = this.savedCardsStore.get() || { score: 0, questionIds: [], answeredQuestionIds: [] };
        const savedQuestionIds = savedCards.questionIds;
        savedQuestionIds.push(questionId);
        savedCards.questionIds = savedQuestionIds;
        this.savedCardsStore.set(savedCards);
        questionQueueById[questionId].isSaved = true;
        this.setState(prevState => {
            const clonedQuestionQueueById = _.clone(prevState.questionQueueById);
            clonedQuestionQueueById[questionId].isSaved = true;
            return { questionQueueById: clonedQuestionQueueById };
        });
    }

    onQuestionUnSave = (questionId) => {
        const savedCards = this.savedCardsStore.get() || { score: 0, questionIds: [], answeredQuestionIds: [] };
        const savedQuestionIds = savedCards.questionIds;
        savedCards.questionIds = savedQuestionIds.filter(id => id !== questionId);
        this.savedCardsStore.set(savedCards);
        this.setState(prevState => {
            const clonedQuestionQueueById = _.clone(prevState.questionQueueById);
            clonedQuestionQueueById[questionId].isSaved = false;
            return { questionQueueById: clonedQuestionQueueById };
        });
    }

    getNextQuestionId(answeredQuestions) {
        const { questionQueueById } = this.state;
        const { showInProgressCards } = this.props;
        let newQuestionQueueById = _.clone(questionQueueById);
        if (!showInProgressCards) {
            const savedFlashCard = this.currentStore.get();
            const savedQuestionIds = savedFlashCard.questionIds;
            newQuestionQueueById = Object.keys(questionQueueById)
                .filter(key => savedQuestionIds.includes(key))
                .reduce((obj, key) => {
                    obj[key] = questionQueueById[key];
                    return obj;
                }, {});
        }
        
        if (!answeredQuestions) {
            return Object.keys(newQuestionQueueById)[0];
        }
        const remainingQuestions = Object.values(newQuestionQueueById).filter(v => !answeredQuestions.map(a => a.questionId).includes(v.questionId));

        if (remainingQuestions.length) {
            return remainingQuestions[0].questionId;
        }
    }

    answeredQuestion = (answer, question, isAnswer) => {
        this.setState(prevState => ({
            answeredCurrentQuestion: true,
            score: answer === question.answer ? prevState.score + 1 : prevState.score,
            answeredCorrectly: isAnswer
        }));
    };

    enableNextButton = () => {
        this.setState({
            answeredCurrentQuestion: true,
            score: 0,
            answeredCorrectly: true
        })
    };

    handleNextQuestion = (question) => {
        const { questionQueueById, answeredQuestions } = this.state;

        const questionQueue = Object.values(questionQueueById);
        answeredQuestions.push(question);
        this.setState({
            answeredCurrentQuestion: false,
            answeredCorrectly: null,
            nextQuestionId: this.getNextQuestionId(answeredQuestions),
            answeredQuestions
        });

        const currentFlashcardsInfo = this.currentStore.get() || {};
        if ((currentFlashcardsInfo.questionIds || []).length === questionQueue.length && this.props.showInProgressCards) {
            this.inProgressCardsStore.remove()
        }
    };

    handleStartOver = () => {
        const { showInProgressCards } = this.props;
        this.setState({
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null
        });

        let savedFlashCard = this.currentStore.get();
        if (savedFlashCard !== undefined && showInProgressCards) {
            if (showInProgressCards) {
                this.inProgressCardsStore.remove();
            } else {
                savedFlashCard.answeredQuestionIds = [];
                this.currentStore.set(savedFlashCard);
            }
        }

        this.initialize(true);
    };

    onCancelSave = () => {
        this.inProgressCardsStore.remove()
        this.setState({ openDialog: false });
        this.props.onClose();
    }

    onCloseStudy = () => {
        const { onClose, showInProgressCards } = this.props;
        const { answeredQuestions, questionQueueById, score } = this.state;
        const questionQueue = Object.values(questionQueueById);
        if (answeredQuestions.length && answeredQuestions.length !== questionQueue.length && this.props.showInProgressCards) {
            this.setState({ openDialog: true });
        } else if (!showInProgressCards) {
            const currentFlashcardsInfo = this.savedCardsStore.get() || {};
            const updatedFlashcardsInfo = { score, questionIds: currentFlashcardsInfo.questionIds || [] };

            if (answeredQuestions.length) {
                updatedFlashcardsInfo.answeredQuestionIds = answeredQuestions.map(a => a.questionId);
            } else {
                updatedFlashcardsInfo.answeredQuestionIds = [];
            }
            this.savedCardsStore.set(updatedFlashcardsInfo);
            onClose();
        } else {
            this.props.onClose();
        }
    }
    
    saveChanges = () => {
        const { onClose } = this.props;
        const { answeredQuestions, score } = this.state;
        const currentFlashcardsInfo = this.inProgressCardsStore.get() || {};
        const updatedFlashcardsInfo = { score, questionIds: currentFlashcardsInfo.questionIds || [] };

        if (answeredQuestions.length) {
            updatedFlashcardsInfo.questionIds = answeredQuestions.map(a => a.questionId);
        }
        this.inProgressCardsStore.set(updatedFlashcardsInfo);
        this.setState({ openDialog: false });
        onClose();
    }


    render() {
        const { questionQueueById, nextQuestionId, answeredQuestions, score, answeredCurrentQuestion, answeredCorrectly, openDialog } = this.state;
        const { lesson, quizTopic } = this.props;
        const questionQueue = Object.values(questionQueueById);
        const question = questionQueueById[nextQuestionId];

        const savedCardsStore = this.savedCardsStore.get() || { score: 0, questionIds: [], answeredQuestionIds: [] };

        const isLastQuestion = questionQueue.length === answeredQuestions.length;

        return (
            <Card className="flashcard-container">
                <Grid container style={{height: '100%'}} justify={'center'}>
                    <Grid item xs={12}
                          style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              textAlign: 'center',
                              height: '8%',
                              backgroundColor: answeredCorrectly ? 'rgba(66,179,91,0.1)' : answeredCorrectly === false ? 'rgba(255,0,0,0.1)' : null
                          }}>
            <span style={{margin: '0', fontSize: '1.5rem'}}>
              {answeredCorrectly ? 'Correct' : answeredCorrectly === false ? 'Incorrect' : ' '}
            </span>
                    </Grid>
                    <Grid container style={{height: '92%', margin: '16px'}}>
                        <Grid container className={'Flashcards-title'}
                              style={{borderBottom: 'solid 1px rgba(0,0,0,0.12', height: '10%'}} xs={12}>
                            <Grid item xs={9} style={{display: 'flex'}}>
                                <h2 style={{marginRight: '20px'}}>Flash Card Study</h2>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'right'}}>
                                {
                                    isLastQuestion?
                                        <h3>{`Score: ${score}/${answeredQuestions.length}`}</h3>
                                        :
                                        <h3>{`Score: ${score}/${answeredQuestions.length + 1}`}</h3>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} justify={'center'} style={{height: '65%'}}>
                            {isLastQuestion?
                                <h1 style={{ textAlign: 'center', position: 'relative', bottom: '-35%' }}>Your Final Score Is: {score}/{answeredQuestions.length} </h1>
                                :
                                this.props.isPracticeSentence?
                                    <PracticeSentencesFlashCard question={question}
                                        answeredQuestion={this.answeredQuestion}
                                        answeredCurrentQuestion={answeredCurrentQuestion}
                                        style={{width: '100%', height: '80%'}}
                                        isSaved={!!(question || {}).isSaved}
                                    />
                                    :
                                    <FlashCard question={question}
                                        answeredQuestion={this.answeredQuestion}
                                        answeredCurrentQuestion={answeredCurrentQuestion}
                                        style={{width: '100%', height: '80%'}}
                                        isSaved={!!(question || {}).isSaved}
                                        handleSave={this.onQuestionSave}
                                        handleUnsave={this.onQuestionUnSave}
                                    />
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <div className={'Flashcards-question-count'}>
                                {isLastQuestion ?
                                    <h4 style={{marginRight: '5%'}}>{`Question ${answeredQuestions.length}/${questionQueue.length}`}</h4>
                                    :
                                    <h4 style={{marginRight: '5%'}}>{`Question ${answeredQuestions.length + 1}/${questionQueue.length}`}</h4>
                                }
                                <Button variant="contained" className="start-over-button-351" style={{backgroundColor: '#00284d', color: 'white'}} onClick={() => this.handleStartOver()}>Start Over</Button>
                            </div>
                            <div style={{float: 'right'}}>
                                <Button className={'Flashcard-options-button-next'} variant="contained"
                                    style={{ margin: '6px'}}
                                    onClick={this.onCloseStudy}> CLOSE </Button>
                                <Button disabled={!answeredCurrentQuestion}
                                    className={'Flashcard-options-button-next'} variant="outlined" color="primary"
                                    style={{margin: '6px'}}
                                    onClick={() => this.handleNextQuestion(question)}> NEXT </Button>
                                <Dialog
                                    open={openDialog}
                                    aria-labelledby="draggable-dialog-title"
                                >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                        Save changes before closing?
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Do you want to save your progress in the <strong>{QUIZ_TOPIC_MAP[quizTopic]} Lesson {lesson}</strong>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button autoFocus onClick={this.onCancelSave} color="primary">
                                        No, Close
                                    </Button>
                                    <Button onClick={this.saveChanges} color="primary">
                                        Yes, Save
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Card>
        )
    }
}

FlashCardContainer.propTypes = {
    isPracticeSentence: PropTypes.bool,
    lesson: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    primaryQuestionList: PropTypes.array.isRequired,
    quizTopic: PropTypes.string.isRequired,
    showInProgressCards: PropTypes.bool,
};

FlashCardContainer.defaultProps = {
    showInProgressCards: true
};

export default FlashCardContainer;
