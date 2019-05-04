import React, {Component} from 'react';
import {connect} from 'react-redux'
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
      answeredCurrentQuestion: false
    })
    this.answeredQuestion.bind(this)
  }

  componentDidMount(){
    let {vocabList} = this.props;
    let vocabQueue = []
    vocabList.map(aVocab => {
      let options = []
      let question = {
        vocabKor: aVocab.korean,
        vocabEng: aVocab.english,
        isAnswer: true
      }
      options.push(question)
      for(let i = 0; i < 3 ; i++){
        let index = Math.floor((Math.random()* +this.props.vocabList.length))
        while(vocabList[index] === aVocab){
          index = Math.floor((Math.random()* +this.props.vocabList.length))
        }
        options.push({
          vocabKor: vocabList[index].korean,
          vocabEng: vocabList[index].english,
          isAnswer: false
        })
      }
      // Swap correct answer with a random option
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

  answeredQuestion = (answer, question) => {
    this.setState({
      answeredCurrentQuestion: true,
      score: answer === question.vocabEng? this.state.score+1: this.state.score
    })
}

  handleNextQuestion = (question) => {
    let {vocabQueue, answeredQuestions} = this.state
    vocabQueue.splice(0,1)
    answeredQuestions.push(question)
    this.setState({
      answeredCurrentQuestion: false,
      vocabQueue,
      answeredQuestions
    })
  }


  render(){
    let question = this.state.vocabQueue[0]
    console.log(question)
    return(
      <Card style={{position: 'fixed', top: '20vh', left: '25vw', height: '450px', width: '850px'}}>
        <Grid container>
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <div className={'Flashcards-title'} style={{marginTop: '8px', float: 'left'}}><h2>Flash Card Study</h2></div>
            <Divider />
            <FlashCard question={question}
                       answeredQuestion={this.answeredQuestion}
                       answeredCurrentQuestion={this.state.answeredCurrentQuestion}
                       handleNextQuestion={this.handleNextQuestion}
            />

            <div className={'Flashcards-title'} style={{marginTop: '8px', float: 'right'}}>
              <h4>{`Question ${this.state.answeredQuestions.length}/${this.state.vocabQueue.length + this.state.answeredQuestions.length}` }</h4>
            </div>
          </Grid>
        </Grid>
      </Card>
    )
  }



}

const mapStatetoProps = state => ({
  vocabList: state.stories.vocab
})

export default connect(mapStatetoProps) (FlashCardContainer)