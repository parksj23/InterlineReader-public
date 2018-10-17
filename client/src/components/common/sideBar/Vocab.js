import React, {Component} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux";
import {updateHighlightedWord} from '../../../actions/vocab';
import {addSavedWord, updateSavedWords} from "../../../actions/sideBar";

class Vocab extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
    this.updateHighlightWord.bind(this);
  }

  handleAddSavedWord =(vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) === -1){
      this.props.addSavedWord(vocabWord)
      this.props.addWord('success');
    }
  }

  updateHighlightWord = (vocabWord) =>{
    this.props.updateHighlightedWord(vocabWord)

  }

  componentWillUnmount(){
    let vocabList = this.props.stories.vocabList.vocabList;
    console.log(vocabList)

    let params = {
      userId: this.props.userId,
      storyTitle: this.props.stories.storyTitle,
      vocabList
    }
    this.props.updateSavedWords(params);
  }

  renderVocab = (vocabWord) => {
    const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"};
    return(
      <TableRow>
        <TableCell style={{whiteSpace: "nowrap", cursor: 'pointer', maxWidth: "116px", paddingRight: "25px"}} onClick={() => this.updateHighlightWord(vocabWord)}>{vocabWord.korean}</TableCell>
        <TableCell style={pointerButton}>{vocabWord.english}</TableCell>
        <TableCell onClick={ ()=> this.handleAddSavedWord(vocabWord)}><Tooltip disableFocusListener title="Save Vocab"><i style={pointerButton} className="material-icons">add</i></Tooltip></TableCell>
      </TableRow>
    )
  }

  render(){
    return(
        <Table classesName={'table'}>
          <TableHead>
            <TableRow>
              <TableCell style={{maxWidth: "116px", paddingRight: "25px"}}> 한국어 </TableCell>
              <TableCell style={{maxWidth: "116px", paddingLeft: "12px"}}> 영어 </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.vocab ? this.props.vocab.map((aVocab) => {return this.renderVocab(aVocab)}) : null}
          </TableBody>
        </Table>
    )
  }
}


const mapStateToProps = state => (
  {
    stories: state.stories,
    userId: state.auth.user.id
  }
)

const mapDispatchToProps = ({updateHighlightedWord, addSavedWord, updateSavedWords})

export default connect(mapStateToProps, mapDispatchToProps)(Vocab);