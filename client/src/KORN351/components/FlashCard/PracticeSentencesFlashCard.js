import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
                <div className={'Flasscards-question'}>
                    <p style={{textAlign: 'left'}}>Translate ONLY the Hanja(s) in the following sentence to Hangul(s) (Separate multiple answers with commas): </p>
                    <br/>
                    {
                        question ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span style={{fontSize: getQuestionFontSize(question.question)}}>{question.question}</span>
                            </div> : null
                    }
                </div>
                <br/><br/>
                <input style={{width: '100%', height: '30%'}} onChange={this.storeAnswer} id="answer-field" value={this.state.answer}/>
                <br/>

                {
                    this.state.showAnswer?
                        <button onClick={() => {this.setState({showAnswer: false})}}>{JSON.stringify(actualAnswers) !== JSON.stringify(answerInput)? 'INCORRECT. The answer is: ' + answer.answer : 'CORRECT'}</button>
                        :
                        <button onClick={() => {this.setState({showAnswer: true}); answeredQuestion(JSON.stringify(answerInput), {isAnswer: JSON.stringify(actualAnswers)}, JSON.stringify(actualAnswers) === JSON.stringify(answerInput))}}>Check Answer</button>
                }
            </div>
        )
    }
};

export default withStyles(styles)(PracticeSentencesFlashCard);