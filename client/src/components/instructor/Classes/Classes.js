import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Divider} from '@material-ui/core'
import ClassCard from './classCard';


class Classes extends Component {

  renderClasses = (classList) => {
    let classComponents = [];

    classList.forEach(aClass => {
      classComponents.push(
        <ClassCard aClass={aClass} history={this.props.history}/>
      )
    })
    return classComponents
  }

  render() {
    const activeClasses = []
    const pendingClasses = []
    const archivedClasses =[]

    this.props.classList.forEach(aClass => {
      switch(aClass.status){
        case "active":
          activeClasses.push(aClass)
          break;
        case "pending":
          pendingClasses.push(aClass)
          break;
        case "archived":
          archivedClasses.push(aClass)
          break;
        default:
      }
    })
    return (
      <div className="edit-grammar-container">
        <Grid container>
            <Grid item xs={12}><h3>Active Classes</h3></Grid>
            { this.renderClasses(activeClasses) }
          </Grid>
          <Divider />
        <Grid container>
        <Grid item xs={12}>
            <h3>Pending Classes</h3>
        </Grid>
            { this.renderClasses(pendingClasses) }
        </Grid>
          <Divider />
        <Grid container>
          <Grid item xs={12}><h3>Archived Classes</h3></Grid>
            { this.renderClasses(archivedClasses) }
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  instructor: state.instructor,
  storyList: state.app.storyList
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
