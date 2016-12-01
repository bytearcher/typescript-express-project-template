import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import * as core from "express-serve-static-core";

const debug = require("debug")("typescript-express-project-template:app");

const app: core.Express = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (app.get("env") === "development") {
    debug("Enabling Live Reload...");

    // add livereload script tag to all html
    app.use(require("connect-livereload")());

    // ask all existing listeners to reload
    let r = require("http").request({
        hostname: "localhost",
        port: 35729,
        path: "/changed?files=index.html"
    });
    r.on("error", (e: any) => console.error(e));
    r.end();
}

app.use("/", require("./routes/default"));

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let err = new Error("Not Found");
    (<any>err).status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        console.error(err);
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

export = app;
