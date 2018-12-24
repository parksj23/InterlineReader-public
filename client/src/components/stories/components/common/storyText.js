import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "../../styles/stories.css";
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid';


var Highlight = require('react-highlighter');

class StoryText extends Component {

  handleInlineTags = (phrase, tagArray) => {
    let highligherComponents = []

    while(tagArray && tagArray.length > 0){

      //if there is text before the first inline HTML tag
      if(phrase.indexOf(tagArray[0]) !== 0){
        let plainText = phrase.slice(0, phrase.indexOf(tagArray[0]))
        let highlight = (
          <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
            {plainText}
          </Highlight>
        )
        highligherComponents.push(React.createElement('span', {}, highlight))
        phrase = phrase.substring(phrase.indexOf(tagArray[0]))
      }
      else{
        let plainText = phrase.slice(phrase.indexOf(tagArray[0]) +tagArray[0].length, phrase.indexOf(tagArray[1]));
        let openTag = phrase.slice(phrase.indexOf("<") + 1, phrase.indexOf(">"))
        let highlight = (
          <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
            {plainText}
          </Highlight>
        )
        highligherComponents.push(React.createElement(openTag, {}, highlight))

        phrase = phrase.substring(phrase.indexOf(tagArray[1]) + tagArray[1].length)
        tagArray.splice(0,2)
      }
    }
    return highligherComponents

  }

  render() {
    return (
      <Grid container>
        <Grid item md={1}/>
        <Grid item xs={12} md={10}>
          <div className="col-lg-12 context engVer" style={{paddingBottom: "1em"}} id="theHeader">
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
            <span style={{textAlign: 'left', width: "50%"}}>
              <h3> {this.props.title} </h3>
            </span>
              <span style={{textAlign: 'Right', width: "50%"}}>
              <h3>{this.props.author}</h3>
            </span>
            </div>
            <Divider style={{marginBottom: "0.5rem"}}/>
            {
              this.props.text.map((aSegment, index) => {
                let text = aSegment.text
                let textSection = text.match(/<\s*.*>(.*?)<\s*\/.*>/g)

                if (textSection) {
                  let phraseArr = []
                  if(text.indexOf("<") > 0) {
                    let plainText = text.slice(0, text.indexOf("<"));

                    let childComponent = (
                      <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
                        {plainText}
                      </Highlight>
                    )
                    phraseArr.push(React.createElement('span',aSegment.style, childComponent))
                  }
                  textSection.map(phrase => {
                      let numberOfInlineTags = phrase.match(/<(.|\n)*?>/g);

                      //if there are two or more inline HTML tags
                      if (numberOfInlineTags.length > 2) {
                        phraseArr = this.handleInlineTags(phrase,numberOfInlineTags)
                      }
                      else {
                        //if there is text before the first HTML tag
                        let openTag = phrase.slice(phrase.indexOf("<") + 1, phrase.indexOf(">"))
                        let phraseText = phrase.slice(phrase.indexOf(">") + 1, phrase.lastIndexOf("<"))
                        const HighlightComponent = (
                          <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
                            {phraseText}
                          </Highlight>
                        )
                        let childHTML = React.createElement(`${openTag}`, aSegment.style, HighlightComponent)
                        let parentHTML = React.createElement('span', {style: aSegment.style}, childHTML)
                        phraseArr.push(parentHTML)
                      }
                    }
                  )
                  if(text.lastIndexOf(">") < text.length-1) {

                    let plainText = text.slice(text.lastIndexOf(">")+1);
                    let childComponent = (
                      <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
                        {plainText}
                      </Highlight>
                    )
                    phraseArr.push(React.createElement('span', aSegment.style, childComponent))
                  }
                  return (
                    <div key={"storySeg_" + index}>
                      {
                        React.createElement('p', {style: aSegment.style}, phraseArr)
                      }
                    </div>
                  )
                }

                else {
                  let childComponent = (
                    <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>
                      {aSegment.text}
                    </Highlight>
                  )
                  return (
                    <div key={"storySeg_" + index}>
                      {
                        React.createElement('p', {style: aSegment.style}, childComponent)
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

