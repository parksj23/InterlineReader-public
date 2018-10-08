import React, {Component} from "react";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getVocabforStory} from '../../../actions/vocab';
import {getSavedWords, deleteSavedWord} from "../../../actions/sideBar";

class SavedWords extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
  }

  componentWillMount(){
  }

  handleDelete = (vocabWord) => {
    let vocabList = this.props.stories.vocabList.vocabList;
    if(vocabList.indexOf(vocabWord.order_id) !== -1){
      let payload = {
        userId: this.props.userId,
        storyTitle: this.props.stories.storyTitle,
        vocabWord
      }
      this.props.deleteSavedWord(payload);
    }
  }

  renderVocab = (vocabWord) => {
    return(
      <TableRow>
        <TableCell style={{whiteSpace: "nowrap"}}>{vocabWord.korean}</TableCell>
        <TableCell>{vocabWord.english}</TableCell>
        <TableCell onClick={()=> this.handleDelete(vocabWord)}><i className="material-icons">delete</i></TableCell>
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
            {savedWords ? savedWords.map((aVocab) => {return this.renderVocab(aVocab)}): null}
          </TableBody>
        </Table>
      </div>

    )

  }



}


const mapStateToProps = state => (
  {userId: state.auth.user.id,
  savedWords: state.sideBar.savedWords,
    stories: state.stories
  }
)

const mapDispatchToProps = ({
  getVocabforStory,
  getSavedWords,
  deleteSavedWord
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedWords);