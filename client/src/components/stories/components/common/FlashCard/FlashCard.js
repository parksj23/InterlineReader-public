import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import './FlashCardsContent.css'

const styles = {
    flashcardbuttonCorrect: {
        color: '#42b35b',
        borderColor: '#42b35b',
        height: "56px",
        backgroundColor: 'rgba(66,179,91,0.1)',
        borderWidth: '2px'
    },
    flashcardbuttonIncorrect: {
        color: 'red',
        borderColor: 'red',
        height: "56px",
        backgroundColor: 'rgba(255,0,0,0.1)',
        borderWidth: '2px'

    },
    defaultButton: {
        height: "56px"
    }

}

const FlashCard = (props) => {
    let {question, classes} = props
    return (
        <div className={'Flashcards-question-container'}>
            <div className={'Flasscards-question'}>
                {
                    question ? <h1>{question.vocabEng}</h1> : null
                }
            </div>
            <div className={'Flashcards-options-container'}>
                {
                    question ? question.options.map((anOption, index) =>
                        <Button disabled={props.answeredCurrentQuestion} classes={{
                            root: anOption.isAnswer && props.answeredCurrentQuestion ? classes.flashcardbuttonCorrect
                                : !anOption.isAnswer && props.answeredCurrentQuestion ? classes.flashcardbuttonIncorrect
                                    : classes.defaultButton
                        }} key={index} variant="outlined" color="default" style={{margin: '6px'}}
                                onClick={() => props.answeredQuestion(anOption.vocabEng, question, anOption.isAnswer)}>{anOption.vocabKor}</Button>) : null
                }
            </div>
        </div>
    )
}

export default withStyles(styles)(FlashCard);