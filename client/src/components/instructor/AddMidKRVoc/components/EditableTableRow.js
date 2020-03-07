import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

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
  state = {
    isEditable: false,
    data: {},
    oldData: {}
  };

  componentDidMount() {
    this.setState({
      data: {
        _id: this.props.row._id,
        engCat: this.props.row.engCat,
        annotation: this.props.row.annotation,
        romShape: this.props.row.romShape,
        hankulShape: this.props.row.hankulShape,
        romExample: this.props.row.romExample,
        hankulExample: this.props.row.hankulExample,
        ur: this.props.row.ur,
        engTransExample: this.props.row.engTransExample,
        lineNumber: this.props.row.lineNumber,
        createdDate: this.props.row.createdDate,
        lastUpdated:this.props.row.lastUpdated
      },
      originalData: {
        _id: this.props.row._id,
        engCat: this.props.row.engCat,
        annotation: this.props.row.annotation,
        romShape: this.props.row.romShape,
        hankulShape: this.props.row.hankulShape,
        romExample: this.props.row.romExample,
        hankulExample: this.props.row.hankulExample,
        ur: this.props.row.ur,
        engTransExample: this.props.row.engTransExample,
        lineNumber: this.props.row.lineNumber,
        createdDate: this.props.row.createdDate,
        lastUpdated:this.props.row.lastUpdated
      },
      edit:{
        _id: this.props.row._id,
        engCat: this.props.row.engCat,
        annotation: this.props.row.annotation,
        romShape: this.props.row.romShape,
        hankulShape: this.props.row.hankulShape,
        romExample: this.props.row.romExample,
        hankulExample: this.props.row.hankulExample,
        ur: this.props.row.ur,
        engTransExample: this.props.row.engTransExample,
        lineNumber: this.props.row.lineNumber
      }
    });
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
    let oldData = { ...this.state.data };
    let edit = oldData;
    this.setState({
      isEditable: !this.state.isEditable,
      oldData,
      edit,
      oldEdit: oldData
    });
  };

  handleDeleteEntry = () => {
    this.props.deleteMidKRGram(this.state.data)
  }

  render() {
    const { classes, row } = this.props;

    return !this.state.isEditable ? (
      <TableRow key={row._id}>
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
        <TableCell align="right">{this.props.row.engCat}</TableCell>
        <TableCell align="right">{this.props.row.annotation}</TableCell>
        <TableCell align="right">{this.props.row.romShape}</TableCell>
        <TableCell
          align="right"
          style={{ fontFamily: "NanumBarunGothic YetHangul" }}
        >
          {this.props.row.hankulShape}
        </TableCell>
        <TableCell align="right">{this.props.row.romExample}</TableCell>
        <TableCell
          align="right"
          style={{ fontFamily: "NanumBarunGothic YetHangul" }}
        >
          {this.props.row.hankulExample}
        </TableCell>
        <TableCell
          align="right"
          style={{ fontFamily: "NanumBarunGothic YetHangul" }}
        >
          {this.props.row.ur}
        </TableCell>
        <TableCell align="right">{this.props.row.engTransExample}</TableCell>
        <TableCell align="right">{this.props.row.lineNumber}</TableCell>
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
            id="engCat"
            margin="normal"
            onChange={this.handleOnChangeField("engCat")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.engCat}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="annotation"
            margin="normal"
            onChange={this.handleOnChangeField("annotation")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.annotation}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="romShape"
            margin="normal"
            onChange={this.handleOnChangeField("romShape")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.romShape}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
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
            value={this.state.edit.hankulShape}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="romExample"
            margin="normal"
            onChange={this.handleOnChangeField("romExample")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.romExample}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
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
            value={this.state.edit.hankulExample}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
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
            value={this.state.edit.ur}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="engTransExample"
            margin="normal"
            onChange={this.handleOnChangeField("engTransExample")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.engTransExample}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            id="lineNumber"
            margin="normal"
            onChange={this.handleOnChangeField("lineNumber")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.edit.lineNumber}
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
