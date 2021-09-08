import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import FlashCard from './FlashCard';
import StoreAccessor from '../../../../../utils/localStore';

import './FlashCardsContent.css';

class FlashCardContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            answeredCorrectly: null,
            answeredCurrentQuestion: false,
            answeredQuestionsGram: [],
            answeredQuestionsVoc: [],
            grammarQueueById: {},
            nextGrammarId: null,
            nextVocabId: null,
            scoreGram: 0,
            scoreVoc: 0,
            vocabQueueById: {},
        };

        const { storyTitle } = this.props;

        const validStoryTitle = storyTitle.split(' ')[0];
        this.flashcardsStore = new StoreAccessor(validStoryTitle + '-flashcards', );
        this.savedFlashcardsStore = new StoreAccessor(validStoryTitle + '-saved-flashcards');

        this.answeredQuestion.bind(this)
    }

    initialize() {
        let {vocabList, savedVocabList, openFiltered, grammarList, savedGrammarList} = this.props;
        const vocabQueueById = {};
        const grammarQueueById = {};

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

        _.shuffle(vocabList).forEach(function (aVocab) {
            const vocabId = aVocab._id.toString();
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
            const vocabObj = {
                vocabKor: aVocab.korean,
                vocabEng: aVocab.english,
                options: options,
                vocabId: vocabId
            }
            if (openFiltered)
                for (const savedVocab of savedVocabList) {
                    if (savedVocab === vocabId) {
                        vocabQueueById[vocabId] = vocabObj;
                        break;
                    }
                }
            else {
                vocabQueueById[vocabId] = vocabObj;
            }
        });

        _.shuffle(grammarList).forEach(function (aGram) {
            const grammarId = aGram._id.toString();
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

            const grammarObj = {
                gramPattern: aGram.pattern,
                gramGloss: aGram.gloss,
                options: options,
                grammarId: grammarId
            }
            // Only show saved vocabs
            if (openFiltered)
                for (const savedGrammar of savedGrammarList) {
                    if (savedGrammar === grammarId) {
                        grammarQueueById[grammarId] = grammarObj;
                        break;
                    }
                }
            else {
                grammarQueueById[grammarId] = grammarObj;
            }
        });

        // Start from saved place
        const savedFlashCard = openFiltered ? this.savedFlashcardsStore.get() : this.flashcardsStore.get();
        const vocabQueue = Object.values(vocabQueueById);
        console.log('------', grammarList);
        const grammarQueue = Object.values(grammarQueueById);

        this.setState({
            vocabQueueById,
            grammarQueueById,
            nextVocabId: vocabQueue.length ? vocabQueue[0].vocabId : null,
            nextGrammarId: grammarQueue.length ? grammarQueue[0].grammarId : null
        },
            () => {
                if (savedFlashCard) {
                    const savedVocScore = savedFlashCard.scoreVoc || 0;
                    const savedGramScore = savedFlashCard.scoreGram || 0;
                    const savedQuestionIdVoc = savedFlashCard.vocabQuestionIds || [];
                    const savedQuestionIdGram = savedFlashCard.grammarQuestionIds || [];

                    let answeredQuestionsVoc = vocabQueue.filter(voc => savedQuestionIdVoc.includes(voc.vocabId));
                    let answeredQuestionsGram = grammarQueue.filter(gram => savedQuestionIdGram.includes(gram.grammarId));
                
                    const nextVocabId = answeredQuestionsVoc.length ? this.getNextVocabId(answeredQuestionsVoc) : vocabQueue.length ? vocabQueue[0].vocabId : null;
                    const nextGrammarId = answeredQuestionsGram.length ? this.getNextGrammarId(answeredQuestionsGram) : grammarQueue.length ? grammarQueue[0].grammarId : null;

                    this.setState({
                        answeredCurrentQuestion: false,
                        answeredCorrectly: null,
                        nextVocabId,
                        nextGrammarId,
                        answeredQuestionsVoc,
                        answeredQuestionsGram,
                        scoreVoc: savedVocScore,
                        scoreGram: savedGramScore
                    });
                }});
    }

    componentDidMount() {
        this.initialize();
    }

    componentWillUnmount() {
        const { openFiltered } = this.props;
        const { scoreGram, scoreVoc, answeredQuestionsVoc, answeredQuestionsGram } = this.state;
        const store = openFiltered ? this.savedFlashcardsStore : this.flashcardsStore;

        store.set({
            scoreGram,
            scoreVoc,
            vocabQuestionIds: answeredQuestionsVoc.map(a => a.vocabId),
            grammarQuestionIds: answeredQuestionsGram.map(a => a.grammarId)
        })
    }

    answeredQuestion = (answer, question, isAnswer) => {
        if (this.props.flashCardType === 'voc') {
            this.setState(prevState => ({
                answeredCurrentQuestion: true,
                scoreVoc: answer === question.vocabEng ? prevState.scoreVoc + 1 : prevState.scoreVoc,
                answeredCorrectly: isAnswer
            }));
        }
        else if (this.props.flashCardType === 'gram') {
            this.setState(prevState => ({
                answeredCurrentQuestion: true,
                scoreGram: answer === question.gloss ? prevState.scoreGram + 1 : prevState.scoreGram,
                answeredCorrectly: isAnswer
            }));
        }
    };

    getNextVocabId(answeredVocabQuestions) {
        const { vocabQueueById } = this.state;
        const remainingQuestions = Object.values(vocabQueueById).filter(v => !answeredVocabQuestions.map(a => a.vocabId).includes(v.vocabId));
        if (remainingQuestions.length) {
            return remainingQuestions[0].vocabId;
        }
    }

    getNextGrammarId(answeredGrammarQuestions) {
        const { grammarQueueById } = this.state;
        const remainingQuestions = Object.values(grammarQueueById).filter(g => !answeredGrammarQuestions.map(a => a.grammarId).includes(g.grammarId));
        if (remainingQuestions.length) {
            return remainingQuestions[0].grammarId;
        }
    }

    handleNextQuestion(question) {
        const { openFiltered } = this.props;
        let { answeredQuestionsGram, answeredQuestionsVoc, grammarQueueById, scoreGram, scoreVoc, vocabQueueById } = this.state;
        let { flashCardType } = this.props;
        const vocabQueue = Object.values(vocabQueueById);
        const grammarQueue = Object.values(grammarQueueById);

        if (flashCardType === 'voc') {
            answeredQuestionsVoc.push(question);
            this.setState({
                answeredCurrentQuestion: false,
                answeredCorrectly: null,
                nextVocabId: this.getNextVocabId(answeredQuestionsVoc),
                answeredQuestionsVoc
            });
        } else if (flashCardType === 'gram') {
            answeredQuestionsGram.push(question);
            this.setState({
                answeredCurrentQuestion: false,
                answeredCorrectly: null,
                nextGrammarId: this.getNextGrammarId(answeredQuestionsGram),
                answeredQuestionsGram
            });
        }

        const store = openFiltered ? this.savedFlashcardsStore : this.flashcardsStore;
        const updatedFlashcardsInfo = {
            scoreVoc,
            scoreGram,
        }

        const currentFlashcardsInfo = store.get() || { scoreVoc: 0, scoreGram: 0, vocabQuestionIds: [], grammarQuestionIds: [] };
        if (currentFlashcardsInfo.vocabQuestionIds.length === vocabQueue.length && currentFlashcardsInfo.grammarQuestionIds.length === grammarQueue.length) {
            store.remove();
        } else if (currentFlashcardsInfo.vocabQuestionIds.length === vocabQueue.length) {
            if (answeredQuestionsVoc.length) {
                updatedFlashcardsInfo.vocabQuestionIds = [...currentFlashcardsInfo.vocabQuestionIds, _.last(answeredQuestionsVoc).vocabId];
            } else {
                updatedFlashcardsInfo.vocabQuestionIds = currentFlashcardsInfo.vocabQuestionIds;
            }
            updatedFlashcardsInfo.grammarQuestionIds = [grammarQueue[0].grammarId];
            store.set(updatedFlashcardsInfo);
        } else if (currentFlashcardsInfo.grammarQuestionIds.length === grammarQueue.length) {
            if (answeredQuestionsGram.length) {
                updatedFlashcardsInfo.grammarQuestionIds = [...currentFlashcardsInfo.grammarQuestionIds, _.last(answeredQuestionsGram).grammarId];
            } else {
                updatedFlashcardsInfo.grammarQuestionIds = currentFlashcardsInfo.grammarQuestionIds;
            }
            updatedFlashcardsInfo.vocabQuestionIds = [vocabQueue[0].vocabId];
            store.set(updatedFlashcardsInfo);
        } else {
            updatedFlashcardsInfo.grammarQuestionIds = [grammarQueue[0].grammarId];
            updatedFlashcardsInfo.vocabQuestionIds = [vocabQueue[0].vocabId];
            store.set(updatedFlashcardsInfo);
        }
    };

    handleStartOver() {
        const { openFiltered } = this.props;

        if (this.props.flashCardType === 'voc') {
            this.setState({
                vocabQueueById: {},
                answeredQuestionsVoc: [],
                scoreVoc: 0,
                answeredCurrentQuestion: false,
                answeredCorrectly: null
            });
        } else if (this.props.flashCardType === 'gram') {
            this.setState({
                grammarQueueById: {},
                answeredQuestionsGram: [],
                scoreGram: 0,
                answeredCurrentQuestion: false,
                answeredCorrectly: null
            });
        }

        let savedFlashCard = openFiltered? this.savedFlashcardsStore.get() : this.flashcardsStore.get();
        if (this.props.flashCardType === 'voc') {
            savedFlashCard.scoreVoc = 0;
        } else if (this.props.flashCardType === 'gram') {
            savedFlashCard.scoreGram = 0;
        }

        if (savedFlashCard.scoreVoc === 0 && savedFlashCard.scoreGram === 0) {
            openFiltered? this.savedFlashcardsStore.remove() : this.flashcardsStore.remove();
        } else {
            openFiltered? this.savedFlashcardsStore.set(savedFlashCard) : this.flashcardsStore.set(savedFlashCard);
        }
        this.initialize();
    };

    render() {
        const {setFlashCardType, flashCardType, savedVocabList, savedGrammarList, handleVocSave, handleGramSave, handleVocUnsave, handleGramUnsave} = this.props;
        const {answeredCorrectly, scoreVoc, scoreGram, answeredQuestionsVoc, answeredQuestionsGram, nextVocabId, nextGrammarId, vocabQueueById, grammarQueueById} = this.state;
        const vocabQueue = Object.values(vocabQueueById);
        const grammarQueue = Object.values(grammarQueueById);

        let question = flashCardType === 'voc'? vocabQueueById[nextVocabId] : grammarQueueById[nextGrammarId];
        let isSaved = false;

        if (flashCardType === 'voc')
            for (let savedVocab of savedVocabList) {
                if (question && question.vocabId === savedVocab) {
                    isSaved = true;
                    break;
                }
            }
        else if (flashCardType === 'gram')
            for (let savedGram of savedGrammarList) {
                if (question && question.grammarId === savedGram) {
                    isSaved = true;
                    break;
                }
            }

        const isLastQuestion = flashCardType === 'voc'? vocabQueue.length === answeredQuestionsVoc.length : grammarQueue.length === answeredQuestionsGram.length;

        return (
            <Card style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '450px',
                maxWidth: '800px',
                width: '100%'
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
                                <span className="toggle-button" style={{backgroundColor: flashCardType==='voc'? '#4da9ff' : "#00284d"}} onClick={() => {if (flashCardType!=='voc') setFlashCardType('voc')}}>Vocab</span>
                                <span className="toggle-button" style={{backgroundColor: flashCardType==='voc'? '#00284d' : "#4da9ff"}} onClick={() => {if (flashCardType!=='gram') setFlashCardType('gram')}}>Gram</span>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'right'}}>
                                {
                                    isLastQuestion?
                                        <h2>{`Score: ${flashCardType === 'voc'? scoreVoc : scoreGram}/${flashCardType === 'voc'? answeredQuestionsVoc.length : answeredQuestionsGram.length}`}</h2>
                                        :
                                        <h2>{`Score: ${flashCardType === 'voc'? scoreVoc : scoreGram}/${flashCardType === 'voc'? answeredQuestionsVoc.length + 1 : answeredQuestionsGram.length + 1}`}</h2>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} justify={'center'} style={{height: '65%'}}>
                            {isLastQuestion?
                                <h1 style={{ textAlign: 'center', position: 'relative', bottom: '-35%' }}>Your Final Score Is: {flashCardType === 'voc'? scoreVoc : scoreGram}/{flashCardType === 'voc'? answeredQuestionsVoc.length : answeredQuestionsGram.length} </h1>
                                :
                                <FlashCard question={question}
                                           answeredQuestion={this.answeredQuestion}
                                           answeredCurrentQuestion={this.state.answeredCurrentQuestion}
                                           style={{width: '100%', height: '80%'}}
                                           isSaved={isSaved}
                                           handleSave={flashCardType === 'voc'? handleVocSave : handleGramSave}
                                           handleUnsave={flashCardType === 'voc'? handleVocUnsave : handleGramUnsave}
                                           flashCardType={flashCardType}
                                />
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <div className={'Flashcards-question-count'}>
                                {isLastQuestion?
                                    <h4 style={{marginRight: '5%'}}>{`Question ${flashCardType === 'voc'?
                                        answeredQuestionsVoc.length : answeredQuestionsGram.length}/${flashCardType === 'voc'?
                                        vocabQueue.length: grammarQueue.length}`}</h4>
                                    :
                                    <h4 style={{marginRight: '5%'}}>{`Question ${flashCardType === 'voc'?
                                        answeredQuestionsVoc.length + 1 : answeredQuestionsGram.length + 1}/${flashCardType === 'voc'?
                                        vocabQueue.length: grammarQueue.length}`}</h4>
                                }
                                <Button variant="contained" style={{backgroundColor: '#00284d', color: 'white'}} onClick={() => this.handleStartOver()}>Start Over</Button>
                            </div>
                            <div style={{float: 'right'}}>
                                <Button className={'Flashcard-options-button-next'} variant="contained"
                                    style={{ margin: '6px'}}
                                    onClick={onClose}> CLOSE </Button>
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


FlashCardContainer.propTypes = {
    flashCardType: PropTypes.string.isRequired,
    grammarList: PropTypes.array.isRequired,
    handleGramSave: PropTypes.func.isRequired,
    handleGramUnsave: PropTypes.func.isRequired,
    handleVocSave: PropTypes.func.isRequired,
    handleVocUnsave: PropTypes.func.isRequired,
    openFiltered: PropTypes.bool.isRequired,
    savedGrammarList: PropTypes.array.isRequired,
    savedVocabList: PropTypes.array.isRequired,
    setFlashCardType: PropTypes.func.isRequired,
    storyTitle: PropTypes.string.isRequired,
    vocabList: PropTypes.array.isRequired,
};

export default FlashCardContainer;
