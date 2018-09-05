import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";


// import Index from "./components/Index";
// import Home from "./components/Home";
// import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import * as Routes from "./Routes";

const App = () => (
      <div>
          <CssBaseline/>
        <Helmet>
          <title>Interline Reader</title>
          <meta property="og:title" content="MERN Boilerplate" />
        </Helmet>
        <Header />
        <Route
          path="/"
          component={({ match }) => (
            <div>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                      <Switch>
                        <Route exact path="/" component={Routes.Index} />
                        <Route exact path="/home" component={Routes.Home} />
                          <Route exact path="/about" component={Routes.About} />
                          <Route exact path="/signup" component={Routes.Signup} />
                          <Route exact path="/login" component={Routes.Login} />

                        <Route component={Routes.PageNotFound} />
                      </Switch>
                    </Grid>
                </Grid>
            </div>
          )}
        />
      </div>
);

export default App;
