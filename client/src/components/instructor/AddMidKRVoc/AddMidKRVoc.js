import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TablePaginationWrapper from "./components/TablePaginationWrapper";
import "./style/AddMidKRGVocContainer.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import randomstring from 'randomstring';

import {
  saveMidKrVocab, addMiddleKoreanVocab, updateMiddleKoreanVocabEntry, deleteMiddleKrVocabEntr
} from "../../../actions/instructor";

class AddMidKRVoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romStem: "",
      hankulStem: "",
      here: "",
      english: "",
      hanja: "",
      newVocabExpanded: false,
      existVocabExpanded: false,
      deletedVocabList: []
    };
  }

  componentDidMount(){
    this.setState({
      vocabList: this.props.vocabList
    })
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.props.saveMidKrVocab(this.props.vocabList, this.state.deletedVocabList);
  }

  handleOnChangeField = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleAddVocab = () => {
    let vocabToAdd = {
      romStem: this.state.romStem,
      hankulStem: this.state.hankulStem,
      here: this.state.here,
      english: this.state.english,
      hanja: this.state.hanja,
      _id: `temp_${randomstring.generate(7)}`
    };

    delete vocabToAdd.vocabList
    vocabToAdd["createdDate"] = new Date();
    vocabToAdd["lastUpdated"] = new Date();
    let newvocabList = this.state.vocabList;
    this.setState({
      vocabList: newvocabList,
      romStem: "",
      hankulStem: "",
      here: "",
      english: "",
      hanja: "",
      expanded: false
    })

    this.props.addMiddleKoreanVocab(vocabToAdd);
  };

  updateEntry = (oldEntry, newEntry) => {
    let vocabList = this.props.vocabList;
    newEntry["lastUpdated"] = new Date();
    for(let index = 0 ; index < vocabList.length ; index++){
      if(vocabList[index]._id === oldEntry._id) {
        vocabList[index] = newEntry
        break;
      }
    }
    this.props.updateMiddleKoreanVocabEntry(vocabList);
    this.forceUpdate();

  }

  handleCancel = () => {
    this.setState({
      romStem: "",
      hankulStem: "",
      here: "",
      english: "",
      hanja: "",
      expanded: false
    });
  };

  deleteEntry = (deleteVocab) => {
    let vocabList = this.props.vocabList;
    let deletedVocabList = this.state.deletedVocabList
    deletedVocabList.push(deleteVocab)
    for(let index = 0 ; index < vocabList.length ; index++){
      if(vocabList[index]._id === deleteVocab._id) {
        vocabList.splice(index,1)
        break;
      }
    }
    this.props.updateMiddleKoreanVocabEntry(vocabList);
    this.setState({
      deletedVocabList
    })
    this.forceUpdate();
  }

  render() {
    const {expanded} = this.state
    return (
      <div className="add-midKR-grammar">
        <ExpansionPanel expanded={expanded === 'newVocabExpanded'}
                        onChange={this.handleChange('newVocabExpanded')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Add New Vocabulary</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={11}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      fontFamily: "NanumBarunGothic YetHangul"
                    }}
                  >
                    <span className={"edit-vocab-form-label"}>
                      Romanized Stem
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="romStem"
                      margin="normal"
                      onChange={this.handleOnChangeField("romStem")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.romStem}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <span className={"edit-vocab-form-label"}>Hankul Stem</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="hankulStem"
                      margin="normal"
                      onChange={this.handleOnChangeField("hankulStem")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.hankulStem}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <span className={"edit-vocab-form-label"}>
                      Here
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="here"
                      margin="normal"
                      onChange={this.handleOnChangeField("here")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.here}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <span className={"edit-vocab-form-label"}>
                      English
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="english"
                      margin="normal"
                      onChange={this.handleOnChangeField("english")}
                      inputProps={{
                        style: {
                          whiteSpace: "noWrap",
                          fontFamily: "NanumBarunGothic YetHangul"
                        }
                      }}
                      value={this.state.english}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <span className={"edit-vocab-form-label"}>
                      Hanja
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="hanja"
                      margin="normal"
                      onChange={this.handleOnChangeField("hanja")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.hanja}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9} style={{ margin: "0.75rem" }} />
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button
                  style={{ marginRight: "4px" }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleAddVocab}
                  disabled={this.state.disableEditButton}
                >
                  Add
                </Button>
                <Button
                  style={{ marginLeft: "4px" }}
                  variant="contained"
                  color="secondary"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
       <ExpansionPanel expanded={expanded === 'existVocabExpanded'}
                       onChange={this.handleChange('existVocabExpanded')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Existing Vocabulary</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TablePaginationWrapper vocabList={this.props.vocabList}
                                        updateEntry={this.updateEntry}
                                        deleteMidKRVoc={this.deleteEntry}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { addMiddleKoreanVocab, updateMiddleKoreanVocabEntry, saveMidKrVocab,deleteMiddleKrVocabEntr};

export default connect(mapStateToProps, mapDispatchToProps)(AddMidKRVoc);
