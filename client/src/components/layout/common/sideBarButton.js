import React from 'react'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core/styles";

const styles = {
  menuButton: {
    color: "#FFFFFF"
  }
}

const SideBarButton = (props) => {
  const {classes, isDisabled} = props
  return(
    <Tooltip disableFocusListener title="Open Drawer">
      <Button classes={{root: classes.menuButton}} onClick={props.toggleDrawer('left', true)} disabled={isDisabled}>
        <i className="material-icons" style={{zoom: "1.5"}}>menu</i>
      </Button>
    </Tooltip>
  )

}
export default withStyles(styles)(SideBarButton)