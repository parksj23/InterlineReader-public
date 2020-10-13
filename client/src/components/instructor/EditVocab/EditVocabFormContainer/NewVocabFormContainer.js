import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { addNewVocabulary, startUpdatingHighlightedText, cancelSelection } from '../../../../actions/instructor'

class NewVocabFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: null,
            korean: null,
            hanja: null,
            english: null,
            order_id: null
        }
        this.findOrderId.bind(this)
    }

    componentDidMount(){
        let order_id = this.findOrderId() + 1;
        this.setState({
            _id: null,
            korean: this.props.editVocab.userHighlightedText,
            hanja: null,
            english: null,
            order_id
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userHighlightedText !== this.props.userHighlightedText) {
            let order_id = this.findOrderId() +1 ;
            this.setState({
                _id: null,
                korean: this.props.editVocab.userHighlightedText,
                hanja: null,
                english: null,
                order_id
            })
        }
    }

    findOrderId() {
        let order_id = null
        let text = this.props.editVocab.MODKR.rawKoreanText
        let vocabWords = this.props.editVocab.MODKR.vocabSearch ? Object.keys(this.props.editVocab.MODKR.vocabSearch) : []
        let startIndex = 0;
        let startText = vocabWords[startIndex]
        let textSegment = text.substring(0,text.indexOf(startText));

        if (textSegment.includes(this.props.editVocab.userHighlightedText)) {return 0}

        for(startIndex = 0; startIndex !== vocabWords.length ; startIndex++){
            let endIndex = startIndex + 1
            let startText = vocabWords[startIndex]
            let endText = vocabWords[endIndex]
            textSegment = text.substring(text.indexOf(startText), text.indexOf(endText))
            if (textSegment.includes(this.props.editVocab.userHighlightedText)) {
                order_id = endIndex
                return order_id
            }
        }
        textSegment = text.substring(text.indexOf(vocabWords[startIndex]))
        if (textSegment.includes(this.props.editVocab.userHighlightedText)) return vocabWords.length;
        return order_id
    }

    handleOnChangeField = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    addNewVocab = () => {
        let newVocab = {
            korean: this.state.korean,
            hanja: this.state.hanja,
            english: this.state.english,
            order_id: this.state.order_id
        }
        this.props.addNewVocabulary(newVocab, this.props.storyId);
    }

    handleCancel = () => {
        this.props.cancelSelection();
    }

    render() {
        return (
            <div style={{textAlign: 'center', position: 'fixed'}}>
                <h2 className={'edit-vocab-form-title'}>Vocab Selected: &nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{this.props.editVocab.userHighlightedText}</span></h2>
                <br/><br/>
                <Grid container>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Korean</span>
                        <TextField
                            required
                            id="korean"
                            onChange={this.handleOnChangeField("korean")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.korean}
                            multiline
                            placeholder="This field must be filled out."
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Hanja</span>
                        <TextField
                            required
                            id="hanja"
                            onChange={this.handleOnChangeField("hanja")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.hanja}
                            multiline
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>English</span>
                        <TextField
                            required
                            id="english"
                            onChange={this.handleOnChangeField("english")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.english}
                            multiline
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Order</span>
                        <TextField
                            required
                            id="order_id"
                            onChange={this.handleOnChangeField("order_id")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.order_id}
                            multiline
                        />
                    </div>
                    <br/><br/><br/>
                </Grid>
                <div style={{width: '100%', display: 'block'}}>
                    <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} variant="contained" color="primary" onClick={() => {this.props.handleSelectHighlight(''); this.addNewVocab()}}>Add</Button>
                    <Button style={{marginLeft: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}} variant="contained" color="secondary" onClick={this.handleCancel}>Cancel</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    addNewVocabulary,
    startUpdatingHighlightedText,
    cancelSelection
})

export default connect(mapStateToProps, mapDispatchToProps)(NewVocabFormContainer);
