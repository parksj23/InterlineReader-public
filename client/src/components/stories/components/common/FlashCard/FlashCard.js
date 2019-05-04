import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const styles = {
  flashcardbuttonCorrect: {
    color: '#42b35b',
    borderColor: '#42b35b'
  },
  flashcardbuttonIncorrect: {
    color: 'red',
    borderColor: 'red'
  }

}

const FlashCard = (props) => {
  let {question, classes} = props
  console.log(question)
  return(
    <div className={'Flashcards-question-container'}>
      <div className={'Flasscards-question'}>
        {
          question ? <h1>{question.vocabEng}</h1> : null
        }
      </div>

      <div className={'Flashcards-options-container'}>
        {
          question ? question.options.map((anOption,index) =>
            <Button classes={{root: anOption.isAnswer && props.answeredCurrentQuestion ? classes.flashcardbuttonCorrect
              : !anOption.isAnswer && props.answeredCurrentQuestion ? classes.flashcardbuttonIncorrect
                : null}} key={index} variant="outlined" color="default" style={{margin: '6px'}}
                    onClick={ (event) => props.answeredQuestion(anOption.vocabEng, question,event)}>{anOption.vocabKor}</Button>) : null

        }
      </div>
      <Divider/>
      <div style={{float: 'right'}}>
        <Button disabled={!props.answeredCurrentQuestion} className={ 'Flashcard-options-button-next'} variant="outlined" color="primary" style={{margin: '6px'}} onClick={()=>props.handleNextQuestion(question)}> NEXT </Button>
      </div>


    </div>
  )

}

export default withStyles(styles)(FlashCard);