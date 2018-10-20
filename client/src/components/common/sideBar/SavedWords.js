import React, {Component} from "react";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import {getSavedWords, deleteSavedWord, updateSavedWords} from "../../../actions/sideBar";

class SavedWords extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
  }

  componentWillMount(){
  }

  componentWillUnmount(){
    let vocabList = this.props.stories.vocabList.vocabList;

    let params = {
      userId: this.props.userId,
      storyTitle: this.props.stories.storyTitle,
      vocabList
    }
    this.props.updateSavedWords(params);
  }

  handleDelete = (vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) !== -1){
      this.props.deleteSavedWord(vocabWord);
      this.props.getSavedWords(this.props.userId, this.props.stories.storyTitle, this.props.stories.vocabList.vocabList)
    }



  }

  renderVocab = (vocabWord, vocabIndex) => {
    const pointerButton = {cursor: 'pointer', maxWidth: "116px", paddingLeft: "8px"};
    return(
      <TableRow key={'savedWord_'+vocabIndex}>
        <TableCell style={{whiteSpace: "nowrap"}}>{vocabWord.korean}</TableCell>
        <TableCell>{vocabWord.english}</TableCell>
        <TableCell onClick={()=> this.handleDelete(vocabWord)}><Tooltip disableFocusListener title="Delete Word"><i className="material-icons" style={pointerButton}>delete</i></Tooltip></TableCell>
      </TableRow>
    )
  }

  render(){
    const savedWords = this.props.savedWords;
    return(
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>한국어</TableCell>
              <TableCell>영어</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedWords ? savedWords.map((aVocab, vocabIndex) => {return this.renderVocab(aVocab, vocabIndex)}): <TableRow/>}
          </TableBody>
        </Table>
      </div>

    )

  }



}


const mapStateToProps = state => (
  {
    userId: state.auth.user.id,
    savedWords: state.sideBar.savedWords,
    stories: state.stories
  }
)

const mapDispatchToProps = ({
  getSavedWords,
  deleteSavedWord,
  updateSavedWords
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedWords);