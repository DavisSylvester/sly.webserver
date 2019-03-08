"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const path = require("path");
const settings_1 = require("./configuration/settings");
class Server {
    constructor(config = settings_1.settings) {
        this.config = config;
        this.applicationRootDirectory = "";
        this.app = express_1.default();
        console.log(`Root Directory: ${__dirname}`);
    }
    get App() {
        return this.app;
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
        this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
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
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwcy9hc3NldHMvdHMvIiwic291cmNlcyI6WyJTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBd0I7QUFDeEIscUNBQWlDO0FBQ2pDLDZCQUE4QjtBQUU5Qix1REFBb0Q7QUFFcEQsTUFBYSxNQUFNO0lBU2YsWUFBb0IsU0FBd0IsbUJBQVE7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFONUMsNkJBQXdCLEdBQVcsRUFBRSxDQUFDO1FBTzFDLElBQUksQ0FBQyxHQUFHLEdBQUcsaUJBQUMsRUFBRSxDQUFDO1FBRWYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUVoRCxDQUFDO0lBVEQsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFTTSxXQUFXLENBQUMsMkJBQXdDLElBQUk7UUFFM0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyx3QkFBd0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztRQUV6RyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBR25DLENBQUM7SUFFTSxZQUFZO1FBRWYsSUFBSSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO1FBQ3RCLE9BQU8sTUFBTSxDQUFDO0lBRWxCLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBYztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6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