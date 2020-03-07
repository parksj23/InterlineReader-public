import React, { Component } from "react";
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

import { addMiddleKoreanGrammar, saveMidKrGram,updateMiddleKrGrammarEntry, deleteMiddleKrGrammarEntr } from "../../../actions/instructor";

class AddMidKRGram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engCat: null,
      annotation: null,
      romShape: null,
      hankulShape: null,
      romExample: null,
      hankulExample: null,
      ur: null,
      engTransExample: null,
      lineNumber: null
    };
  }

  componentDidMount(){
    this.setState({
      grammarList: this.props.grammarList
    })
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.props.saveMidKrGram(this.props.grammarList);
  }

  handleOnChangeField = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleAddGrammar = () => {
    let grammarToAdd = {
      ...this.state
    };

    delete grammarToAdd.grammarList
    grammarToAdd["createdDate"] = new Date();
    grammarToAdd["lastUpdated"] = new Date();
    let newGrammarList = this.state.grammarList;
    newGrammarList.push(grammarToAdd);
    this.setState({
      grammarList: newGrammarList
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
    this.props.updateMiddleKrGrammarEntry(grammarList);
    this.forceUpdate();

  }

  handleCancel = () => {
    this.setState({
      engCat: null,
      annotation: null,
      romShape: null,
      hankulShape: null,
      romExample: null,
      hankulExample: null,
      ur: null,
      engTranExample: null,
      lineNumber: null
    });
  };

  deleteMidKRGram = (deleteGrammar) => {
    this.props.deleteMiddleKrGrammarEntr(deleteGrammar)
    this.forceUpdate();
  }

  render() {
    return (
      <div className="add-midKR-grammar">
        <ExpansionPanel>
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Existing Grammar</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TablePaginationWrapper grammarList={this.props.grammarList}
                                        updateEntry={this.updateEntry}
                                        deleteMidKRGram={this.deleteMidKRGram}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = { addMiddleKoreanGrammar, saveMidKrGram, updateMiddleKrGrammarEntry, deleteMiddleKrGrammarEntr};

export default connect(mapStateToProps, mapDispatchToProps)(AddMidKRGram);
