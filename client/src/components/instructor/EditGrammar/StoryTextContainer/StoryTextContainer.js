import React from 'react'
import Paper from '@material-ui/core/Paper';
import StoryText from './StoryText';

const StoryTextContainer = (props) => {
  const {text, searchWord} = props;
  return(
    <div>
      <Paper elevation={1}>
        {props.text ?
          <StoryText title={props.editGrammar.storyInfo.titleKorn}
                     author={props.editGrammar.storyInfo.authorKorn}
                     text={props.text}
                     searchWord={searchWord || "!@F$@%F"}
                     handleSelectHighlight={props.handleSelectHighlight}
                     handleUserHighlightText={props.handleUserHighlightText}
                     updateUserHighlightedText={props.updateUserHighlightedText}
                     startUpdatingHighlightedText={props.startUpdatingHighlightedText}
                     editGrammar={props.editGrammar}
          />
          : null}
      </Paper>
    </div>
  )

}

export default (StoryTextContainer);