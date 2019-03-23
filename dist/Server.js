"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const http = require('http');
const io = require("socket.io");
const path = require("path");
const settings_1 = require("./configuration/settings");
class Server {
    constructor(enableSocketio = false, config = settings_1.settings) {
        this.enableSocketio = enableSocketio;
        this.config = config;
        this.http = http.Server(this.app);
        this.socket = io(this.http);
        this.applicationRootDirectory = "";
        this.enableSocketIO = false;
        this.app = express_1.default();
        this.enableSocketIO = enableSocketio;
        console.log(`Root Directory: ${__dirname}`);
    }
    get App() {
        return this.app;
    }
    get Io() {
        return this.Io;
    }
    startServer(applicationRootDirectory = null) {
        let appRoot = path.join(__dirname, "./../../../app");
        this.applicationRootDirectory = (applicationRootDirectory === null) ? appRoot : applicationRootDirectory;
        console.log(`this.applicationRootDirectory: ${this.applicationRootDirectory}`);
        this.configureServer(this.app);
    }
    createRouter() {
        let router = express_2.Router();
        return router;
    }
    applyRouter(routes) {
        this.app.use(routes);
    }
    configureServer(app) {
        let assetsDir = this.config.AssetDirectory;
        let TsDir = this.config.TsDirectory;
        app.use(express_1.default.static(this.applicationRootDirectory));
        app.use("/node_modules", express_1.default.static("node_modules"));
        app.use("/assets", express_1.default.static(assetsDir));
        app.use("/ts", express_1.default.static(TsDir));
        app.get("/", (req, res) => {
            let rootDir = path.join(this.applicationRootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get("", (req, res) => {
            let rootDir = path.join(this.applicationRootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get('*', (req, res) => {
            let rootDir = path.join(this.applicationRootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        if (this.enableSocketIO) {
            this.startSocketIOServer(this.config.Port, this.config.Hostname, app);
        }
        else {
            this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
        }
    }
    applyWebServerListener(port, host, app) {
        app.listen(port, host, () => {
            console.log(`Server has been started at Http://${host}:${port}`);
            console.log(`Application is Serving from: ${this.applicationRootDirectory}`);
        }).on('error', (err) => {
            port = port + 1;
            settings_1.settings.Port = port;
            settings_1.settings.BrowserSyncPort = settings_1.settings.BrowserSyncPort + 1;
            this.applyWebServerListener(port, host, app);
        });
    }
    startSocketIOServer(port, host, app) {
        this.socket.on('connection', (socket) => {
            console.log(`connection`);
            console.log('a user is connected');
        });
        this.http.listen(port, host, () => {
            console.log(`Http and Socket.IO Server has been started at Http://${host}:${port}`);
            console.log(`Application is Serving from: ${this.applicationRootDirectory}`);
        }).on('error', (err) => {
            port = port + 1;
            settings_1.settings.Port = port;
            settings_1.settings.BrowserSyncPort = settings_1.settings.BrowserSyncPort + 1;
            this.startSocketIOServer(port, host, app);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwcy9hc3NldHMvdHMvIiwic291cmNlcyI6WyJTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBd0I7QUFDeEIscUNBQWlDO0FBQ2pDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsNkJBQThCO0FBRTlCLHVEQUFvRDtBQUVwRCxNQUFhLE1BQU07SUFrQmYsWUFBb0IsaUJBQWlCLEtBQUssRUFBVSxTQUF3QixtQkFBUTtRQUFoRSxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQTBCO1FBZjVFLFNBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixXQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2Qiw2QkFBd0IsR0FBVyxFQUFFLENBQUM7UUFDdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFhM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBQyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRWhELENBQUM7SUFmRCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUVGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBVU0sV0FBVyxDQUFDLDJCQUEwQyxJQUFJO1FBRTdELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFD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