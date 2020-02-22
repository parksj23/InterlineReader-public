import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {startUpdatingEditVocab} from '../../../../actions/instructor';

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
    let disableEditButton = !this.validateInputs();
    this.setState({
      [name]: event.target.value,
      disableEditButton
    })
  }

  validateInputs (){
    return (this.state.korean !== null && this.state.hanja !== null && this.state.english !== null)
  }


  handleEditVocab = () => {
    let newVocab = {
      _id: this.state._id,
      korean: this.state.korean,
      hanja: this.state.hanja,
      english: this.state.english
    }
    this.props.updateVocab(newVocab, this.props.storyTitle);
  }

  handleDeleteVocab = () => {
    let vocab = {
      _id: this.state._id,
      korean: this.state.korean,
      hanja: this.state.hanja,
      english: this.state.english,
      order_id: this.state.order_id
    }
    this.props.deleteVocab(vocab, this.props.storyTitle);
  }


  render() {
    let {selectedVocab} = this.props
    return (
      <div className="edit-Vocabulary-form-container">
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} justify={'center'}>
            <h2 className={'edit-vocab-form-title'}>Vocab Selected: {selectedVocab.korean}</h2>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-vocab-form-label'}>Korean</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="korean"
                  margin="normal"
                  onChange={this.handleOnChangeField("korean")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.korean}
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
                <span className={'edit-vocab-form-label'}>Hanja</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="hanja"
                  margin="normal"
                  onChange={this.handleOnChangeField("hanja")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.hanja}
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
                <span className={'edit-vocab-form-label'}>English</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="english"
                  margin="normal"
                  onChange={this.handleOnChangeField("english")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.english}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={7}/>
          <Grid item xs={5}>
            <Button style={{marginRight: '4px'}}
                    variant="contained"
                    color="primary"
                    onClick={this.handleEditVocab}
                    disabled={this.state.disableEditButton}

            >Edit</Button>
            <Button style={{marginLeft: '4px'}}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDeleteVocab}
            >Delete</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
  startUpdatingEditVocab
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVocabFormContainer);
