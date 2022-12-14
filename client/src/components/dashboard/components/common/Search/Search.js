import React, {Component} from "react";
import FusePicker from "../../../../../../node_modules/react-fuse-picker/lib/components/FusePicker";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Grid, TextField, Typography, MenuItem} from "@material-ui/core";
import "./style/Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      items: [],
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
    let items = this.props.items;
    this.props.processSearchEntriesMap.forEach( anEntry => {
      items.forEach(aSearchEntry => {
        this.props.tableHeaders.forEach( aTableHeader => {
          let value = aSearchEntry[aTableHeader.value];
          if(value) {
            value = value.replace(new RegExp(`${anEntry.from}`, "g"), anEntry.to)
            aSearchEntry[aTableHeader.value] = value
          }
        })
      })
      }
    )
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
            this.props.items.length > 0 ?
                <Grid style={{marginTop: "2em"}} container>
                    <Grid item xs={12} justify='center'>
                        <p style={{color: 'white', backgroundColor: 'darkred', padding: '1% 3%', fontSize: '15px', width: '100%', display: 'inline-block', textAlign: 'center'}}>
                            Instructions: Select a search filter and start typing a search term such as "???" in the box
                            below to search for grammar patterns starting with that character.
                        </p>
                    </Grid>
                    <Grid item xs={12} justify="center" style={{display: 'flex'}}>
                        <TextField
                            id="search-column"
                            select
                            label="Search Column"
                            value={this.state.selectedSearchColumn}
                            onChange={this.handleOnChangeField('selectedSearchColumn')}
                            margin="normal"
                            style={{width: "20%"}}
                        >
                            {this.props.tableHeaders.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <div style={{width: '100%'}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <span> Search Term</span>
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <FusePicker
                                    isOpen={true}
                                    items={this.props.items}
                                    renderItem={item => {
                                        let data = []
                                        this.props.tableHeaders.forEach(aColumn => {
                                            data.push(aColumn.label !== "Pattern"?
                                                <div>
                                                    <h4>{aColumn.label}</h4>
                                                    <p>{item[aColumn.value]}</p>
                                                </div> :
                                                <div>
                                                    <h4>{aColumn.label}</h4>
                                                    <p dangerouslySetInnerHTML={{ __html: item[aColumn.value] }} />
                                                </div>
                                            )
                                        })
                                        return (
                                            <Grid container>
                                                <ExpansionPanel style={{width: "100%"}}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography variant="title">
                                                            {
                                                                this.state.selectedSearchColumn === "Pattern"?
                                                                    item[this.state.selectedSearchColumn]
                                                                    :
                                                                    <p dangerouslySetInnerHTML={{ __html: item[this.state.selectedSearchColumn] }} />
                                                            }
                                                        </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            {data}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </Grid>
                                        );
                                    }}
                                    fuseOptions={this.state.fuseOptions}
                                    onChange={(item) => {
                                        this.updateSearchTerm(item)
                                    }}
                                />
                            </div>
                        </div></Grid>
                </Grid>  : null
        );
    }
}

export default Search;
