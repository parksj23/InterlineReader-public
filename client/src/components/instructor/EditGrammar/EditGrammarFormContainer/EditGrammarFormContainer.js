import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import StatusMessage from '../../../common/statusMessage/statusMessage';


import {startUpdatingEditGrammar, handleStatusClose} from '../../../../actions/instructor';

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
      openStatus: false
    }
    this.validateInputs.bind(this)
  }

  componentDidMount(){
    this.setState({
      _id: this.props.selectedGrammar._id,
      sentence: this.props.selectedGrammar.sentence,
      pattern: this.props.selectedGrammar.pattern,
      here: this.props.selectedGrammar.here,
      order_id: this.props.selectedGrammar.order_id
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedGrammar && (prevProps.selectedGrammar !== this.props.selectedGrammar)) {
      this.setState({
        _id: this.props.selectedGrammar._id,
        sentence: this.props.selectedGrammar.sentence,
        pattern: this.props.selectedGrammar.pattern,
        here: this.props.selectedGrammar.here,
        order_id: this.props.selectedGrammar.order_id
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

  handleEditGrammar = () => {
    let newGrammar = {
      _id: this.state._id,
      sentence: this.state.sentence,
      pattern: this.state.pattern,
      here: this.state.here
    }
    this.props.updateGrammar(newGrammar, this.props.storyTitle);
    this.setState({
      openStatus: true
    })
  }

  handleDeleteGrammar = () => {
    let grammar = {
      _id: this.state._id,
      sentence: this.state.sentence,
      pattern: this.state.pattern,
      here: this.state.here
    }
    this.props.deleteGrammar(grammar, this.props.storyTitle);
  }

  handleCloseStatus = () => {
    this.setState({
      openStatus: false
    })
  }

  render() {
    let {selectedGrammar} = this.props
    return (
      <div className="edit-grammar-form-container">
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} justify={'center'}>
            <h2 className={'edit-grammar-form-title'}>Grammar Selected: {selectedGrammar.sentence}</h2>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Sentence</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="sentence"
                  margin="normal"
                  onChange={this.handleOnChangeField("sentence")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.sentence}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Pattern</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="pattern"
                  margin="normal"
                  onChange={this.handleOnChangeField("pattern")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.pattern}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Here</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="here"
                  margin="normal"
                  onChange={this.handleOnChangeField("here")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.here}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Order</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}/>
          <Grid item xs={5}>
            <Button style={{marginRight: '4px'}}
                    variant="contained"
                    color="primary"
                    onClick={this.handleEditGrammar}
                    disabled={this.state.disableEditButton}
            >Edit</Button>
            <Button style={{marginLeft: '4px'}}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDeleteGrammar}
            >Delete</Button>
          </Grid>
        </Grid>
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
