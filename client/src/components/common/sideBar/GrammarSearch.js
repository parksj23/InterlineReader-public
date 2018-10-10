import React, {Component} from "react";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getVocabforStory} from '../../../actions/vocab';
import SearchInput, {createFilter} from 'react-search-input'
import Grid from "@material-ui/core/Grid";


const KEYS_TO_FILTER = ["random"];
const grammar = ['apples', 'oranges', 'bananas'];

class GrammarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.renderVocab.bind(this);
    this.updateSearchTerm.bind(this);
  }

  renderVocab = (vocabWord) => {
    return(
      <TableRow>
        <TableCell style={{whiteSpace: "nowrap"}}>{vocabWord.korean}</TableCell>
        <TableCell>{vocabWord.english}</TableCell>
        <TableCell><i className="material-icons">add</i></TableCell>
      </TableRow>
    )
  }

  updateSearchTerm = (searchTerm) => {
    this.setState({
      searchTerm
    })
  }

  render(){
    const vocabList = this.props.vocab;
    const filteredGrammar = grammar.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER));


    return(
      <div>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <SearchInput onChange={this.updateSearchTerm}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>한국어</TableCell>
                  <TableCell>영어</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>

    )

  }



}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = ({
  getVocabforStory
})

export default connect(mapStateToProps, mapDispatchToProps)(GrammarSearch);