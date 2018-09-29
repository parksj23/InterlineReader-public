import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";
import Sonagi from './Sonagi/Sonagi';
import SideBar from '../common/sideBar/sideBar';


class Stories extends Component {

  state = {
    applicationDescription: "",
    storyTitle: "",
    language: "english"
  }

  componentWillMount() {
    let pathname = this.props.location.pathname;
    let storyTitle = pathname.slice(pathname.lastIndexOf("/") + 1)
    this.setState({
      storyTitle,
    })
  }

  componentDidMount() {
  }

  handleTranslate = () => {
    this.setState({
      language: this.state.language === 'korean' ? 'english' : 'korean'
    })
  }


  render() {
    const {storyTitle} = this.state;
    //let story = require(`/${storyTitle}/${storyTitle}`)
    return (
      <div>
        <SideBar/>
        <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Paper elevation={1}>
            <Grid container>
              <Grid item xs={1}/>
              <Grid item xs={10}>
                <Sonagi language={this.state.language}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={this.handleTranslate}>Translate</Button>
        </Grid>

      </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {about: state.about}
)

const mapDispatchToProps = ({})

export default connect(mapStateToProps, mapDispatchToProps)(Stories);