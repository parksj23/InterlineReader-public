import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import StatusMessage from '../../../common/statusMessage/statusMessage';
import {handleStatusClose, startUpdatingEditVocab} from '../../../../actions/KORN410/instructor';
import Divider from '@material-ui/core/Divider';

class EditVocabFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: null,
            korean: null,
            hanja: null,
            english: null,
            order_id: null,
            disableEditButton: true
        }
        this.validateInputs.bind(this)
    }

    componentDidMount(){
        this.setState({
            _id: this.props.selectedVocab._id,
            korean: this.props.selectedVocab.korean,
            hanja: this.props.selectedVocab.hanja,
            english: this.props.selectedVocab.english,
            order_id: this.props.selectedVocab.order_id
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedVocab && (prevProps.selectedVocab !== this.props.selectedVocab)) {
            this.setState({
                _id: this.props.selectedVocab._id,
                korean: this.props.selectedVocab.korean,
                hanja: this.props.selectedVocab.hanja,
                english: this.props.selectedVocab.english,
                order_id: this.props.selectedVocab.order_id
            })
        }
    }

    handleOnChangeField = name => event => {
        let disableEditButton = !this.validateInputs(name, event.target.value);
        this.setState({
            [name]: event.target.value,
            disableEditButton
        })
    }

    validateInputs (name, value){
        if (name === "korean" && value === "")
            return false;
        else if (name === "english" && value === "")
            return false;
        else
            return (this.state.korean !== null && this.state.english !== null && this.state._id !== null && this.state._id !== undefined)
    }

    handleEditVocab = () => {
        let newVocab = {
            _id: this.state._id,
            korean: this.state.korean,
            hanja: this.state.hanja,
            english: this.state.english
        }
        this.props.updateVocab(newVocab, this.props.editVocab.storyInfo._id);
    }

    handleDeleteVocab = () => {
        let vocab = {
            _id: this.state._id,
            korean: this.state.korean,
            hanja: this.state.hanja,
            english: this.state.english,
            order_id: this.state.order_id
        }
        this.props.deleteVocab(vocab, this.props.storyId);
    }


    render() {
        let {selectedVocab} = this.props
        return (
            <div className="edit-Vocabulary-form-container" style={{textAlign: 'center'}}>
                <h2 className={'edit-vocab-form-title'}>Vocab Selected: &nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{selectedVocab.korean}</span></h2>
                <br/><br/>
                {this.state.disableEditButton?
                    this.state._id === null || this.state._id === undefined?
                        <p style={{color: 'white', backgroundColor: 'darkred', padding: '1% 5%', fontSize: '15px', width: '70%', display: 'inline-block'}}> !! Page Refresh Required !! </p>
                        :
                        <p style={{color: 'white', backgroundColor: 'darkred', padding: '1% 5%', fontSize: '15px', width: '70%', display: 'inline-block'}}> Please Edit the Vocab to Enable the Edit Button. </p>
                    :
                    <span/>
                }
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
                            placeholder="This field must be non-empty to be able to edit."
                            disabled={this.state._id === null || this.state._id === undefined}
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
                            disabled={this.state._id === null || this.state._id === undefined}
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
                            disabled={this.state._id === null || this.state._id === undefined}
                        />
                    </div>
                    <br/><br/><br/>
                </Grid>
                <div style={{width: '100%', display: 'block'}}>
                    <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            onClick={this.handleEditVocab}
                            disabled={this.state.disableEditButton}
                    >Edit</Button>
                    <Button style={{marginLeft: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            onClick={this.handleDeleteVocab}
                            disabled={this.state._id === null || this.state._id === undefined}
                    >Delete</Button>
                </div>
                <StatusMessage status="success"
                               open={this.props.statusMessage}
                               message={this.props.statusMessage}
                               handleClose={this.props.handleStatusClose}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    startUpdatingEditVocab,
    handleStatusClose
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVocabFormContainer);
