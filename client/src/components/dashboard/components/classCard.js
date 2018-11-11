import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';

const styles = {
  headerRoot: {
    backgroundColor: "#002145",
  },
  headerTitle: {
    color: "#FFFFFF"
  }

}

const ClassCard = (props) => {
  const {classes} = props
 return (
  <Card style={{width: "100%"}}>
      <CardHeader title={props.storyName} classes={{root: classes.headerRoot, title: classes.headerTitle}}></CardHeader>
      <CardContent>
        <div>
          Description of story
        </div>
      </CardContent>
      <Divider/>
      <CardActions>
        <IconButton><i className="material-icons">announcement</i></IconButton>
        <IconButton><i className="material-icons">pageview</i></IconButton>
      </CardActions>
  </Card>)
}


export default withStyles(styles)(ClassCard);