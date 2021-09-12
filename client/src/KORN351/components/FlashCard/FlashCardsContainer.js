import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import FlashCard from './FlashCard'
import './FlashCardsContent.css'
import PracticeSentencesFlashCard from "./PracticeSentencesFlashCard";
import _ from 'lodash';

class FlashCardContainer extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            questionQueueById: {},
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null
        });
    }

    componentDidMount() {
        let {primaryQuestionList, quizTopic, cookies} = this.props;
        let questionQueue = [];
        const questionQueueById = {};

        // Temp measure to fix infinite loop (Add static options) :
        let numVocabsRequired = 4 - primaryQuestionList.length;
        if (0 < primaryQuestionList.length && primaryQuestionList.length < 4)
            for (let i = primaryQuestionList.length ; i < 4 ; i++) {
                primaryQuestionList.push({question: `Add ${numVocabsRequired} more vocabs`, answer: `Add ${numVocabsRequired} more vocabs`, _id: "1"})
            }

        primaryQuestionList.forEach(function (question) {
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
                options: options,
                questionId: question._id
            };
            questionQueue.push(quesObj);
            questionQueueById[question._id] = quesObj;
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
        const savedFlashCard = cookies.get(quizTopic);
        this.setState({ questionQueueById },
            () => {
                if (savedFlashCard) {
                    const savedScore = savedFlashCard.score || 0;
                    const savedQuestionIds = savedFlashCard.questionIds || [];

                    let answeredQuestions = questionQueue.filter(q => savedQuestionIds.includes(q.questionId));
                    const nextQuestionId = answeredQuestions.length ? this.getNextQuestionId(answeredQuestions) : questionQueue.length ? questionQueue[0].questionId : null;

                    this.setState({
                        answeredCurrentQuestion: false,
                        answeredCorrectly: null,
                        nextQuestionId,
                        answeredQuestions,
                        score: savedScore
                    });
                }})
    }

    getNextQuestionId(answeredQuestions) {
        const { questionQueueById } = this.state;
        const remainingQuestions = Object.values(questionQueueById).filter(v => !answeredQuestions.map(a => a.questionId).includes(v.questionId));
        if (remainingQuestions.length) {
            return remainingQuestions[0].questionId;
        }
    }

    answeredQuestion = (answer, question, isAnswer) => {
        this.setState({
            answeredCurrentQuestion: true,
            score: answer === question.answer ? this.state.score + 1 : this.state.score,
            answeredCorrectly: isAnswer
        });
    };

    enableNextButton = () => {
        this.setState({
            answeredCurrentQuestion: true,
            score: 0,
            answeredCorrectly: true
        })
    };

    handleNextQuestion = (question) => {
        const { cookies, quizTopic } = this.props;
        const {questionQueueById, answeredQuestions, score} = this.state;

        const questionQueue = Object.values(questionQueueById);
        answeredQuestions.push(question);
        this.setState({
            answeredCurrentQuestion: false,
            answeredCorrectly: null,
            questionQueue,
            answeredQuestions
        });

        const currentFlashcardsInfo = cookies.get(quizTopic);
        const updatedFlashcardsInfo = { score, questionIds: currentFlashcardsInfo.questionIds };
        if (currentFlashcardsInfo.questionIds.length === questionQueue.length)
        // If reached end of questions, remove cookie
            cookies.remove(quizTopic);
        else {
            // Set cookie
            if (answeredQuestions.length) {
                updatedFlashcardsInfo.questionIds = [...currentFlashcardsInfo.questionIds, _.last(answeredQuestions).questionId];
            }
            cookies.set(quizTopic, updatedFlashcardsInfo)
        }
    };

    handleStartOver = () => {
        const { cookies, quizTopic } = this.props;

        this.setState({
            questionQueueById: {},
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null
        });

        let savedFlashCard = cookies.get(quizTopic);
        if (savedFlashCard !== undefined)
            cookies.remove(quizTopic);

        this.componentDidMount()
    };

    render() {
        const {questionQueueById, nextQuestionId, answeredQuestions, score, answeredCurrentQuestion, answeredCorrectly} = this.state;
        const { onClose } = this.props;
        const questionQueue = Object.values(questionQueueById);
        let question = questionQueue[nextQuestionId];
        let isSaved = false;

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
                                        <h2>{`Score: ${score}/${answeredQuestions.length}`}</h2>
                                        :
                                        <h2>{`Score: ${score}/${answeredQuestions.length + 1}`}</h2>
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
                                                                style={{width: '100%', height: '80%'}}
                                                                isSaved={isSaved}/>
                                    :
                                    <FlashCard question={question}
                                               answeredQuestion={this.answeredQuestion}
                                               style={{width: '100%', height: '80%'}}
                                               isSaved={isSaved}
                                    />
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <div className={'Flashcards-question-count'}>
                                {isLastQuestion?
                                    <h4 style={{marginRight: '5%'}}>{`Question ${answeredQuestions.length}/${
                                    questionQueue.length + answeredQuestions.length}`}</h4>
                                    :
                                    <h4 style={{marginRight: '5%'}}>{`Question ${answeredQuestions.length + 1}/${
                                    questionQueue.length + answeredQuestions.length}`}</h4>
                                }
                                <Button variant="contained" className="start-over-button-351" style={{backgroundColor: '#00284d', color: 'white'}} onClick={() => this.handleStartOver()}>Start Over</Button>
                            </div>
                            <div style={{float: 'right'}}>
                                <Button className={'Flashcard-options-button-next'} variant="contained"
                                    style={{ margin: '6px'}}
                                    onClick={onClose}> CLOSE </Button>
                                <Button disabled={!answeredCurrentQuestion}
                                        className={'Flashcard-options-button-next'} variant="outlined" color="primary"
                                        style={{margin: '6px'}}
                                        onClick={() => this.handleNextQuestion(question)}> NEXT </Button>
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default FlashCardContainer
