import React, { Component } from 'react';
import { Grid,
  Tabs,
  Tab,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography} from "@material-ui/core";
import {getModernKorean} from "../../../actions/KORN410/dashboard";
import TablePaginationWrapper from './common/TablePaginationWrapper'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "./common/Search/Search"
import {connect} from "react-redux";

const vocabTableHeaders = [
  {
    label: "Korean",
    value: "korean"
  },
  {
    label: "Hanja",
    value: "hanja"
  },
  {
    label: "English",
    value: "english"
  }
]

const grammarTableHeaders = [
  {
    label: "Sentence",
    value: "sentence"
  },
  {
    label: "Pattern",
    value: "pattern"
  },
  {
    label: "Here",
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
          <div className="instructor-heading">
              <h2 style={{fontWeight: 'bold'}}>Modern Korean Vocabularies and Grammars</h2>
              <p>View and search vocabularies and grammars from all Modern Korean stories.</p>
          </div>
            <Tabs
              value={this.state.tabValue}
              onChange={this.handleOnChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
              style={{padding: '2%'}}
            >
              <Tab label="Vocabulary"/>
              <Tab label="Grammar"/>
            </Tabs>

            { this.props.dashboard.modKr.modKrGram && this.props.dashboard.modKr.modKrVoc ?
              <Paper style={{padding: '0 10% 10% 10%', height:'100%', boxShadow: 'none'}}>
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
