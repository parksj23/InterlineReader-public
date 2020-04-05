import React, { Component } from 'react';
import { Grid,
  Tabs,
  Tab,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography} from "@material-ui/core";
import {getModernKorean} from "../../../actions/dashboard";
import TablePaginationWrapper from './common/TablePaginationWrapper'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "./common/Search/Search"
import {connect} from "react-redux";

const vocabTableHeaders = [
  {
    label: "korean",
    value: "korean"
  },
  {
    label: "hanja",
    value: "hanja"
  },
  {
    label: "english",
    value: "english"
  }
]

const grammarTableHeaders = [
  {
    label: "sentence",
    value: "sentence"
  },
  {
    label: "pattern",
    value: "pattern"
  },
  {
    label: "here",
    value: "here"
  }
]

const processSearchEntriesMap = [
  {
    from: "·",
    to: ""
  },
  {
    from: ":",
    to: ""
  },
  {
    from: "-",
    to: ""
  }
]

class ModernKoreanContainer extends Component {
  constructor() {
    super();
    this.state = {
      tabValue: 0
    }
  }

  componentWillMount(){
    this.props.getModernKorean().then(resp => {});
  }

  handleOnChangeTab = (event, value) => {
    this.setState({tabValue: value});
  }

  render() {
    return (
      <div className="dashboard-midKorean">
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
            { this.props.dashboard.modKr.modKrGram && this.props.dashboard.modKr.modKrVoc ?
              <Paper>
                {this.state.tabValue === 0 ?
                  <div>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>All Vocabulary</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <TablePaginationWrapper
                          tableHeaders={vocabTableHeaders}
                          list={this.props.dashboard.modKr.modKrVoc}/>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Search Vocabulary</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Search key={'modKr-vocabulary-search'}
                                items={this.props.dashboard.modKr.modKrVoc}
                                tableHeaders={vocabTableHeaders}
                                processSearchEntriesMap={processSearchEntriesMap}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div> :
                  <div>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>All Grammar</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <TablePaginationWrapper
                          tableHeaders={grammarTableHeaders}
                          list={this.props.dashboard.modKr.modKrGram}/>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Search Grammar</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Search key={'modKr-grammar-search'}
                                items={this.props.dashboard.modKr.modKrGram}
                                tableHeaders={grammarTableHeaders}
                                processSearchEntriesMap={processSearchEntriesMap}/>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                }
              </Paper> : null
            }
          </Grid>
        </Grid>
        <Grid container>
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
