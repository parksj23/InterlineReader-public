import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Popover from "@material-ui/core/Popover/Popover";
import StatusMessage from '../../../common/statusMessage/statusMessage';
import {startUpdatingEditGrammar, handleStatusClose} from '../../../../actions/KORN410/instructor';

class EditGrammarFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: null,
            sentence: null,
            pattern: null,
            here: null,
            order_id: null,
            disableEditButton: true,
            anchorEl: null
        }
        this.validateInputs.bind(this)
    }

    componentDidMount(){
        this.setState({
            _id: this.props.selectedGrammar._id,
            sentence: this.props.selectedGrammar.sentence,
            pattern: this.props.selectedGrammar.pattern,
            here: this.props.selectedGrammar.here,
            order_id: this.props.selectedGrammar.order_id,
            anchorEl: null
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedGrammar && (prevProps.selectedGrammar !== this.props.selectedGrammar)) {
            this.setState({
                _id: this.props.selectedGrammar._id,
                sentence: this.props.selectedGrammar.sentence,
                pattern: this.props.selectedGrammar.pattern,
                here: this.props.selectedGrammar.here,
                order_id: this.props.selectedGrammar.order_id,
                anchorEl: null
            })
        }
    }

    handleClickHelp = (event) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget
        });
    };

    handleCloseHelp = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        });
    };

    handleOnChangeField = name => event => {
        let disableEditButton = !this.validateInputs(name, event.target.value);
        this.setState({
            [name]: event.target.value,
            disableEditButton
        })
    }

    validateInputs (name, value){
        if (name === "sentence" && value === "")
            return false;
        else if (name === "pattern" && value === "")
            return false;
        else if (name === "here" && value === "")
            return false;
        else
            return (this.state.sentence !== null && this.state.pattern !== null && this.state.here !== null && this.state._id !== null && this.state._id !== undefined)
    }

    handleEditGrammar = () => {
        let newGrammar = {
            _id: this.state._id,
            sentence: this.state.sentence,
            pattern: this.state.pattern,
            here: this.state.here
        }
        this.props.updateGrammar(newGrammar, this.props.editGrammar.storyInfo._id);
    }

    handleDeleteGrammar = () => {
        let grammar = {
            _id: this.state._id,
            sentence: this.state.sentence,
            pattern: this.state.pattern,
            here: this.state.here
        }
        this.props.deleteGrammar(grammar, this.props.storyId);
    }

    render() {
        let {selectedGrammar} = this.props
        const open = Boolean(this.state.anchorEl);
        return (
            <div style={{textAlign: 'center', position: 'fixed'}}>
                <h2 className={'edit-vocab-form-title'}>Grammar Selected: &nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{selectedGrammar.sentence}</span></h2>
                <br/><br/>
                {this.state.disableEditButton?
                    this.state._id === null || this.state._id === undefined?
                        <p style={{color: 'white', backgroundColor: 'darkred', padding: '1% 5%', fontSize: '15px', width: '70%', display: 'inline-block'}}> !! Page Refresh Required !! </p>
                        :
                        <p style={{color: 'white', backgroundColor: 'darkred', padding: '1% 5%', fontSize: '15px', width: '70%', display: 'inline-block'}}> Please Edit the Grammar to Enable the Edit Button. </p>
                    :
                    <span/>
                }
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
                            placeholder="This field must be non-empty to be able to edit."
                            disabled={this.state._id === null || this.state._id === undefined}
                        />
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex', width: '100%'}}>
                        <span style={{width: '40%'}}>
                            Pattern&nbsp;
                            <span className="material-icons" onMouseOver={this.handleClickHelp}>help</span>
                            <Popover
                                open={open}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={this.handleCloseHelp}
                                anchorEl={this.state.anchorEl}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <p style={{fontWeight: 'bold'}}>Bold:</p>
                                Wrap the section you want to bold with &lt;b&gt; and &lt;/b&gt;. <br/> Example) My name is &lt;b&gt;John Doe&lt;/b&gt;
                                <br/><br/>
                                <p style={{fontWeight: 'bold'}}>Italicize:</p>
                                Wrap the section you want to italicize with &lt;i&gt; and &lt;/i&gt;. <br/>Example) That is &lt;i&gt;awesome&lt;/i&gt;
                                <br/><br/>
                                <p style={{fontWeight: 'bold'}}>Bold & Italicize:</p>
                                Wrap the section you want to bold AND italicize with &lt;i&gt; and &lt;/i&gt;, AND &lt;b&gt; and &lt;/b&gt;. <br/>Example) &lt;b&gt;&lt;i&gt;Wow&lt;/i&gt;&lt;/b&gt;
                            </Popover>
                        </span>
                        <TextField
                            required
                            id="pattern"
                            onChange={this.handleOnChangeField("pattern")}
                            style={{whiteSpace: "noWrap", width: '40%'}}
                            value={this.state.pattern}
                            multiline
                            placeholder="This field must be non-empty to be able to edit."
                            disabled={this.state._id === null || this.state._id === undefined}
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
                            placeholder="This field must be non-empty to be able to edit."
                            disabled={this.state._id === null || this.state._id === undefined}
                        />
                    </div>
                </Grid>
                <br/><br/><br/>
                <div style={{width: '100%', display: 'block'}}>
                    <Button style={{marginRight: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            color="primary"
                            onClick={this.handleEditGrammar}
                            disabled={this.state.disableEditButton}
                    >Edit</Button>
                    <Button style={{marginLeft: '4px', backgroundColor: '#00284d', color: 'white', width: '20%'}}
                            variant="contained"
                            color="secondary"
                            onClick={this.handleDeleteGrammar}
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
    startUpdatingEditGrammar,
    handleStatusClose
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGrammarFormContainer);
