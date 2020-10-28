import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from '@material-ui/icons/Create';

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    tableWrapper: {
        overflowX: "auto"
    },
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

    renderCells = (row, classes, colHeaders) => {
        let cellArr = []
        colHeaders.forEach(aCell => {
            cellArr.push(
                <TableCell className={classes.tableCell} style={{ fontFamily: "NanumBarunGothic YetHangul", display: 'flex', width: '100%' }}>
                    {aCell === "Pattern"?
                        row[aCell.value]
                        :
                        this.state.isEditable? <input placeholder={row[aCell.value]}/> : <p dangerouslySetInnerHTML={{ __html: row[aCell.value] }} style={{width: '90%'}}/>
                    }
                    <CreateIcon style={{width: '10%'}} onClick={() => this.setState({...this.state, isEditable: true})}/>
                </TableCell>)
        })
        return cellArr;
    }

    render() {
        const {row, classes, tableHeaders} = this.props;

        return (
            <TableRow key={row._id}>
                {
                    this.renderCells(row, classes, tableHeaders)
                }
            </TableRow>
        );
    }
}

EditableTableRow.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditableTableRow);
