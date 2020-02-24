import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TablePagination from "./components/TablePaginationWrapper";
import "./style/AddMidKRVocContainer.css";

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

class AddMidKRVoc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleOnChangeField = name => event => {
    let disableEditButton = !this.validateInputs();
    this.setState({
      [name]: event.target.value,
      disableEditButton
    });
  };

  render() {
    return (
      <div className="add-midKR-vocabulary">
        <Grid container>
          <Grid item xs={12}>
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
                <span className={"edit-vocab-form-label"}>Korean</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="korean"
                  margin="normal"
                  onChange={this.handleOnChangeField("korean")}
                  style={{ whiteSpace: "noWrap" }}
                  value={this.state.korean}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12}>
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
                <span className={"edit-vocab-form-label"}>Hanja</span>
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
          <Grid item xs={1} />
          <Grid item xs={12}>
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
                <span className={"edit-vocab-form-label"}>English</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="english"
                  margin="normal"
                  onChange={this.handleOnChangeField("english")}
                  style={{ whiteSpace: "noWrap" }}
                  value={this.state.english}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={7} />
          <Grid item xs={5}>
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

          <Grid item xs={12}>
            <h1>Existing Vocabulary In Database</h1>
            <TablePagination />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddMidKRVoc);
