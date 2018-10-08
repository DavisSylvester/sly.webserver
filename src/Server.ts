// import * as e from "express";
import e from "express";
import path = require("path");
import { IServerConfig } from "./Interfaces/index";
import { settings } from "./configuration/settings";

export class Server {

    private app: e.Application;
    // private router: e.Router;


    constructor(private config: IServerConfig = settings) {
        this.app = e();
        
        // this.router = e.Router();

    }

    public startServer(): void {
        this.configureServer(this.app);


    }

    private configureServer(app: e.Application): void {

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

        this.applyWebServerListener(this.config.Port, this.config.Hostname, app)
    }

    private applyWebServerListener(port: number, host: string, app: e.Application): void {

        app.listen(port, host, () => {
            console.log(`Server has been started at Http://${host}:${port}`);
        }).on('error', (err) => {
            
            port = port + 1;            
            settings.Port = port;
            settings.BrowserSyncPort = settings.BrowserSyncPort + 1;
            this.applyWebServerListener(port, host, app);
        });
    }
}
