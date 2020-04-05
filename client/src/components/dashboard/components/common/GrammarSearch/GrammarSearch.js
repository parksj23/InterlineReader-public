import React, {Component} from "react";
import FusePicker from "../../../../../../node_modules/react-fuse-picker/lib/components/FusePicker";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Grid, TextField, Typography, MenuItem} from "@material-ui/core";
import "./style/grammarSearch.css";

class GrammarSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      items: [],
      keys: {
        "hankulShape": "hankulShape"
      },
      hankulShape: "hankulShape",
      fuseOptions: {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 50,
        maxPatternLength: 12,
        minMatchCharLength: 3,
        keys: ["hankulShape"]
      },
      selectedSearchColumn: ""
    };
  }

  componentDidMount() {
    this.setState({
      items: this.props.items
    })
  }

  handleOnChangeField = name => event => {
    let newFuseOptions = this.state.fuseOptions
    let newKeys = []
    newKeys.push(event.target.value)
    newFuseOptions.keys = newKeys
    this.setState({
      [name]: event.target.value,
      fuseOptions: newFuseOptions,
    })
  }

  updateSearchTerm = searchTerm => {
    this.setState({
      searchTerm
    });
  };

  render() {
    return (
      <Grid style={{marginTop: "2em"}} container>
        <Grid item xs={12} justify='center'>
          <h5 style={{backgroundColor: "#ffd8d5", padding: "15px"}}>
            Instructions: Select a search filter and start typing a search term such as "가" in the box
            below to search for grammar patterns starting with that character.
          </h5>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="search-column"
            select
            label="Search Column"
            value={this.state.selectedSearchColumn}
            onChange={this.handleOnChangeField('selectedSearchColumn')}
            margin="normal"
            style={{width: "100%"}}
          >
          {this.props.tableHeaders.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid item xs={12} justify="center">
          <div style={{display: "flex", justifyContent: "center"}}>
            <span> Search Term</span>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <FusePicker
              isOpen={true}
              items={this.state.items}
              renderItem={item => {
                let data = []

                this.props.tableHeaders.forEach(aColumn => {
                  data.push(
                    <div>
                      <h4>{aColumn.label}</h4>
                      <p>{item[aColumn.value]}</p>
                    </div>
                  )
                })
                return (
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography variant="title">{item[this.state.selectedSearchColumn]}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {data}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              }}
              fuseOptions={this.state.fuseOptions}
              onChange={(item) => {
                this.updateSearchTerm(item)
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}


export default GrammarSearch;
