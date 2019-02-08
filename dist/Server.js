"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_2 = require("express");
var path = require("path");
var settings_1 = require("./configuration/settings");
var Server = (function () {
    function Server(config) {
        if (config === void 0) { config = settings_1.settings; }
        this.config = config;
        this.applicationRootDirectory = "";
        this.app = express_1.default();
    }
    Server.prototype.startServer = function (applicationRootDirectory) {
        if (applicationRootDirectory === void 0) { applicationRootDirectory = "app"; }
        this.applicationRootDirectory = applicationRootDirectory;
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
        var appRoot = path.join(__dirname, "./../../../");
        app.use(express_1.default.static("app"));
        app.use("/node_modules", express_1.default.static("node_modules"));
        app.use("/assets", express_1.default.static(assetsDir));
        app.use("/ts", express_1.default.static(TsDir));
        app.get("/", function (req, res) {
            var rootDir = path.join(appRoot, _this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get("", function (req, res) {
            var rootDir = path.join(appRoot, _this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get('*', function (req, res) {
            var rootDir = path.join(appRoot, _this.applicationRootDirectory, _this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
    };
    Server.prototype.applyWebServerListener = function (port, host, app) {
        var _this = this;
        app.listen(port, host, function () {
            console.log("Server has been started at Http://" + host + ":" + port);
            console.log("Application is Serving from: " + path.join(__dirname, "./../../../", _this.applicationRootDirectory));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwcy9hc3NldHMvdHMvIiwic291cmNlcyI6WyJTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvREFBd0I7QUFDeEIsbUNBQWlDO0FBQ2pDLDJCQUE4QjtBQUU5QixxREFBb0Q7QUFFcEQ7SUFLSSxnQkFBb0IsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxTQUF3QixtQkFBUTtRQUFoQyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUY1Qyw2QkFBd0IsR0FBVyxFQUFFLENBQUM7UUFHMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBQyxFQUFFLENBQUM7SUFHbkIsQ0FBQztJQUVNLDRCQUFXLEdBQWxCLFVBQW1CLHdCQUFnQztRQUFoQyx5Q0FBQSxFQUFBLGdDQUFnQztRQUMvQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7UUFFekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFHbkMsQ0FBQztJQUVNLDZCQUFZLEdBQW5CO1FBRUksSUFBSSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO1FBQ3RCLE9BQU8sTUFBTSxDQUFDO0lBRWxCLENBQUM7SUFFTSw0QkFBVyxHQUFsQixVQUFtQixNQUFjO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyxnQ0FBZSxHQUF2QixVQUF3QixHQUFrQjtRQUExQyxpQkFnQ0M7UUE5QkcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDM0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFB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