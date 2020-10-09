import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import  {fetchLogo} from "../../actions/about";
import "./style/about.css";
import About from './components/About';
import NewAbout from './components/NewAbout';


class AboutContainer extends Component {

    state = {
        applicationDescription: ""
    }

    componentWillMount(){
      this.props.fetchLogo();
    }

    render() {
        const {logo} = this.props.about;
        return (
            <div>
                <NewAbout/>
                <br/>
                {/*
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10} >
                        <About logo={logo}/>
                    </Grid>
                </Grid>
                */}
            </div>

        );
    }
}

const mapStateToProps = state => (
  {about: state.about}
)

const mapDispatchToProps = ({
  fetchLogo
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);