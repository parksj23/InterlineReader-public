import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "./StoryText.css";
import Grid from '@material-ui/core/Grid';


var Highlight = require('react-highlighter');

class StoryText extends Component {

  constructor(props){
    super(props)
    this.state = {
      highlightSelection: null
    }
  }

  componentDidMount(){
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState){
  }


  handleWordClick = (e) => {
    let text =  null;
    if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
      if(text !== ""){
        this.props.startUpdatingHighlightedText("Vocab");
        this.props.updateUserHighlightedText(text, "Vocab");
      }
      else this.props.handleSelectHighlight(e.target.innerHTML)
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
      if(text !== ""){
        this.props.startUpdatingHighlightedText("Vocab");
        this.props.updateUserHighlightedText(text, "Vocab");
      }
      else this.props.handleSelectHighlight(e.target.innerHTML)
    }
    else{
      this.props.handleSelectHighlight(e.target.innerHTML)
    }

  }

  handleInlineTags = (phrase, tagArray) => {
    let highligherComponents = []
    let i=0
    while(tagArray && tagArray.length > 0){
      //if there is text before the first inline HTML tag
      if(phrase.indexOf(tagArray[0]) !== 0){
        let plainText = phrase.slice(0, phrase.indexOf(tagArray[0]))
        let highlight = (
          <Highlight key={`a-inLineTag--phrase-key-${i}`} search={this.props.searchWord} matchStyle={{color: 'red'}} onClick={(plainText)=> this.props.handleSelectHighlight(plainText)}>
            {plainText}
          </Highlight>
        )
        highligherComponents.push(React.createElement('span', {}, highlight))
        phrase = phrase.substring(phrase.indexOf(tagArray[0]))
      }
      else{
        let plainText = phrase.slice(phrase.indexOf(tagArray[0]) +tagArray[0].length, phrase.indexOf(tagArray[1]));
        let openTag = phrase.slice(phrase.indexOf("<") + 1, phrase.indexOf(">"))
        if(openTag.indexOf(" ") >= 0){
          openTag = openTag.split(" ")[0]
        }
        let highlight = (
          <Highlight key={`b-inLineTag--phrase-key-${i}`} search={this.props.searchWord} matchStyle={{color: 'red'}} onClick={(plainText)=> this.props.handleSelectHighlight(plainText)}>
            {plainText}
          </Highlight>
        )
        highligherComponents.push(React.createElement(openTag, {}, highlight))

        phrase = phrase.substring(phrase.indexOf(tagArray[1]) + tagArray[1].length)
        tagArray.splice(0,2)
      }
      i++
    }
    return highligherComponents

  }
  render() {
    return (
      <Grid container>
        <Grid item md={1}/>
        <Grid item xs={12} md={10}>
          <div className="col-lg-12 context engVer" style={{paddingBottom: "1em"}} id="theHeaderVocab" onClick={this.handleWordClick.bind(this)}>
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
            <span style={{textAlign: 'left', width: "50%"}}>
              <h3> {this.props.editVocab.storyInfo.titleKorn} </h3>
            </span>
              <span style={{textAlign: 'Right', width: "50%"}}>
              <h3>{this.props.editVocab.storyInfo.authorKorn}</h3>
            </span>
            </div>
            <Divider style={{marginBottom: "0.5rem"}}/>
            {
              this.props.editVocab.MODKR.storyText.map((aSegment, index) => {
                let text = aSegment.text
                let textSection = text.match(/<\s*.*>(.*?)<\s*\/.*>/g)

                if (textSection) {
                  let phraseArr = []
                  if (text.indexOf("<") > 0) {
                    let plainText = text.slice(0, text.indexOf("<"));
                    let childComponent = (
                      <Highlight key={`a-phrase-key-${index}`} search={this.props.searchWord} matchStyle={{color: 'red'}}>
                        {plainText}
                      </Highlight>
                    )
                    phraseArr.push(React.createElement('span', aSegment.style, childComponent))
                  }
                  textSection.map((phrase,index) => {
                      let numberOfInlineTags = phrase.match(/<(.|\n)*?>/g);

                      //if there are two or more inline HTML tags
                      if (numberOfInlineTags.length > 2) {
                        phraseArr.push(this.handleInlineTags(phrase, numberOfInlineTags))
                      }
                      else {
                        //if there is text before the first HTML tag
                        let openTag = phrase.slice(phrase.indexOf("<") + 1, phrase.indexOf(">"))
                        if(openTag.indexOf(" ") >= 0){
                          openTag = openTag.split(" ")[0]
                        }
                        let phraseText = phrase.slice(phrase.indexOf(">") + 1, phrase.lastIndexOf("<"))
                        const HighlightComponent = (
                          <Highlight key={`b-phrase-key-${index}`} search={this.props.searchWord} matchStyle={{color: 'red'}}>
                            {phraseText}
                          </Highlight>
                        )
                        let childHTML = React.createElement(`${openTag}`, aSegment.style, HighlightComponent)
                        let parentHTML = React.createElement('span', {style: aSegment.style}, childHTML)
                        phraseArr.push(parentHTML)
                      }
                    }
                  )
                  if (text.lastIndexOf(">") < text.length - 1) {

                    let plainText = text.slice(text.lastIndexOf(">") + 1);
                    let childComponent = (
                        <Highlight key={`c-phrase-key-${index}`} search={this.props.searchWord} matchStyle={{color: 'red'}}>
                          {plainText}
                        </Highlight>
                    )
                    phraseArr.push(React.createElement('span', aSegment.style, childComponent))
                  }
                  return (
                    <div key={"storySeg_" + index}>
                      {
                        React.createElement('p', {style: {textAlign: "left", fontSize: "14pt"}}, phraseArr)
                      }
                    </div>
                  )
                }

                else {
                  let childComponent = (
                    <Highlight key={`d-phrase-key-${index}`}search={this.props.searchWord} matchStyle={{color: 'red'}}>
                      {aSegment.text}
                    </Highlight>
                  )
                  return (
                    <div key={"storySeg_" + index}>
                      {
                        //armaandh: Added font size changes here
                        React.createElement('p', {style: {textAlign: "left", fontSize: "14pt"}}, childComponent)
                      }
                    </div>
                  )
                }
              })
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default StoryText;
