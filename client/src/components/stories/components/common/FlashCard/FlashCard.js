import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarRatingComponent from 'react-star-rating-component';
import './FlashCardsContent.css';

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
    let {question, classes, isSaved} = props;

    return (
        <div className={'Flashcards-question-container'}>
            <div className={'Flasscards-question'}>
                {
                    question ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StarRatingComponent
                                name="favourite"
                                starCount={1}
                                value={isSaved? 1:0}
                                onStarClick={() => isSaved? props.handleUnsave(question.vocabId) : props.handleSave(question.vocabId)}
                                renderStarIcon={() => <span style={{ fontSize: '35px'}}>&#9733;</span>}
                                emptyStarColor="gray"
                            />
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <h1>{question.vocabEng}</h1>
                        </div> : null
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