import React, {Component} from "react";
import {connect} from "react-redux";

import {getVocabforStory} from '../../../../../actions/vocab';

class Dictionary extends Component {
  render(){
    return(
      <div style={{height: "40vh"}}>
        <iframe title={'dictionaryIframe'} style={{width: "100%", height: "100%"}} className="frame" src="https://krdict.korean.go.kr/eng/smallDic/mainAction?nationCode=6"></iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);