import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {withStyles} from '@material-ui/core/styles';
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
  const {classes, aClass} = props
  return (
    <Grid item xs={3} style={{padding: "1rem"}}>
      <Card style={{width: "100%"}}>
        <CardHeader title={aClass.className} subheader={aClass.classDesc}
                    classes={{root: classes.headerRoot, title: classes.headerTitle, subheader: classes.subHeaderTitle}}>
        </CardHeader>
        <CardContent classes={{root: classes.content}}>
          <div>
            <p>Stories: {aClass.storyList.length}</p>
          </div>
        </CardContent>
        <Divider/>
        <CardActions>
          <IconButton onClick={()=> props.history.push(`/instructor410/classes/editClass/${aClass._id}`)}><i className="material-icons">create</i></IconButton>
        </CardActions>
      </Card>
    </Grid>)
}


export default withStyles(styles)(ClassCard);