"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const http = require("http");
const io = __importStar(require("socket.io"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwcy9hc3NldHMvdHMvIiwic291cmNlcyI6WyJTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXdCO0FBQ3hCLHFDQUFpQztBQUVqQyw2QkFBOEI7QUFFOUIsOENBQWdDO0FBQ2hDLDZCQUE4QjtBQUU5Qix1REFBb0Q7QUFHcEQsTUFBYSxNQUFNO0lBa0JmLFlBQW9CLGlCQUFpQixLQUFLLEVBQUUsMkJBQXdDLElBQUksRUFDNUUsU0FBd0IsbUJBQVE7UUFEeEIsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFkcEMsNkJBQXdCLEdBQVcsRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBYzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsaUJBQUMsRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFHckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyx3QkFBd0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztRQUV6RyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO0lBRW5GLENBQUM7SUF2QkQsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFF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