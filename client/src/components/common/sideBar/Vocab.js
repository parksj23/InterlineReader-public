import React, {Component} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../actions/vocab';
import {addSavedWord} from "../../../actions/sideBar";


class Vocab extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
    this.updateHighlightWord.bind(this);
  }

  handleAddSavedWord =(vocabWord) => {

    let payload = {
      userId: this.props.userId,
      storyTitle: this.props.stories.storyTitle,
      vocabWord
    }

    this.props.addSavedWord(payload);



  }

  updateHighlightWord = (vocabWord) =>{
    console.log(vocabWord)
    this.props.updateHighlightedWord(vocabWord)

  }

  renderVocab = (vocabWord) => {
    return(
      <TableRow>
        <TableCell style={{whiteSpace: "nowrap"}} onClick={() => this.updateHighlightWord(vocabWord)}>{vocabWord.korean}</TableCell>
        <TableCell>{vocabWord.english}</TableCell>
        <TableCell onClick={ ()=> this.handleAddSavedWord(vocabWord)}><i className="material-icons">add</i></TableCell>
      </TableRow>
    )
  }

  render(){
    return(
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>한국어</TableCell>
              <TableCell>영어</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.vocab ? this.props.vocab.map((aVocab) => {return this.renderVocab(aVocab)}) : null}
          </TableBody>
        </Table>
      </div>

    )
  }
}


const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id
  }
)

const mapDispatchToProps = ({updateHighlightedWord, addSavedWord})

export default connect(mapStateToProps, mapDispatchToProps)(Vocab);