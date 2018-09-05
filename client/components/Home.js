import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGists } from "../actions";
import GistList from "./GistList";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme();


class Home extends Component {
  componentWillMount() {
    this.props.fetchGists();
  }
  render() {
    const { gists } = this.props;
    return (
        <MuiThemeProvider theme={theme}>
          <div>
            <h1>Mern Boilerplate Home</h1>
            {gists.length > 0 && <GistList gists={gists.slice(0, 10)} />}
          </div>
        </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
    fetchGists: PropTypes.func.isRequired,
    gists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
};

Home.defaultProps = {
    gists: [],
};

function mapStateToProps(state) {
  return {
    gists: state.gists
  };
}

export default connect(mapStateToProps, { fetchGists })(Home);
