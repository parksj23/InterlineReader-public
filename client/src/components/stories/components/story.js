import React from 'react'
import Paper from '@material-ui/core/Paper';
import StoryText from './common/storyText';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';


import SpeedDial, { SpeedDialItem, SpeedDialLabel, SpeedDialBackdrop } from '@smollweide/material-ui-speed-dial';
import presetFixedBottomRight from '@smollweide/material-ui-speed-dial/dist/presets/presetFixedBottomRight';

const Story = (props) => {
  const {text, searchWord, classes, title, author, language, handleTranslate, handleFlashCards, isSpeedDialOpen, handleOpenSpeedDial, handleCloseSpeedDial} = props;
  return(
    <div>
      <Paper elevation={1} style={props.sideBar && props.sideBar.isSideBarOpen ? {marginLeft: props.sideBar.drawerSize.width+ "px"} : null}>
        {text ?
          <StoryText title={title}
                     author={author}
                     text={text}
                     searchWord={searchWord || "!@F$@%F"}
                     language={language}
                     />
          : null}
      </Paper>
      <div className='translateContainer' classes={{root: classes.buttonContainer}}>

        <SpeedDial
          isOpen={isSpeedDialOpen}
          preset={classes}
          renderButton={(props, propsIcon) => (
            <Button {...props} variant="fab" color="primary" aria-label="add" onClick={handleOpenSpeedDial}>
              <i className="material-icons">
                add
              </i>
            </Button>
          )}
          renderOpenedButton={(props, propsIcon) => (
            <Button {...props} variant="fab" color="secondary" aria-label="edit" onClick={handleCloseSpeedDial}>
              <i className="material-icons">
                clear
              </i>
            </Button>
          )}
          renderList={props => <ul {...props} />}
          renderBackdrop={(props) => <SpeedDialBackdrop {...props} />}
        >
          {props => [
            <SpeedDialItem
              {...props}
              key="e"
              onClick={() => handleTranslate("korean")}
            >
            {propsLabel => <SpeedDialLabel {...propsLabel} text="Modern Korean" />}
            </SpeedDialItem>,
            <SpeedDialItem
              {...props}
              key="d"
              onClick={() => handleTranslate("english")}
            >
              {propsLabel => <SpeedDialLabel {...propsLabel} text="English" />}
            </SpeedDialItem>,
            <SpeedDialItem
              {...props}
              key="c"
              onClick={() => handleTranslate("middleKorean")}
            >
              {propsLabel => <SpeedDialLabel {...propsLabel} text="Middle Korean" />}
            </SpeedDialItem>,
            <SpeedDialItem
              {...props}
              key="b"
              onClick={() => handleTranslate("hanmun")}
            >
              {propsLabel => <SpeedDialLabel {...propsLabel} text="Hanmun" />}
            </SpeedDialItem>,
            <SpeedDialItem {...{ ...props, className: `${props.className} ${classes.firstItem}` }}
                           key="a"
                           onClick={handleFlashCards}
            >
              {propsLabel => <SpeedDialLabel {...propsLabel} text="Flashcards" />}
            </SpeedDialItem>,
          ]}
        </SpeedDial>
      </div>
    </div>
  )

}

export default withStyles(presetFixedBottomRight)(Story);