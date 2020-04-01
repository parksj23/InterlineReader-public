import React, { Component } from 'react';
import { Grid, Tabs, Tab, Paper} from "@material-ui/core";
import {getMiddleKorean} from "../../../actions/dashboard";
import {connect} from "react-redux";
import TablePaginationWrapper from './common/TablePaginationWrapper'

const vocabTableHeaders= [
  "Romanized Stem",
  "Hankul Stem",
  "Here",
  "English",
  "Hanja"
]

const grammarTableHeaders = [
  "English Category",
  "Annotation",
  "Romanized Shape",
  "Hankul Shape",
  "Romanized Example",
  "Hankul Example",
  "*Ur",
  "English Translation of Example",
  "Line Number"
]

class MiddleKoreanContainer extends Component {
  constructor() {
    super();
    this.state = {
      tabValue: 0
    }
  }

  componentWillMount(){
    this.props.getMiddleKorean();
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  render() {
    return (
      <div className="dashboard-middleKorean">
          <Grid container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleOnChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Vocabulary"/>
                <Tab label="Grammar"/>
              </Tabs>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} style={{padding: "12px"}}>
              <Paper>
                {
                  this.state.tabValue === 0 ?
                    <TablePaginationWrapper
                      tableHeaders={vocabTableHeaders}
                      list={this.props.dashboard.midKr.midKrVoc}/> :
                    <TablePaginationWrapper
                      tableHeaders={grammarTableHeaders}
                      list={this.props.dashboard.midKr.midKrGram}
                    />
                }
              </Paper>
            </Grid>
          </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard,
  storyList: state.app.storyList
});

const mapDispatchToProps = ({
  getMiddleKorean
})

export default connect(mapStateToProps, mapDispatchToProps)(MiddleKoreanContainer);
