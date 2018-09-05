import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";

const navBarStyle = {
    float: "right"
}

class Header extends Component {
  render() {
    return (
      <Grid container>
          <Grid item xs={1}/>
          <Grid item xs={10}>
              <div style={navBarStyle}>
                  <Button component={Link} to={"/home"}>Home</Button>
                  <Button component={Link} to={"/about"}>About</Button>
                  <Button component={Link} to={"/signup"}>Signup</Button>
                  <Button component={Link} to={"/login"}>Login</Button>
              </div>
          </Grid>
      </Grid>
    );
  }
}

export default Header;
