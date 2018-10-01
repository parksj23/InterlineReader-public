import React, {Component} from "react";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getVocabforStory} from '../../../actions/vocab';

class Vocab extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
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

  render(){
    const vocabList = this.props.vocab;
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
            {vocabList.map((aVocab) => {return this.renderVocab(aVocab)})}
          </TableBody>
        </Table>
      </div>

    )

  }



}

const mapStateToProps = state => (
  {
    vocab: [
      {
        "_id": 8,
        "korean": "개울둑",
        "hanja": "--",
        "english": "[-뚝] bank or levy along/of a brook or small stream",
        "order_id": 8
      },
      {
        "_id": 9,
        "korean": "비키기",
        "hanja": "--",
        "english": "비키다: get out of the way; step aside (from)",
        "order_id": 9
      },
      {
        "_id": 10,
        "korean": "요행",
        "hanja": "僥倖/徼幸",
        "english": "as luck would have it, by chance",
        "order_id": 10
      },
      {
        "_id": 11,
        "korean": "분홍",
        "hanja": "粉紅",
        "english": "pink (color)",
        "order_id": 11
      },
      {
        "_id": 4,
        "korean": "물장난",
        "hanja": "--",
        "english": "[-짱난] dabbling/playing in water",
        "order_id": 4
      },
      {
        "_id": 12,
        "korean": "소매",
        "hanja": "--",
        "english": "sleeve",
        "order_id": 12
      },
      {
        "_id": 13,
        "korean": "걷어 올린",
        "hanja": "--",
        "english": "걷어올리다: roll up",
        "order_id": 13
      },
      {
        "_id": 15,
        "korean": "마냥",
        "hanja": "--",
        "english": "to one's heart's content; to the fullest extent, all the way",
        "order_id": 15
      },
      {
        "_id": 14,
        "korean": "목덜미",
        "hanja": "--",
        "english": "nape of one's neck",
        "order_id": 14
      },
      {
        "_id": 17,
        "korean": "빤히",
        "hanja": "--",
        "english": "clearly, obviously; brightly; (stare) fixedly, hard, intently",
        "order_id": 17
      },
      {
        "_id": 16,
        "korean": "희었다",
        "hanja": "--",
        "english": "희다: be white",
        "order_id": 16
      },
      {
        "_id": 1,
        "korean": "초시",
        "hanja": "初試",
        "english": "title of somebody who has passed the first stage of examinations under the old 과거 (科擧) examination system",
        "order_id": 1
      },
      {
        "_id": 20,
        "korean": "움켜",
        "hanja": "--",
        "english": "움키다: clasp; clench; grasp; clutch",
        "order_id": 20
      },
      {
        "_id": 21,
        "korean": "움켜 낸다",
        "hanja": "--",
        "english": "움켜 내다: seize/grab and pull/take out",
        "order_id": 21
      }




    ]}
)

const mapDispatchToProps = ({
  getVocabforStory
})

export default connect(mapStateToProps, mapDispatchToProps)(Vocab);