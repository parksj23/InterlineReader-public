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
        name: this.props.row.name,
        calories: this.props.row.calories,
        fat: this.props.row.fat
      }
    });
  }

  handleOnChangeField = name => event => {
    let newData = this.state.data;
    newData[name] = event.target.value;
    console.log(this.state.oldData);
    this.setState({
      data: newData
    });
  };
  handleSave = () => {
    this.setState({
      isEditable: false
    });
  };

  handleCancel = () => {
    this.setState({
      data: this.state.oldData,
      oldData: null,
      isEditable: false
    });
  };

  handleToggleEdit = () => {
    let oldData = { ...this.state.data };
    this.setState({
      isEditable: !this.state.isEditable,
      oldData
    });
  };

  render() {
    const { classes, row } = this.props;

    return !this.state.isEditable ? (
      <TableRow key={row.id}>
        <TableCell>
          <IconButton onClick={this.handleToggleEdit}>
            <i class="material-icons">create</i>
          </IconButton>
          <IconButton>
            <i class="material-icons">delete</i>
          </IconButton>
        </TableCell>
        <TableCell align="right">{this.state.data.name}</TableCell>
        <TableCell align="right">{this.state.data.calories}</TableCell>
        <TableCell align="right">{this.state.data.fat}</TableCell>
      </TableRow>
    ) : (
      <TableRow key={row.id}>
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
            id="name"
            margin="normal"
            onChange={this.handleOnChangeField("name")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.data.name}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            id="name"
            margin="normal"
            onChange={this.handleOnChangeField("calories")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.data.calories}
            fullWidth
            multiline
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            id="name"
            margin="normal"
            onChange={this.handleOnChangeField("fat")}
            style={{ whiteSpace: "noWrap" }}
            value={this.state.data.fat}
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
