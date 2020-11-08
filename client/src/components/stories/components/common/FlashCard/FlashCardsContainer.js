import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import FlashCard from './FlashCard'

import './FlashCardsContent.css'

class FlashCardContainer extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            vocabQueue: [],
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null
        })
        this.answeredQuestion.bind(this)
    }

    componentDidMount() {
        let {vocabList, savedVocabList, openFiltered, cookies, storyTitle} = this.props;
        let vocabQueue = []

        // Temp measure to fix infinite loop (Add static options) :
        let numVocabsRequired = 4 - vocabList.length;
        if (0 < vocabList.length && vocabList.length < 4)
            for (let i = vocabList.length ; i < 4 ; i++) {
                vocabList.push({english: `Add ${numVocabsRequired} more vocabs`, korean: `Add ${numVocabsRequired} more vocabs`, _id: "1"})
            }

        vocabList.forEach(function (aVocab) {
            let options = []
            let eng = aVocab.english.split(":").length > 1? aVocab.english.split(":")[1].trim() : aVocab.english;
            let kor = aVocab.english.split(":").length > 1? aVocab.english.split(":")[0].trim() : aVocab.korean;
            let question = {
                vocabKor: kor,
                vocabEng: eng,
                isAnswer: true
            }
            options.push(question)
            let indexUsed = [];
            for (let i = 0; i < 3; i++) {
                let index = Math.floor((Math.random() * +vocabList.length));
                while (vocabList[index] === aVocab || indexUsed.indexOf(index) !== -1) {
                    index = Math.floor((Math.random() * +vocabList.length));
                }
                options.push({
                    vocabKor: vocabList[index].korean,
                    vocabEng: vocabList[index].english,
                    isAnswer: false
                })
                indexUsed.push(index);
            }
            let rotate = Math.floor((Math.random() * options.length + 1))
            for (let i = 0; i < rotate; i++) {
                options.push(options[0])
                options.splice(0, 1);
            }
            // Only show saved vocabs
            if (openFiltered)
                for (const savedVocab of savedVocabList) {
                    if (savedVocab === aVocab._id) {
                        vocabQueue.push({
                            vocabKor: aVocab.korean,
                            vocabEng: aVocab.english,
                            options: options,
                            vocabId: aVocab._id
                        })
                        break;
                    }
                }
            else {
                vocabQueue.push({
                    vocabKor: aVocab.korean,
                    vocabEng: aVocab.english,
                    options: options,
                    vocabId: aVocab._id
                })
            }
        })
        // Start from saved place
        const savedFlashCard = openFiltered? cookies.get(storyTitle+'-fav') : cookies.get(storyTitle);
        this.setState({ vocabQueue },
            () => {
                if (savedFlashCard) {
                    const savedScore = savedFlashCard.score;
                    const savedQuestionId = savedFlashCard.questionId;
                    let answeredQuestions = this.state.answeredQuestions;
                    let vocabQueue = this.state.vocabQueue;

                    for (let i = 0; i < this.state.vocabQueue.length ; i++) {
                        if (vocabQueue[0].vocabId !== savedQuestionId) {
                            answeredQuestions.push(vocabQueue[0]);
                            vocabQueue.splice(0,1);
                        } else break;
                    }

                    this.setState({
                        answeredCurrentQuestion: false,
                        answeredCorrectly: null,
                        vocabQueue,
                        answeredQuestions,
                        score: savedScore
                    });
                }})
    }

    answeredQuestion = (answer, question, isAnswer) => {
        this.setState({
            answeredCurrentQuestion: true,
            score: answer === question.vocabEng ? this.state.score + 1 : this.state.score,
            answeredCorrectly: isAnswer
        })
    }

    handleNextQuestion = (question) => {
        const { cookies, openFiltered, storyTitle } = this.props;
        let {vocabQueue, answeredQuestions} = this.state
        vocabQueue.splice(0, 1)
        answeredQuestions.push(question)
        this.setState({
            answeredCurrentQuestion: false,
            answeredCorrectly: null,
            vocabQueue,
            answeredQuestions,
        });

        if (vocabQueue.length === 0)
        // If reached end of questions, remove cookie
            openFiltered? cookies.remove(storyTitle+'-fav') : cookies.remove(storyTitle);
        else {
            // Set cookie
            const temp = {
                score: this.state.score,
                questionId: vocabQueue[0].vocabId
            };
            openFiltered? cookies.set(storyTitle+'-fav',temp) : cookies.set(storyTitle, temp)
        }
    };

    handleStartOver = () => {
        const { cookies, openFiltered, storyTitle } = this.props;
        this.setState({
            vocabQueue: [],
            answeredQuestions: [],
            score: 0,
            answeredCurrentQuestion: false,
            answeredCorrectly: null
        });

        openFiltered? cookies.remove(storyTitle+'-fav') : cookies.remove(storyTitle);
        this.componentDidMount()
    };

    render() {
        let question = this.state.vocabQueue[0]
        let isSaved = false;
        for (let savedVocab of this.props.savedVocabList) {
            if (question && question.vocabId === savedVocab) {
                isSaved = true;
                break;
            }
        }
        const isLastQuestion = this.state.vocabQueue.length === 0;

        return (
            <Card style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '450px',
                width: '850px'
            }}>
                <Grid container style={{height: '100%'}} justify={'center'}>
                    <Grid item xs={12}
                          style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              textAlign: 'center',
                              height: '8%',
                              backgroundColor: this.state.answeredCorrectly ? 'rgba(66,179,91,0.1)' : this.state.answeredCorrectly === false ? 'rgba(255,0,0,0.1)' : null
                          }}>
            <span style={{margin: '0', fontSize: '1.5rem'}}>
              {this.state.answeredCorrectly ? 'Correct' : this.state.answeredCorrectly === false ? 'Incorrect' : ' '}
            </span>
                    </Grid>
                    <Grid container style={{height: '92%', margin: '16px'}}>
                        <Grid container className={'Flashcards-title'}
                              style={{borderBottom: 'solid 1px rgba(0,0,0,0.12', height: '10%'}}>
                            <Grid item xs={6}>
                                <h2>Flash Card Study</h2>
                            </Grid>
                            <Grid item xs={6} style={{textAlign: 'right'}}>
                                {
                                    isLastQuestion?
                                        <h2>{`Score: ${this.state.score}/${this.state.answeredQuestions.length}`}</h2>
                                        :
                                        <h2>{`Score: ${this.state.score}/${this.state.answeredQuestions.length + 1}`}</h2>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} justify={'center'} style={{height: '65%'}}>
                            {isLastQuestion?
                                <h1 style={{ textAlign: 'center', position: 'relative', bottom: '-35%' }}>Your Final Score Is: {this.state.score}/{this.state.answeredQuestions.length} </h1>
                                :
                                <FlashCard question={question}
                                           answeredQuestion={this.answeredQuestion}
                                           answeredCurrentQuestion={this.state.answeredCurrentQuestion}
                                           style={{width: '100%', height: '80%'}}
                                           isSaved={isSaved}
                                           handleSave={this.props.handleSave}
                                           handleUnsave={this.props.handleUnsave}
                                />
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <div className={'Flashcards-question-count'}>
                                {isLastQuestion?
                                    <h4 style={{marginRight: '5%'}}>{`Question ${this.state.answeredQuestions.length}/${this.state.vocabQueue.length + this.state.answeredQuestions.length}`}</h4>
                                    :
                                    <h4 style={{marginRight: '5%'}}>{`Question ${this.state.answeredQuestions.length + 1}/${this.state.vocabQueue.length + this.state.answeredQuestions.length}`}</h4>
                                }
                                <Button variant="contained" style={{backgroundColor: '#00284d', color: 'white'}} onClick={() => this.handleStartOver()}>Start Over</Button>
                            </div>
                            <div style={{float: 'right'}}>
                                <Button disabled={!this.state.answeredCurrentQuestion}
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