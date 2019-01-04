import React, {Component} from "react";
import {connect} from "react-redux";

import {getVocabforStory} from '../../../../../actions/vocab';

class Dictionary extends Component {
  render(){
    return(
      <div style={{height: "100vh"}}>
        <iframe title={'dictionaryIframe'} style={{width: "100%", height: "100%"}} className="frame" src="https://small.dic.daum.net/search.do?q=%EA%B0%90%EC%9E%90&dic=eng"></iframe>
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