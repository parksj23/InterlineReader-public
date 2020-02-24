import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "./TablePaginationActions";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";
import EditableTableRow from "./EditableTableRow";

const styles = theme => ({
  root: {
    width: "90%",
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

class TablePaginationWrapper extends React.Component {
  state = {
    rows: [
      createData("Cupcake", 305, 3.7),
      createData("Donut", 452, 25.0),
      createData("Eclair", 262, 16.0),
      createData("Frozen yoghurt", 159, 6.0),
      createData("Gingerbread", 356, 16.0),
      createData("Honeycomb", 408, 3.2),
      createData("Ice cream sandwich", 237, 9.0),
      createData("Jelly Bean", 375, 0.0),
      createData("KitKat", 518, 26.0),
      createData("Lollipop", 392, 0.2),
      createData("Marshmallow", 318, 0),
      createData("Nougat", 360, 19.0),
      createData("Oreo", 437, 18.0)
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleOnChangeField = name => event => {
    let disableEditButton = !this.validateInputs();
    this.setState({
      [name]: event.target.value,
      disableEditButton
    });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Actions</CustomTableCell>
                <CustomTableCell align="right">Middle Korean</CustomTableCell>
                <CustomTableCell align="right">English</CustomTableCell>
                <CustomTableCell align="right">Hanja</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <EditableTableRow row={row} />
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

TablePaginationWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TablePaginationWrapper);
