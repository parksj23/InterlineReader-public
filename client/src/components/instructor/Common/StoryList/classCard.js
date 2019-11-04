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
  },
  subHeaderTitle: {
    color: "#FFFFFF"
  },
  content: {
    color: "#0f0F0F"
  }

}

const ClassCard = (props) => {
  let storyInfo = props.story;
  const {classes} = props
 return (
  <Card style={{width: "100%"}}>
      <CardHeader title={storyInfo.titleKorn} subheader={storyInfo.titleEng} classes={{root: classes.headerRoot, title: classes.headerTitle, subheader: classes.subHeaderTitle}}>
      </CardHeader>
      <CardContent classes={{root: classes.content}}>
        <div>
          <p>Author: {storyInfo.authorKorn} ({storyInfo.authorRom})</p>
        </div>
      </CardContent>
  </Card>)
}


export default withStyles(styles)(ClassCard);