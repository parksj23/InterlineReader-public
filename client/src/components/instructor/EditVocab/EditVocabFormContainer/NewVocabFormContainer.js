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
    let text = this.props.editVocab.rawKoreanText
    let vocabWords = Object.keys(this.props.editVocab.vocabSearch)
    let startIndex = 0;
    let startText = vocabWords[startIndex]
    let textSegment = text.substring(0,text.indexOf(startText));
    console.log(textSegment)

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
      _id: this.state._id,
      korean: this.state.korean,
      hanja: this.state.hanja,
      english: this.state.english,
      order_id: this.state.order_id
    }
    this.props.addNewVocabulary(newVocab, this.props.storyTitle);
  }

  handleCancel = () => {
    this.props.cancelSelection();
  }

  render() {
    return (
      <div className="edit-Vocabulary-form-container">
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} justify={'center'}>
            <h2 className={'edit-vocab-form-title'}>Vocab Selected: {this.props.editVocab.userHighlightedText}</h2>
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-vocab-form-label'}>Order</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="order_id"
                  margin="normal"
                  onChange={this.handleOnChangeField("order_id")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.order_id}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}/>
          <Grid item xs={5}>
            <Button style={{marginRight: '4px'}} variant="contained" color="primary" onClick={this.addNewVocab}>Add</Button>
            <Button style={{marginLeft: '4px'}} variant="contained" color="secondary" onClick={this.handleCancel}>Cancel</Button>
          </Grid>
        </Grid>
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
