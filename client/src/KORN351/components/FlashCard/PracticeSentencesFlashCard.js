import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
};

class PracticeSentencesFlashCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false
        }
    }



    render()
    {
        let {question, classes, answeredQuestion} = this.props;
        let answer = "";
        question.options.forEach(anOption => {
            if (anOption.isAnswer)
                answer = anOption.answer;
        });

        return (
            <div className={'Flashcards-question-container'}>
                <div className={'Flasscards-question'}>
                    <p style={{textAlign: 'left'}}>Translate the following sentence into English: </p>
                    <br/>
                    {
                        question ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <h1 style={{fontSize: question.question.length > 80 ? '20px' : '40px'}}>{question.question}</h1>
                            </div> : null
                    }
                </div>
                <br/><br/>
                <input style={{width: '100%', height: '30%'}}/>
                <br/>
                {
                    this.state.showAnswer?
                        <button onClick={() => {this.setState({showAnswer: false})}}>{answer}</button>
                        :
                        <button onClick={() => {this.setState({showAnswer: true})}}>Show Answer</button>
                }
            </div>
        )
    }
};

export default withStyles(styles)(PracticeSentencesFlashCard);