import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "./styles/stories.css";
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid';



var Highlight = require('react-highlighter');


class StoryText extends Component {

  render() {
    return (
      <Grid container>
        <Grid item xs={0} md={1} />
        <Grid item xs={12} md={10}>
          <div className="col-lg-12 context engVer" style={{paddingBottom: "1em"}} id="theHeader">
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
            <span style={{textAlign: 'left', width: "50%"}}>
              <h3> Rain Shower </h3>
            </span>
            <span style={{textAlign: 'Right', width: "50%"}}>
              <h3>Hwang Sun-won</h3>
            </span>
            </div>
            <Divider/>
            {
              this.props.text.map((aSegment,index) => {
                return (
                  <div>
                    <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>{ReactHtmlParser(aSegment.text)[0]}</Highlight>
                    <br/><br/>
                  </div>
                )
              })
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default StoryText;

