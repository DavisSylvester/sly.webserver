"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const path = require("path");
const settings_1 = require("./configuration/settings");
class Server {
    // private router: e.Router;
    constructor(config = settings_1.settings) {
        this.config = config;
        this.app = e();
        // this.router = e.Router();
    }
    startServer() {
        this.configureServer(this.app);
    }
    configureServer(app) {
        // console.log(`Env: ${process.env}`);
        // console.log(__dirname);
        let assetsDir = this.config.AssetDirectory;
        let TsDir = this.config.TsDirectory;
        app.use(e.static("app"));
        app.use("/node_modules", e.static("node_modules"));
        app.use("/assets", e.static(assetsDir));
        app.use("/ts", e.static(TsDir));
        app.get("/", (req, res) => {
            // console.log(`DIR: ${__dirname}`);
            let rootDir = path.join(this.config.RootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        // console.log(`DIR: ${__dirname + "./../../app/index.html"}`);
        app.get("", (req, res) => {
            // console.log(`DIR: ${__dirname}`);
            // console.log(__dirname + "../../../app/index.html");
            let rootDir = path.join(this.config.RootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        app.get('*', (req, res) => {
            let rootDir = path.join(this.config.RootDirectory, this.config.DefaultPage);
            res.sendFile(rootDir);
        });
        this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
    }
    applyWebServerListener(port, host, app) {
        app.listen(port, host, () => {
            console.log(`Server has been started at Http://${host}:${port}`);
        }).on('error', (err) => {
            port = port + 1;
            settings_1.settings.Port = port;
            settings_1.settings.BrowserSyncPort = settings_1.settings.BrowserSyncPort + 1;
            this.applyWebServerListener(port, host, app);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map