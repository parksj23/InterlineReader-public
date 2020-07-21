import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import randomstring from 'randomstring'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EditableTableRow extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      data: {},
      oldData: {}
    };
    this.handleOnChangeField.bind(this)
    this.handleSave.bind(this)
    this.handleDeleteEntry.bind(this)
  }

  componentDidMount() {
    this.setState({
      data: {
        _id: this.props.row._id,
        romStem: this.props.row.romStem,
        hankulStem: this.props.row.hankulStem,
        here: this.props.row.here,
        english: this.props.row.english,
        hanja: this.props.row.hanja,
        createdDate: this.props.row.createdDate,
        lastUpdated:this.props.row.lastUpdated
      },
      originalData: {
        _id: this.props.row._id,
        romStem: this.props.row.romStem,
        hankulStem: this.props.row.hankulStem,
        here: this.props.row.here,
        english: this.props.row.english,
        hanja: this.props.row.hanja,
        createdDate: this.props.row.createdDate,
        lastUpdated:this.props.row.lastUpdated
      },
      edit:{
        _id: this.props.row._id,
        romStem: this.props.row.romStem,
        hankulStem: this.props.row.hankulStem,
        here: this.props.row.here,
        english: this.props.row.english,
        hanja: this.props.row.hanja
      }
    });
  }

  componentWillUnmount() {
  }

  handleOnChangeField = name => event => {
    let newEdit = this.state.edit;
    newEdit[name] = event.target.value;
    this.setState({
      edit: newEdit
    });
  };
  handleSave = () => {
    this.props.updateEntry(this.state.originalData, this.state.edit)
    this.setState({
      isEditable: false,
      data: this.state.edit
    });
  };

  handleCancel = () => {
    let resetdata = this.state.oldData
    this.setState({
      data: resetdata,
      edit: this.state.oldEdit,
      oldEdit: null,
      oldData: null,
      isEditable: false
    });
  };

  handleToggleEdit = () => {
    this.setState({
      isEditable: !this.state.isEditable,
      oldData: { ...this.state.data },
      edit:  {...this.state.data },
      oldEdit: { ...this.state.data }
    });
  };

  handleDeleteEntry = () => {
    this.props.deleteMidKRVoc(this.state.data)
  }

  render() {
    const {row} = this.props;

    return !this.state.isEditable ? (
      <TableRow key={randomstring.generate(7)}>
        <TableCell style={{width: '5%', maxHeight: '56px'}}>
          <div style={{display: "flex"}}>
            <IconButton onClick={this.handleToggleEdit}>
              <i class="material-icons">create</i>
            </IconButton>
            <IconButton onClick={this.handleDeleteEntry}>
              <i class="material-icons">delete</i>
            </IconButton>
          </div>
        </TableCell>
        <TableCell align="right" >{this.state.data.romStem}</TableCell>
        <TableCell align="right" style={{ fontFamily: "NanumBarunGothic YetHangul" }}>{this.state.data.hankulStem}</TableCell>
        <TableCell align="right" style={{ fontFamily: "NanumBarunGothic YetHangul" }}>{this.state.data.here}</TableCell>
        <TableCell
          align="right"
          style={{ fontFamily: "NanumBarunGothic YetHangul" }}
        >
          {this.state.data.english}
        </TableCell>
        <TableCell align="right">{this.state.data.hanja}</TableCell>
      </TableRow>
    ) : (
      <TableRow key={row.id} padding="dense">
        <TableCell>
          <IconButton onClick={this.handleSave}>
            <i class="material-icons">check</i>
          </IconButton>
          <IconButton onClick={this.handleCancel}>
            <i class="material-icons">clear</i>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="romStem"
            margin="normal"
            onChange={this.handleOnChangeField("romStem")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.romStem}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="hankulStem"
            margin="normal"
            onChange={this.handleOnChangeField("hankulStem")}
            inputProps={{
              style: {
                whiteSpace: "noWrap",
                fontFamily: "NanumBarunGothic YetHangul"
              }
            }}
            value={this.state.edit.hankulStem}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="here"
            margin="normal"
            onChange={this.handleOnChangeField("here")}
            inputProps={{
              style: {
                whiteSpace: "noWrap",
                fontFamily: "NanumBarunGothic YetHangul"
              }
            }}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.here}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="english"
            margin="normal"
            onChange={this.handleOnChangeField("english")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.english}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="hanja"
            margin="normal"
            onChange={this.handleOnChangeField("hanja")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.hanja}
            fullWidth
            multiline
          />
        </TableCell>
      </TableRow>
    );
  }
}

EditableTableRow.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditableTableRow);
