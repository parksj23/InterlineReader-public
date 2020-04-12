import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import FlashCard from './FlashCard'

import './FlashCardsContent.css'

class FlashCardContainer extends Component {

  constructor(){
    super()
    this.state = ({
      vocabQueue: [],
      answeredQuestions: [],
      score: 0,
      answeredCurrentQuestion: false,
      answeredCorrectly: null
    })
    this.answeredQuestion.bind(this)
  }

  componentDidMount(){
    let {vocabList} = this.props;
    let vocabQueue = []
    vocabList.forEach(function(aVocab) {
      let options = []
      let question = {
        vocabKor: aVocab.korean,
        vocabEng: aVocab.english,
        isAnswer: true
      }
      options.push(question)
      for(let i = 0; i < 3 ; i++){
        let index = Math.floor((Math.random()* +vocabList.length))
        while(vocabList[index] === aVocab){
          index = Math.floor((Math.random()* +vocabList.length))
        }
        options.push({
          vocabKor: vocabList[index].korean,
          vocabEng: vocabList[index].english,
          isAnswer: false
        })
      }
        let rotate = Math.floor((Math.random() * options.length+1))
        for( let i = 0 ; i < rotate; i++){
          options.push(options[0])
          options.splice(0,1);
        }
      vocabQueue.push({
        vocabKor: aVocab.korean,
        vocabEng: aVocab.english,
        options: options
      })
    })
    this.setState({
      vocabQueue
    })
  }

  answeredQuestion = (answer, question, isAnswer) => {
    this.setState({
      answeredCurrentQuestion: true,
      score: answer === question.vocabEng? this.state.score+1: this.state.score,
      answeredCorrectly: isAnswer
    })
}

  handleNextQuestion = (question) => {
    let {vocabQueue, answeredQuestions} = this.state
    vocabQueue.splice(0,1)
    answeredQuestions.push(question)
    this.setState({
      answeredCurrentQuestion: false,
      answeredCorrectly: null,
      vocabQueue,
      answeredQuestions,
    })
  }


  render(){
    let question = this.state.vocabQueue[0]
    return(
      <Card style={{position: 'fixed', top: '20vh', left: '10vw', height: '450px', width: '850px'}}>
        <Grid container style={{height: '100%'}} justify={'center'}>
          <Grid item xs={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '8%',
                  backgroundColor: this.state.answeredCorrectly? 'rgba(66,179,91,0.1)' : this.state.answeredCorrectly === false ? 'rgba(255,0,0,0.1)' : null}}>
            <span style={{margin: '0', fontSize: '1.5rem'}}>
              {this.state.answeredCorrectly ? 'Correct' : this.state.answeredCorrectly === false ? 'Incorrect' : ' '}
            </span>
          </Grid>
          <Grid container style={{height: '92%', margin:'16px'}}>
            <Grid container className={'Flashcards-title'} style={{borderBottom: 'solid 1px rgba(0,0,0,0.12', height: '10%'}}>
                <Grid item xs={6}>
                   <h2>Flash Card Study</h2>
                </Grid>
                <Grid item xs={6} style={{textAlign: 'right'}}>
                    <h2>{`Score: ${this.state.score}/${this.state.answeredQuestions.length+1}`}</h2>
                </Grid>
            </Grid>
            <Grid item xs={12} justify={'center'} style={{height: '65%'}}>
                <FlashCard question={question}
                           answeredQuestion={this.answeredQuestion}
                           answeredCurrentQuestion={this.state.answeredCurrentQuestion}
                           handleNextQuestion={this.handleNextQuestion}
                           style={{width: '100%', height: '80%'}}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider />
                <div className={'Flashcards-question-count'} style={{marginTop: '8px', float: 'left'}}>
                  <h4>{`Question ${this.state.answeredQuestions.length}/${this.state.vocabQueue.length + this.state.answeredQuestions.length}` }</h4>
                </div>
                <div style={{float: 'right'}}>
                  <Button disabled={!this.state.answeredCurrentQuestion} className={ 'Flashcard-options-button-next'} variant="outlined" color="primary" style={{margin: '6px'}} onClick={()=>this.handleNextQuestion(question)}> NEXT </Button>
                </div>
            </Grid>

          </Grid>
        </Grid>
      </Card>
    )
  }
}


export default FlashCardContainer