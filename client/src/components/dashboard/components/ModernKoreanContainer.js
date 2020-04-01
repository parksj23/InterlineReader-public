import React, { Component } from 'react';
import { Grid, Tabs, Tab, Paper} from "@material-ui/core";
import {getModernKorean} from "../../../actions/dashboard";
import TablePaginationWrapper from './common/TablePaginationWrapper'
import {connect} from "react-redux";

const vocabTableHeaders = [
 "korean",
  "hanja",
  "english"
]

const grammarTableHeaders = [
  "sentence",
  "pattern",
  "here"
]

class ModernKoreanContainer extends Component {
  constructor() {
    super();
    this.state = {
      tabValue: 0
    }
  }

  componentWillMount(){
    this.props.getModernKorean();
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  render() {
    return (
      <div className="dashboard-modernKorean">
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
                    list={this.props.dashboard.modKr.modKrVoc}/> :
                  <TablePaginationWrapper
                    tableHeaders={grammarTableHeaders}
                    list={this.props.dashboard.modKr.modKrGram}
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
  getModernKorean
})

export default connect(mapStateToProps, mapDispatchToProps)(ModernKoreanContainer);
