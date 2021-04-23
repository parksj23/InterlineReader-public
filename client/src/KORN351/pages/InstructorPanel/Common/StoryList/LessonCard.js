import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

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
  let lesson = props.lesson;
  const {classes} = props
 return (
  <Card style={{width: "100%"}}>
      <CardHeader title={"Lesson " + lesson} classes={{root: classes.headerRoot, title: classes.headerTitle, subheader: classes.subHeaderTitle}}>
      </CardHeader>
      <CardContent classes={{root: classes.content}}>
        <div>
          <p>Click to edit Lesson {lesson}</p>
        </div>
      </CardContent>
  </Card>)
}

export default withStyles(styles)(ClassCard);