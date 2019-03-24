"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const http = require("http");
const io = require("socket.io");
const path = require("path");
const settings_1 = require("./configuration/settings");
class Server {
    constructor(enableSocketio = false, applicationRootDirectory = null, config = settings_1.settings) {
        this.enableSocketio = enableSocketio;
        this.config = config;
        this.applicationRootDirectory = "";
        this.enableSocketIO = false;
        this.app = express_1.default();
        this.http = http.createServer(this.app);
        this.socket = io(this.http);
        this.enableSocketIO = enableSocketio;
        let appRoot = path.join(__dirname, "./../../../app");
        this.applicationRootDirectory = (applicationRootDirectory === null) ? appRoot : applicationRootDirectory;
        console.log(`this.applicationRootDirectory: ${this.applicationRootDirectory}`);
    }
    get App() {
        return this.app;
    }
    get Io() {
        return this.Io;
    }
    startServer() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwcy9hc3NldHMvdHMvIiwic291cmNlcyI6WyJTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBd0I7QUFDeEIscUNBQWlDO0FBRWpDLDZCQUE4QjtBQUU5QixnQ0FBaUM7QUFDakMsNkJBQThCO0FBRTlCLHVEQUFvRDtBQUdwRCxNQUFhLE1BQU07SUFrQmYsWUFBb0IsaUJBQWlCLEtBQUssRUFBRSwyQkFBd0MsSUFBSSxFQUM1RSxTQUF3QixtQkFBUTtRQUR4QixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQWRwQyw2QkFBd0IsR0FBVyxFQUFFLENBQUM7UUFDcEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFjN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBQyxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUdyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLHdCQUF3QixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1FBRXpHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7SUFFbkYsQ0FBQztJQXZCRCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUks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