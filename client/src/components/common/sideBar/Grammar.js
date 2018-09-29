import React, {Component} from "react";
import {connect} from "react-redux";
import ReactHTMLParser from "react-html-parser";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Grammar extends Component {
  constructor(props) {
    super(props);
    this.renderVocab.bind(this);
  }

  renderVocab = (grammar) => {
    return(
      <TableRow>
        <TableCell>{grammar.sentence}</TableCell>
        <TableCell>{grammar.pattern}</TableCell>
        <TableCell>{grammar.here}</TableCell>
      </TableRow>
    )
  }

  render(){
    const grammarList = this.props.grammar;
    return(
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sentence</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grammarList.map((grammar) => {return this.renderVocab(grammar)})}
          </TableBody>
        </Table>
      </div>

    )

  }



}

const mapStateToProps = state => (
  {
    grammar: [
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d0"
        },
        "sentence": "지나가는 사람이 있어",
        "pattern": "naked infinitive 있어(서) .",
        "here": "... because there was someone passing by . . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d1"
        },
        "sentence": "한가운데 앉아",
        "pattern": "Naked infinitive 앉아(서) .",
        "here": ". . . sat there smack in the middle. . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d1"
        },
        "sentence": "한가운데 앉아",
        "pattern": "Naked infinitive 앉아(서) .",
        "here": ". . . sat there smack in the middle. . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d3"
        },
        "sentence": "얼굴이라도 비추어 보는 것이리라",
        "pattern": "-(으)리라 [-리라 after vowel or ㄹ -extension of -L- bases] = equivalent to -(으)리다, -겠다 and -(으)ㄹ 것이라 in quotations. The prospective assertive -(으)리다 means a) I will gladly do it, or b) will probably be or do.",
        "here": "She must ['probably'] be looking at her reflection or something . . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d4"
        },
        "sentence": "재미있는 양",
        "pattern": "postmodifier 양 as abbreviation of 모양 appearance, a look, an air; signs, indications, symptoms a way, manner.",
        "here": ". . .[looking] as if she were having a grand old time."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d5"
        },
        "sentence": "개울을 건너는 사람이 있어야",
        "pattern": "-어야 only if one does it (will it do, with the auxiliary 돼 or 해 dropped).",
        "here": ". . . only if there were someone crossing the river . . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d6"
        },
        "sentence": "길을 비킬 모양이다.",
        "pattern": "-(으)ㄹ 모양이다 looks as if doing, appears to be doing.",
        "here": ". . . looks like [she will] move out of the way."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d7"
        },
        "sentence": "다 건너가더니",
        "pattern": "-더니 as now it has been observed that...; when (now or then)..., since (now or then)...; ...and now (or then); ...but now (or then). Implies a marked or abrupt contrast between the first and second clauses: whereupon.",
        "here": ". . . went all the way across, [whereupon] . . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d8"
        },
        "sentence": "저도 모르게",
        "pattern": "Reflexive 저 .Modern Korean distinguishes at least three levels of reflexive pronoun: Low/Deprecatory 저 , Plain 자기 and Honorific 당신 . Note also adverbative -게 in such a way that . . . ",
        "here": ". . . in such a way that even he himself did not know; unbeknownst even to himself. . ."
      },
      {
        "_id": {
          "$oid": "5b9b1d9bf5612fe10d4ae0d9"
        },
        "sentence": "보지 못하기나 한 듯이",
        "pattern": "-(으)ㄴ듯(이) as if, as though, -like.",
        "here": ". . . as if she had never seen . . ."
      }


    ]

  }
)

const mapDispatchToProps = ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Grammar);