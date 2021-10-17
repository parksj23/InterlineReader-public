import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import { Input, Button } from '@material-ui/core';
import './FlashCardsContent.css';
import { getQuestionFontSize } from '../../../utils';

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
};

class PracticeSentencesFlashCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
            prevQuestion: '',
            answer: ''
        }
    }

    storeAnswer = (event) => {
        this.setState({
            answer: event.target.value
        })
    };

    render()
    {
        let {question, answeredQuestion} = this.props;
        let answer = "";
        question.options.forEach(anOption => {
            if (anOption.isAnswer)
                answer = anOption;
        });
        let actualAnswers = answer.answer.split(",");
        actualAnswers = actualAnswers.map(ans => ans.trim());
        let answerInput = this.state.answer.split(",");
        answerInput = answerInput.map(ans => ans.trim());

        if (this.state.prevQuestion !== question.question) {
            this.setState({
                prevQuestion: question.question,
                showAnswer: false,
                answer: ''
            });
        }

        return (
            <div className={'Flashcards-question-container'}>
                <div className={'Flasscards-question-practise'}>
                    <p style={{textAlign: 'left'}}>Translate ONLY the Hanja(s) in the following sentence to Hangul(s) (Separate multiple answers with commas): </p>
                    {
                        question ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span style={{fontSize: getQuestionFontSize(question.question)}}>{question.question}</span>
                            </div> : null
                    }
                </div>
                <br/>
                <div className="Flashcards-input-container">
                    <Input style={{width: '100%', marginBottom: 10}} onChange={this.storeAnswer} placeholder="Type your answer here..." id="answer-field" value={this.state.answer}/>
                    <br/>

                    {
                        this.state.showAnswer ?
                            <span onClick={() => {this.setState({showAnswer: false})}}>{JSON.stringify(actualAnswers) !== JSON.stringify(answerInput)? 'INCORRECT. The answer is: ' + answer.answer : 'CORRECT'}</span>
                            :
                            <Button style={{margin: 'auto', color: '#00284d', borderColor: '#00284d'}} variant="outlined" onClick={() => {this.setState({showAnswer: true}); answeredQuestion(JSON.stringify(answerInput), {isAnswer: JSON.stringify(actualAnswers)}, JSON.stringify(actualAnswers) === JSON.stringify(answerInput))}}>Check Answer</Button>
                    }
                </div>
            </div>
        )
    }
};

export default withStyles(styles)(PracticeSentencesFlashCard);