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
    let text = this.props.editGrammar.rawKoreanText
    let grammarWords = Object.keys(this.props.editGrammar.grammarSearch)
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
      _id: this.state._id,
      sentence: this.state.sentence,
      pattern: this.state.pattern,
      here: this.state.here,
      order_id: this.state.order_id
    }
    this.props.addNewGrammar(newGrammar, this.props.storyTitle);
  }

  handleCancel = () => {
    this.props.cancelSelection();
  }

  render() {
    return (
      <div className="edit-grammar-form-container">
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} justify={'center'}>
            <h2 className={'edit-grammar-form-title'}>Grammar Selected: {this.props.editGrammar.userHighlightedText}</h2>
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
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}/>
          <Grid item xs={5}>
            <Button style={{marginRight: '4px'}}
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddNewGrammar}
                    disabled={this.state.disableEditButton}

            >Add</Button>
            <Button style={{marginLeft: '4px'}}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleCancel}
            >Cancel</Button>
          </Grid>
        </Grid>
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
