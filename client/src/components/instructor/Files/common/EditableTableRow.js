import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tableCell: {
    maxWidth: "800px"
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
        romStem: this.props.row.romStem,
        hankulStem: this.props.row.hankulStem,
        here: this.props.row.here,
        english: this.props.row.english,
        hanja: this.props.row.hanja,
        createdDate: this.props.row.createdDate,
        lastUpdated:this.props.row.lastUpdated
      }
    });
  }

  renderCells = (row, classes) => {
    let cellArr = []
    let columns = Object.keys(row);
    columns.forEach(aCell => {
      cellArr.push(
        <TableCell className={classes.tableCell} align="right" style={{ fontFamily: "NanumBarunGothic YetHangul" }}>
        {row[aCell]}</TableCell>)
    })
    return cellArr;
  }

  render() {
    const {row, classes} = this.props;

    return (
      <TableRow key={row._id}>
        {
          this.renderCells(row, classes)
        }
      </TableRow>
    );
  }
}

EditableTableRow.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditableTableRow);
