import React, {Component} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import "./styles/statusMessage.css"
import IconButton from '@material-ui/core/IconButton';

const successStyles = {
  backgroundColor: '#42b35b'

}

const failStyles ={
  backgroundColor: '#d32f2f'
}


class StatusMessage extends Component {
  render() {
    let {status} = this.props

    return(
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={2000}
          onClose={this.props.handleClose}
          message={this.props.message}
          ContentProps ={{style: status === 'success' ? successStyles : failStyles}}
          action={[
            <Button key="undo" color="primary" size="small" onClick={this.handleClose}>
              undo
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon onClick={this.props.handleClose}/>
            </IconButton>,
          ]}
        />
      </div>
    )
  }
};

export default StatusMessage;
