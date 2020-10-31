import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { editStoryByLine } from '../../../actions/stories';
import {connect} from "react-redux";

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
        data: {}
    };

    componentDidMount() {
        this.setState({
            data: {
                order_id: this.props.row.order_id,
                id: this.props.row.id,
                text: this.props.row.text
            }
        });
    }

    handleChange = event => {
        let temp = this.state.data;
        temp['text'] = event.target.value;
        this.setState({
            ...this.state,
            data: temp
        })
    };

    handleSubmit = () => {
        let {id, text} = this.state.data;
        this.props.editStoryByLine(this.props.storyName, id, text, this.props.language).then(() => this.props.forceRefresh());
        this.setState({
            ...this.state,
            isEditable: false,
            oldText: text
        });
        this.props.handleEditStatus(false)
    };

    handleEdit = () => {
        if (!this.props.editStatus) {
            this.setState({
                    ...this.state,
                isEditable: true
            });
            this.props.handleEditStatus(true)
        }
    };

    renderCells = (row, classes, colHeaders) => {
        let cellArr = [];
        colHeaders.forEach(() => {
            cellArr.push(
                <TableCell className={classes.tableCell} style={{ fontFamily: "NanumBarunGothic YetHangul" }}>
                    {this.state.isEditable?
                            <span style={{display: 'flex', width: '100%'}}>
                                <input style={{width: '90%'}} value={this.state.data.text} type='text' onChange={this.handleChange}/>
                                <CheckCircleIcon style={{width: '10%', cursor: 'pointer'}} onClick={() => this.handleSubmit()}/>
                            </span>
                            :
                            <span style={{display: 'flex', width: '100%'}}>
                                <p dangerouslySetInnerHTML={{ __html: row.text }} style={{width: '90%'}}/>
                                <CreateIcon style={{width: '10%', cursor: 'pointer'}} onClick={() => this.handleEdit()}/>
                            </span>
                    }

                </TableCell>)
        });
        return cellArr;
    };

    render() {
        const {row, classes, tableHeaders} = this.props;
        if (row.text !== this.state.data.text && !this.state.isEditable)
            this.setState({
                ...this.state,
                data: {
                    order_id: this.props.row.order_id,
                    id: this.props.row.id,
                    text: this.props.row.text
                }
            });
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

export default withStyles(styles)(connect(null, {editStoryByLine})(EditableTableRow));
