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
            grammarQueue: [],

            answeredQuestionsVoc: [],
            answeredQuestionsGram: [],

            scoreVoc: 0,
            scoreGram: 0,

            answeredCurrentQuestion: false,
            answeredCorrectly: null
        })
        this.answeredQuestion.bind(this)
    }

    componentDidMount() {
        let {vocabList, savedVocabList, openFiltered, cookies, storyTitle, grammarList, savedGrammarList} = this.props;
        let vocabQueue = [];
        let grammarQueue = [];

        // Temp measure to fix infinite loop (Add static options) :
        let numVocabsRequired = 4 - vocabList.length;
        if (0 < vocabList.length && vocabList.length < 4)
            for (let i = vocabList.length ; i < 4 ; i++) {
                vocabList.push({english: `Add ${numVocabsRequired} more vocabs`, korean: `Add ${numVocabsRequired} more vocabs`, _id: "1"})
            }
        let numGramsRequired = 4 - grammarList.length;
        if (0 < grammarList.length && grammarList.length < 4)
            for (let i = grammarList.length ; i < 4 ; i++) {
                grammarList.push({english: `Add ${numGramsRequired} more vocabs`, korean: `Add ${numGramsRequired} more vocabs`, _id: "1"})
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
        });

        grammarList.forEach(function (aGram) {
            let options = []
            let gloss = aGram.gloss.split(":").length > 1? aGram.gloss.split(":")[1].trim() : aGram.gloss;
            let pattern = aGram.pattern.split(":").length > 1? aGram.pattern.split(":")[0].trim() : aGram.pattern;
            let question = {
                gramPattern: pattern, //kor
                gramGloss: gloss, //eng
                isAnswer: true
            }
            options.push(question)
            let indexUsed = [];
            for (let i = 0; i < 3; i++) {
                let index = Math.floor((Math.random() * +grammarList.length));
                while (grammarList[index] === aGram || indexUsed.indexOf(index) !== -1) {
                    index = Math.floor((Math.random() * +grammarList.length));
                }
                options.push({
                    gramPattern: grammarList[index].pattern,
                    gramGloss: grammarList[index].gloss,
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
                for (const savedGrammar of savedGrammarList) {
                    if (savedGrammar === aGram._id) {
                        grammarQueue.push({
                            gramPattern: aGram.pattern,
                            gramGloss: aGram.gloss,
                            options: options,
                            grammarId: aGram._id
                        });
                        break;
                    }
                }
            else {
                grammarQueue.push({
                    gramPattern: aGram.pattern,
                    gramGloss: aGram.gloss,
                    options: options,
                    grammarId: aGram._id
                })
            }
        });

        // Start from saved place
        let validStoryTitle = storyTitle.split(' ')[0];
        const savedFlashCard = openFiltered? cookies.get(validStoryTitle+'-fav') : cookies.get(validStoryTitle);
        this.setState({ vocabQueue, grammarQueue },
            () => {
                if (savedFlashCard) {
                    const savedVocScore = savedFlashCard.scoreVoc;
                    const savedGramScore = savedFlashCard.scoreGram;
                    const savedQuestionIdVoc = savedFlashCard.questionIdVoc;
                    const savedQuestionIdGram = savedFlashCard.questionIdGram;

                    let answeredQuestionsVoc = this.state.answeredQuestionsVoc;
                    let vocabQueue = this.state.vocabQueue;

                    for (let i = 0; i < this.state.vocabQueue.length ; i++) {
                        if (vocabQueue[0].vocabId !== savedQuestionIdVoc) {
                            answeredQuestionsVoc.push(vocabQueue[0]);
                            vocabQueue.splice(0,1);
                        } else break;
                    }

                    let answeredQuestionsGram = this.state.answeredQuestionsGram;
                    let grammarQueue = this.state.grammarQueue;

                    for (let i = 0; i < this.state.grammarQueue.length ; i++) {
                        if (grammarQueue[0].grammarId !== savedQuestionIdGram) {
                            answeredQuestionsGram.push(grammarQueue[0]);
                            grammarQueue.splice(0,1);
                        } else break;
                    }

                    this.setState({
                        answeredCurrentQuestion: false,
                        answeredCorrectly: null,
                        vocabQueue,
                        grammarQueue,
                        answeredQuestionsVoc,
                        answeredQuestionsGram,
                        scoreVoc: savedVocScore,
                        scoreGram: savedGramScore
                    });
                }})
    }

    answeredQuestion = (answer, question, isAnswer) => {
        if (this.props.flashCardType === "voc")
            this.setState({
                answeredCurrentQuestion: true,
                scoreVoc: answer === question.vocabEng ? this.state.scoreVoc + 1 : this.state.scoreVoc,
                answeredCorrectly: isAnswer
            });
        else if (this.props.flashCardType === "gram")
            this.setState({
                answeredCurrentQuestion: true,
                scoreGram: answer === question.gloss ? this.state.scoreGram + 1 : this.state.scoreGram,
                answeredCorrectly: isAnswer
            });
    };

    handleNextQuestion = (question) => {
        const { cookies, openFiltered, storyTitle } = this.props;
        let {vocabQueue, answeredQuestionsVoc, grammarQueue, answeredQuestionsGram} = this.state;
        let {flashCardType} = this.props;
        let validStoryTitle = storyTitle.split(' ')[0];

        if (flashCardType === "voc") {
            vocabQueue.splice(0, 1);
            answeredQuestionsVoc.push(question);
            this.setState({
                answeredCurrentQuestion: false,
                answeredCorrectly: null,
                vocabQueue,
                answeredQuestionsVoc
            });
        } else if (flashCardType === "gram") {
            grammarQueue.splice(0, 1);
            answeredQuestionsGram.push(question);
            this.setState({
                answeredCurrentQuestion: false,
                answeredCorrectly: null,
                grammarQueue,
                answeredQuestionsGram
            });
        }

        if (vocabQueue.length === 0 && grammarQueue.length === 0)
        // If reached end of questions, remove cookie
            openFiltered? cookies.remove(validStoryTitle+'-fav') : cookies.remove(validStoryTitle);
        else if (vocabQueue.length === 0) {
            // Set cookie
            const temp = {
                scoreVoc: this.state.scoreVoc,
                questionIdVoc: answeredQuestionsVoc[answeredQuestionsVoc.length - 1].vocabId,

                scoreGram: this.state.scoreGram,
                questionIdGram: grammarQueue[0].grammarId
            };
            openFiltered? cookies.set(validStoryTitle+'-fav',temp) : cookies.set(validStoryTitle, temp)
        } else if (grammarQueue.length === 0) {
            // Set cookie
            const temp = {
                scoreVoc: this.state.scoreVoc,
                questionIdVoc: vocabQueue[0].vocabId,

                scoreGram: this.state.scoreGram,
                questionIdGram: answeredQuestionsGram[answeredQuestionsGram.length - 1].grammarId
            };
            openFiltered? cookies.set(validStoryTitle+'-fav',temp) : cookies.set(validStoryTitle, temp)
        } else {
            // Set cookie
            const temp = {
                scoreVoc: this.state.scoreVoc,
                questionIdVoc: vocabQueue[0].vocabId,

                scoreGram: this.state.scoreGram,
                questionIdGram: grammarQueue[0].grammarId
            };
            openFiltered? cookies.set(validStoryTitle+'-fav',temp) : cookies.set(validStoryTitle, temp)
        }
    };

    handleStartOver = () => {
        const { cookies, openFiltered, storyTitle } = this.props;
        let validStoryTitle = storyTitle.split(' ')[0];

        if (this.props.flashCardType === "voc") {
            this.setState({
                vocabQueue: [],
                answeredQuestionsVoc: [],
                scoreVoc: 0,
                answeredCurrentQuestion: false,
                answeredCorrectly: null
            });
        } else if (this.props.flashCardType === "gram") {
            this.setState({
                grammarQueue: [],
                answeredQuestionsGram: [],
                scoreGram: 0,
                answeredCurrentQuestion: false,
                answeredCorrectly: null
            });
        }

        let savedFlashCard = openFiltered? cookies.get(validStoryTitle+'-fav') : cookies.get(validStoryTitle);
        if (this.props.flashCardType === "voc") {
            savedFlashCard.scoreVoc = 0;
        } else if (this.props.flashCardType === "gram") {
            savedFlashCard.scoreGram = 0;
        }

        if (savedFlashCard.scoreVoc === 0 && savedFlashCard.scoreGram === 0)
            openFiltered? cookies.remove(validStoryTitle+'-fav') : cookies.remove(validStoryTitle);
        else
            openFiltered? cookies.set(validStoryTitle+'-fav',savedFlashCard) : cookies.set(validStoryTitle, savedFlashCard)

        this.componentDidMount()
    };

    render() {
        const {setFlashCardType, flashCardType, savedVocabList, savedGrammarList, handleVocSave, handleGramSave, handleVocUnsave, handleGramUnsave} = this.props;
        const {vocabQueue, grammarQueue, answeredCorrectly, scoreVoc, scoreGram, answeredQuestionsVoc, answeredQuestionsGram} = this.state;

        let question = flashCardType === "voc"? vocabQueue[0] : grammarQueue[0];
        let isSaved = false;

        if (flashCardType === "voc")
            for (let savedVocab of savedVocabList) {
                if (question && question.vocabId === savedVocab) {
                    isSaved = true;
                    break;
                }
            }
        else if (flashCardType === "gram")
            for (let savedGram of savedGrammarList) {
                if (question && question.grammarId === savedGram) {
                    isSaved = true;
                    break;
                }
            }

        const isLastQuestion = flashCardType === "voc"? vocabQueue.length === 0 : grammarQueue.length === 0;

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
                                <span className="toggle-button" style={{backgroundColor: flashCardType==="voc"? '#4da9ff' : "#00284d"}} onClick={() => {if (flashCardType!=="voc") setFlashCardType("voc")}}>Vocab</span>
                                <span className="toggle-button" style={{backgroundColor: flashCardType==="voc"? '#00284d' : "#4da9ff"}} onClick={() => {if (flashCardType!=="gram") setFlashCardType("gram")}}>Gram</span>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'right'}}>
                                {
                                    isLastQuestion?
                                        <h2>{`Score: ${flashCardType === "voc"? scoreVoc : scoreGram}/${flashCardType === "voc"? answeredQuestionsVoc.length : answeredQuestionsGram.length}`}</h2>
                                        :
                                        <h2>{`Score: ${flashCardType === "voc"? scoreVoc : scoreGram}/${flashCardType === "voc"? answeredQuestionsVoc.length + 1 : answeredQuestionsGram.length + 1}`}</h2>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} justify={'center'} style={{height: '65%'}}>
                            {isLastQuestion?
                                <h1 style={{ textAlign: 'center', position: 'relative', bottom: '-35%' }}>Your Final Score Is: {flashCardType === "voc"? scoreVoc : scoreGram}/{flashCardType === "voc"? answeredQuestionsVoc.length : answeredQuestionsGram.length} </h1>
                                :
                                <FlashCard question={question}
                                           answeredQuestion={this.answeredQuestion}
                                           answeredCurrentQuestion={this.state.answeredCurrentQuestion}
                                           style={{width: '100%', height: '80%'}}
                                           isSaved={isSaved}
                                           handleSave={flashCardType === "voc"? handleVocSave : handleGramSave}
                                           handleUnsave={flashCardType === "voc"? handleVocUnsave : handleGramUnsave}
                                           flashCardType={flashCardType}
                                />
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <div className={'Flashcards-question-count'}>
                                {isLastQuestion?
                                    <h4 style={{marginRight: '5%'}}>{`Question ${flashCardType === "voc"?
                                        answeredQuestionsVoc.length : answeredQuestionsGram.length}/${flashCardType === "voc"?
                                        vocabQueue.length + answeredQuestionsVoc.length : grammarQueue.length + answeredQuestionsGram.length}`}</h4>
                                    :
                                    <h4 style={{marginRight: '5%'}}>{`Question ${flashCardType === "voc"?
                                        answeredQuestionsVoc.length + 1 : answeredQuestionsGram.length + 1}/${flashCardType === "voc"?
                                        vocabQueue.length + answeredQuestionsVoc.length : grammarQueue.length + answeredQuestionsGram.length}`}</h4>
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