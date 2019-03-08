"use strict";
exports.__esModule = true;
// import * as e from "express";
var express_1 = require("express");
var express_2 = require("express");
var path = require("path");
var settings_1 = require("./configuration/settings");
var Server = /** @class */ (function () {
    function Server(config) {
        if (config === void 0) { config = settings_1.settings; }
        this.config = config;
        this.applicationRootDirectory = "";
        this.app = express_1["default"]();
        console.log("Root Directory: " + __dirname);
    }
    Object.defineProperty(Server.prototype, "App", {
        get: function () {
            return this.app;
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.startServer = function (applicationRootDirectory) {
        if (applicationRootDirectory === void 0) { applicationRootDirectory = null; }
        var appRoot = path.join(__dirname, "./../../../app");
        this.applicationRootDirectory = (applicationRootDirectory === null) ? appRoot : applicationRootDirectory;
        console.log("this.applicationRootDirectory: " + this.applicationRootDirectory);
        this.configureServer(this.app);
    };
    Server.prototype.createRouter = function () {
        var router = express_2.Router();
        return router;
    };
    Server.prototype.applyRouter = function (routes) {
        this.app.use(routes);
    };
    Server.prototype.configureServer = function (app) {
        var _this = this;
        var assetsDir = this.config.AssetDirectory;
        var TsDir = this.config.TsDirectory;
        app.use(express_1["default"].static(this.applicationRootDirectory));
        app.use("/node_modules", express_1["default"].static("node_modules"));
        app.use("/assets", express_1["default"].static(assetsDir));
        app.use("/ts", express_1["default"].static(TsDir));
        app.get("/", function (req, res) {
            var rootDir = path.join(_this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get("", function (req, res) {
            var rootDir = path.join(_this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get('*', function (req, res) {
            var rootDir = path.join(_this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
    };
    Server.prototype.applyWebServerListener = function (port, host, app) {
        var _this = this;
        app.listen(port, host, function () {
            console.log("Server has been started at Http://" + host + ":" + port);
            console.log("Application is Serving from: " + _this.applicationRootDirectory);
        }).on('error', function (err) {
            port = port + 1;
            settings_1.settings.Port = port;
            settings_1.settings.BrowserSyncPort = settings_1.settings.BrowserSyncPort + 1;
            _this.applyWebServerListener(port, host, app);
        });
    };
    return Server;
}());
exports.Server = Server;
