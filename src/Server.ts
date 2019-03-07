// import * as e from "express";
import e from "express";
import { Router } from "express";
import path = require("path");
import { IServerConfig } from "./Interfaces/index";
import { settings } from "./configuration/settings";

export class Server {

    private app: e.Application;
    private applicationRootDirectory: string = "";       

    get App(): e.Application {
        return this.app;
    }

    constructor(private config: IServerConfig = settings) {
        this.app = e();
        
        console.log(`Root Directory: ${__dirname}`);

    }

    public startServer(applicationRootDirectory: string|null = null): void {

        let appRoot = path.join(__dirname, "./../../../app");
        this.applicationRootDirectory = (applicationRootDirectory === null) ? appRoot : applicationRootDirectory;

        this.configureServer(this.app);


    }

    public createRouter(): Router {

        let router = Router();
        return router;

    }

    public applyRouter(routes: Router) {
        this.app.use(routes);
    }

    private configureServer(app: e.Application): void {
        
        let assetsDir = this.config.AssetDirectory;
        let TsDir = this.config.TsDirectory;
        
        
        app.use(e.static(this.applicationRootDirectory));
        app.use("/node_modules", e.static("node_modules"));
        app.use("/assets", e.static(assetsDir));
        app.use("/ts", e.static(TsDir));


        
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

        this.applyWebServerListener(this.config.Port, this.config.Hostname, app)
    }

    private applyWebServerListener(port: number, host: string, app: e.Application): void {

        app.listen(port, host, () => {
            console.log(`Server has been started at Http://${host}:${port}`);
            console.log(`Application is Serving from: ${ this.applicationRootDirectory}`);
        }).on('error', (err) => {
            
            port = port + 1;            
            settings.Port = port;
            settings.BrowserSyncPort = settings.BrowserSyncPort + 1;
            this.applyWebServerListener(port, host, app);
        });
    }
}
