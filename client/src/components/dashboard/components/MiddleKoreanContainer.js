import React, {Component} from 'react';
import {
  Grid,
  Tabs,
  Tab,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import {getMiddleKorean} from "../../../actions/dashboard";
import {connect} from "react-redux";
import TablePaginationWrapper from './common/TablePaginationWrapper'
import Search from './common/Search/Search';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const vocabTableHeaders = [
  {
    label: "Romanized Stem",
    value: "romStem"
  },
  {
    label: "Hankul Stem",
    value: "hankulStem"
  },
  {
    label: "Here",
    value: "here"
  },
  {
    label: "English",
    value: "english"
  },
  {
    label: "Hanja",
    value: "hanja"
  }
]

const grammarTableHeaders = [
  {
    label: "English Category",
    value: "engCat"
  },
  {
    label: "Annotation",
    value: "annotation"
  },
  {
    label: "Hankul Shape",
    value: "hankulShape"
  },
  {
    label: "Romanized Shape",
    value: "romShape"
  },
  {
    label: "Romanized Example",
    value: "romExample"
  },
  {
    label: "Hankul Example",
    value: "hankulExample"
  },
  {
    label: "*Ur",
    value: "ur"
  },
  {
    label: "English Translation of Example",
    value: "engTransExample"
  },
  {
    label: "Line Number",
    value: "lineNumber"
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

class MiddleKoreanContainer extends Component {
  constructor() {
    super();
    this.state = {
      tabValue: 0
    }
  }

  componentWillMount() {
    this.props.getMiddleKorean().then(resp => {});
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
            { this.props.dashboard.midKr.midKrGram && this.props.dashboard.midKr.midKrVoc ?
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
                          list={this.props.dashboard.midKr.midKrVoc}/>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Search Vocabulary</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Search key={'midKr-vocabulary-search'}
                          items={this.props.dashboard.midKr.midKrVoc}
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
                          list={this.props.dashboard.midKr.midKrGram}/>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Search Grammar</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Search key={'midKr-grammar-search'}
                          items={this.props.dashboard.midKr.midKrGram}
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
  getMiddleKorean
})

export default connect(mapStateToProps, mapDispatchToProps)(MiddleKoreanContainer);
