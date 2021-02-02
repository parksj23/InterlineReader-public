import React, {Component} from "react";
import {connect} from "react-redux";
import './styles/collapsableTabs.css';
import CollapsableTabs from './component/CollapsableTabs';
import {changeSelectedMenu} from '../../../actions/KORN410/instructor';
import Grid from '@material-ui/core/Grid';

class CollapsableTabsContainer extends Component {

  state = {
    currentSelected: "addStory"
  }


  handleChangeTab = (newSelect) => {
   this.props.changeSelectedMenu(newSelect)
  }

  render() {

    return (
      <Grid item xs={3}>
        <CollapsableTabs handleChangeTab={this.handleChangeTab}/>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  stories: state.stories
})

const mapDispatchToProps = ({
  changeSelectedMenu
})


export default connect(mapStateToProps, mapDispatchToProps) (CollapsableTabsContainer);