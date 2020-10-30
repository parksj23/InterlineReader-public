import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {startUpdatingEditGrammar, addNewGrammar, cancelSelection} from '../../../../actions/instructor';

class NewGrammarFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: null,
            sentence: null,
            pattern: null,
            here: null,
            order_id: null,
            disableEditButton: true
        }
        this.validateInputs.bind(this)
        this.findOrderId.bind(this)
    }

    componentDidMount(){
        this.setState({
            _id: null,
            sentence: this.props.editGrammar.userHighlightedText,
            pattern: null,
            here: null,
            order_id: null
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userHighlightedText !== this.props.userHighlightedText){
            let order_id = this.findOrderId() +1 ;
            this.setState({
                _id: null,
                sentence: this.props.editGrammar.userHighlightedText,
                pattern: null,
                here: null,
                order_id: order_id
            })
        }
    }

    handleOnChangeField = name => event => {
        let disableEditButton = !this.validateInputs();
        this.setState({
            [name]: event.target.value,
            disableEditButton
        })
    }

    validateInputs (){
        return (this.state.sentence !== null && this.state.pattern !== null && this.state.here !== null)
    }

    findOrderId() {
        let order_id = null
        let text = this.props.editGrammar.MODKR.rawKoreanText
        let grammarWords = this.props.editGrammar.MODKR.grammarSearch? Object.keys(this.props.editGrammar.MODKR.grammarSearch) : [];
        let startIndex = 0;
        let startText = grammarWords[startIndex]
        let textSegment = text.substring(0,text.indexOf(startText));

        if (textSegment.includes(this.props.editGrammar.userHighlightedText)) {return 0}

        for(startIndex = 0; startIndex !== grammarWords.length ; startIndex++){
            let endIndex = startIndex + 1
            let startText = grammarWords[startIndex]
            let endText = grammarWords[endIndex]
            textSegment = text.substring(text.indexOf(startText), text.indexOf(endText))
            if (textSegment.includes(this.props.editGrammar.userHighlightedText)) {
                order_id = endIndex
                return order_id
            }
        }
        textSegment = text.substring(text.indexOf(grammarWords[startIndex]))
        if (textSegment.includes(this.props.editGrammar.userHighlightedText)) return grammarWords.length;
        return order_id
    }

    handleAddNewGrammar = () => {
        let newGrammar = {
            sentence: this.state.sentence,
            pattern: this.state.pattern,
            here: this.state.here,
            order_id: this.state.order_id
        }
        this.props.addNewGrammar(newGrammar, this.props.storyId);
    }

    handleCancel = () => {
        this.props.cancelSelection();
    }

    render() {
        return (
            <div style={{textAlign: 'center', position: 'fixed'}}>
                <h2 className={'edit-vocab-form-title'}>Grammar Selected: &nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{this.props.editGrammar.userHighlightedText}</span></h2>
                <br/><br/>
                <Grid container>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Sentence</span>
                        <TextField
                            required
                            id="sentence"
                            onChange={this.handleOnChangeField("sentence")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.sentence}
                            multiline
                            placeholder="This field must be filled out."
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Pattern</span>
                        <TextField
                            required
                            id="pattern"
                            onChange={this.handleOnChangeField("pattern")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.pattern}
                            multiline
                            placeholder="This field must be filled out."
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>Here</span>
                        <TextField
                            required
                            id="here"
                            onChange={this.handleOnChangeField("here")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.here}
                            multiline
                            placeholder="This field must be filled out."
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
                            disabled
                        />
                    </div>
                </Grid>
                <br/><br/><br/>
                <div style={{width: '100%', display: 'block'}}>
                    <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            color="primary"
                            onClick={() => {this.props.handleSelectHighlight('close-add-form'); this.handleAddNewGrammar()}}
                            disabled={this.state.disableEditButton}

                    >Add</Button>
                    <Button style={{marginLeft: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            color="secondary"
                            onClick={this.handleCancel}
                    >Cancel</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    startUpdatingEditGrammar,
    addNewGrammar,
    cancelSelection
})

export default connect(mapStateToProps, mapDispatchToProps)(NewGrammarFormContainer);
