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
import EditableTableRow from "./EditableTableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: "100%"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class TablePaginationWrapper extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount() {
    this.setState({
      rows: this.props.grammarList
    });
  }

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
    const {rowsPerPage, page } = this.state;
    let rows = this.props.list || []
    let tableHeaders = []
    this.props.tableHeaders.forEach(aTableHeader => {
      tableHeaders.push(<CustomTableCell align="right" >{aTableHeader.label}</CustomTableCell>);
    })

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                 tableHeaders
                }
              </TableRow>
            </TableHead>
            {rows && rows.length > 0 ?
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <EditableTableRow row={row} tableHeaders={this.props.tableHeaders}/>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{height: 56 * emptyRows}}>
                    <TableCell colSpan={6}/>
                  </TableRow>
                )}
              </TableBody> : null
            }
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
