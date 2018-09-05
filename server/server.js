import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import session from  "express-session";
const passport = require("passport");
const flash = require("connect-flash");


// Webpack Requirements
import webpack from "webpack";
import config from "../webpack.config.dev.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Initialize the Express app
const app = new express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      colors: true,
      publicPath: config.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" }
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// React and Redux setup
import { configureStore } from "../client/store";
import { Provider } from "react-redux";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { getLoadableState } from "loadable-components/server";
import { Helmet } from "react-helmet";
import sagas from "../client/sagas";
import Context from "react-context-component";
import AppContainer from "../client/AppContainer";

// Import required modules
import { fetchComponentData } from "./utils/fetchData";
import serverConfig from "./config";

// MongoDB connection
mongoose.connect(serverConfig.mongoURI);
require("./passport.js")(passport);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(function(req,res,next){
    var auth;

    //checkwhetheranautorizationheaderwassend
    if(req.headers.authorization){
        //onlyacceptingbasicauth,so:
        //*cutthestarting"Basic"fromtheheader
        //*decodethebase64encodedusername:password
        //*splitthestringatthecolon
        //->shouldresultinanarray
        auth = new Buffer(req.headers.authorization.substring(6),"base64").toString().split(":");
    }

    //checksif:
    //*autharrayexists
    //*firstvaluematchestheexpecteduser
    //*secondvaluetheexpectedpassword
    //if(!auth||auth[0]!==process.env.ID||auth[1]!==process.env.PASS){
    if(!auth||auth[0]!=="mok"||auth[1]!=="sori"){
        //anyofthetestsfailed
        //sendanBasicAuthrequest(HTTPCode:401Unauthorized)
        res.statusCode=401;
        //MyRealmNamecanbechangedtoanything,willbepromptedtotheuser
        res.setHeader("WWW-Authenticate","Basic realm='MyRealmName'");
        //thiswilldisplayedinthebrowserwhenauthorizationiscancelled
        res.end("Unauthorized");
    }else{
        //continuewithprocessing,userwasauthenticated
        next();
    }
});
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

console.log(path.join(__dirname, "public"))
app.use(express.static(path.join(__dirname, "public")));

// Required for passport

app.use(session({
    secret: "ilovescotchscotchyscotchscotch"
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req, res, next) { //MAKE SURE THIS GOES AFTER INITIALIZE + SESSION
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));



// Render Initial HTML
const renderFullPage = (html, initialState, loadableState) => {
  // Import Manifests
  const assetsManifest =
    process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest =
    process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);
  const helmet = Helmet.renderStatic();
  return `
    <!DOCTYPE HTML>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${process.env.NODE_ENV === "production"
          ? `<link rel="stylesheet" href="${assetsManifest["/app.css"]}" />`
          : ""}
        <script src="https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === "production"
            ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>`
            : ""}
        </script>
        ${loadableState.getScriptTag()}
        <script src='${process.env.NODE_ENV === "production"
          ? assetsManifest["/vendor.js"]
          : "/vendor.js"}'></script>
        <script src='${process.env.NODE_ENV === "production"
          ? assetsManifest["/app.js"]
          : "/app.js"}'></script>
      </body>
    </html>
  `;
};

// Server side Rendering based on routes matched by react-router
app.get("*", async (req, res, next) => {
  const store = configureStore();
  const context = {};
  let loadableState = {};
  const appWithRouter = (
        <Provider store={store}>
          <StaticRouter context={{}} location={req.url}>
            <AppContainer />
          </StaticRouter>
        </Provider>
  );
  if (context.url) {
    return res.redirect(context.url);
  }

  store.runSaga(sagas).done.then(() => {
    const initialView = renderToString(appWithRouter);
    const finalState = store.getState();
    res
      .set("Content-Type", "text/html")
      .status(200)
      .end(renderFullPage(initialView, finalState, loadableState));
  });

  loadableState = await getLoadableState(appWithRouter);

  store.close();
});

app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
