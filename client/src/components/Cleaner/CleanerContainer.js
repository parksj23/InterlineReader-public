import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import  {fetchLogo} from "../../actions/cleaner";
import "./style/cleaner.css";
import Cleaner from './components/Cleaner';


class CleanerContainer extends Component {

    state = {
        applicationDescription: ""
    }

    componentWillMount(){
      this.props.fetchLogo();
    }

    render() {
        const {logo} = this.props.about;
        return (
            <Grid container>
                <Grid item xs={1} />
                <Grid item xs={10} >
                    <Cleaner logo={logo}/>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => (
  {about: state.about}
)

const mapDispatchToProps = ({
  fetchLogo
})

export default connect(mapStateToProps, mapDispatchToProps)(CleanerContainer);