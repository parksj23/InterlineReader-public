import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TablePaginationWrapper from "./components/TablePaginationWrapper";
import "./style/AddMidKRGramContainer.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import { addMiddleKoreanGrammar, saveMidKrGram,updateMiddleKrGrammarEntry } from "../../../actions/KORN410/instructor";
import randomstring from "randomstring";

class AddMidKRGram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engCat: "",
      annotation: "",
      romShape: "",
      hankulShape: "",
      romExample: "",
      hankulExample: "",
      ur: "",
      engTransExample: "",
      lineNumber: "",
      expanded: null,
      deletedGrammar: []
    };
    this.handleOnChangeField.bind(this)
  }

  componentDidMount(){
    this.setState({
      grammarList: this.props.grammarList
    })
  }

  componentWillUnmount() {
    this.props.saveMidKrGram(this.props.grammarList, this.state.deletedGrammar);
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

  handleAddGrammar = () => {
    let grammarToAdd = {
      engCat: this.state.engCat,
      annotation: this.state.annotation,
      romShape: this.state.romShape,
      hankulShape: this.state.hankulShape,
      romExample: this.state.romExample,
      hankulExample: this.state.hankulExample,
      ur: this.state.ur,
      engTransExample: this.state.engTransExample,
      lineNumber: this.state.lineNumber,
      _id: `temp_${randomstring.generate(7)}`
    };

    grammarToAdd["createdDate"] = new Date();
    grammarToAdd["lastUpdated"] = new Date();
    let newGrammarList = this.state.grammarList;
    newGrammarList.push(grammarToAdd);
    this.setState({
      grammarList: newGrammarList,
      engCat: "",
      annotation: "",
      romShape: "",
      hankulShape: "",
      romExample: "",
      hankulExample: "",
      ur: "",
      engTransExample: "",
      lineNumber: "",
      expanded: false
    })

    this.props.addMiddleKoreanGrammar(grammarToAdd);
  };

  updateEntry = (oldEntry, newEntry) => {
    let grammarList = this.props.grammarList;
    newEntry["lastUpdated"] = new Date();
    for(let index = 0 ; index < grammarList.length ; index++){
      if(grammarList[index]._id === oldEntry._id) {
        grammarList[index] = newEntry
        break;
      }
    }
    this.props.updateMiddleKrGrammarEntry(grammarList, this.state.deletedGrammar);
    this.forceUpdate();

  }

  deleteEntry = (deleteGrammar) => {
    let grammarList = this.props.grammarList;
    let updatedDeletedEntries = this.state.deletedGrammar
    updatedDeletedEntries.push(deleteGrammar)
    for(let index = 0 ; index < grammarList.length ; index++){
      if(grammarList[index]._id === deleteGrammar._id) {
        grammarList.splice(index,1)
        break;
      }
    }
    this.props.updateMiddleKrGrammarEntry(grammarList);
    this.setState({
      updatedDeletedEntries
    })
    this.forceUpdate();
  }

  handleCancel = () => {
    this.setState({
      engCat: "",
      annotation: "",
      romShape: "",
      hankulShape: "",
      romExample: "",
      hankulExample: "",
      ur: "",
      engTransExample: "",
      lineNumber: "",
      expanded: false
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div className="add-midKR-grammar">
        <ExpansionPanel expanded={expanded === 'newGramExpanded'}
                        onChange={this.handleChange('newGramExpanded')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Add New Grammar</Typography>
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
                      English Category
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="engCat"
                      margin="normal"
                      onChange={this.handleOnChangeField("engCat")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.engCat}
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
                    <span className={"edit-vocab-form-label"}>Annotation</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="annotation"
                      margin="normal"
                      onChange={this.handleOnChangeField("annotation")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.annotation}
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
                      Romanized Shape
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="romShape"
                      margin="normal"
                      onChange={this.handleOnChangeField("romShape")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.romShape}
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
                      Hankul Shape
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="hankulShape"
                      margin="normal"
                      onChange={this.handleOnChangeField("hankulShape")}
                      inputProps={{
                        style: {
                          whiteSpace: "noWrap",
                          fontFamily: "NanumBarunGothic YetHangul"
                        }
                      }}
                      value={this.state.hankulShape}
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
                      Romanized Example
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="romExample"
                      margin="normal"
                      onChange={this.handleOnChangeField("romExample")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.romExample}
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
                      Hankul Example
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="hankulExample"
                      margin="normal"
                      onChange={this.handleOnChangeField("hankulExample")}
                      inputProps={{
                        style: {
                          whiteSpace: "noWrap",
                          fontFamily: "NanumBarunGothic YetHangul"
                        }
                      }}
                      value={this.state.hankulExample}
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
                    <span className={"edit-vocab-form-label"}>*Ur</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="ur"
                      margin="normal"
                      onChange={this.handleOnChangeField("ur")}
                      inputProps={{
                        style: {
                          whiteSpace: "noWrap",
                          fontFamily: "NanumBarunGothic YetHangul"
                        }
                      }}
                      value={this.state.ur}
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
                      English Translation Example
                    </span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="engTransExample"
                      margin="normal"
                      onChange={this.handleOnChangeField("engTransExample")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.engTransExample}
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
                    <span className={"edit-vocab-form-label"}>Line Number</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      required
                      id="lineNumber"
                      margin="normal"
                      onChange={this.handleOnChangeField("lineNumber")}
                      style={{ whiteSpace: "noWrap" }}
                      value={this.state.lineNumber}
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
                  onClick={this.handleAddGrammar}
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
        <ExpansionPanel
          expanded={expanded === 'existGramExpanded'}
          onChange={this.handleChange('existGramExpanded')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Existing Grammar</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TablePaginationWrapper grammarList={this.props.grammarList}
                                        updateEntry={this.updateEntry}
                                        deleteMidKRGram={this.deleteEntry}
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
const mapDispatchToProps = { addMiddleKoreanGrammar, saveMidKrGram, updateMiddleKrGrammarEntry};

AddMidKRGram.propTypes = {
  addMiddleKoreanGrammar: PropTypes.func.isRequired,
  saveMidKrGram: PropTypes.func.isRequired,
  updateMiddleKrGrammarEntry: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMidKRGram);
