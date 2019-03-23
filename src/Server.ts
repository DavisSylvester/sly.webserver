// import * as e from "express";
import e from "express";
import { Router } from "express";
// const http = require('http'); // Import Node types
import http = require('http'); // Import Node types
const io = require("socket.io");
import path = require("path");
import { IServerConfig } from "./Interfaces/index";
import { settings } from "./configuration/settings";
import { Http2SecureServer } from "http2";

export class Server {

    private app: e.Application;
    private http: http.Server;
    private socket: SocketIO.Server;
    private applicationRootDirectory: string = "";
    protected enableSocketIO = false;


    get App(): e.Application {
        return this.app;
    }

    get Io(): SocketIO.Server {

        return this.Io;
    } 

    constructor(private enableSocketio = false, applicationRootDirectory: string|null = null,
        private config: IServerConfig = settings) {
        this.app = e();
        // this.http = http.Server(this.app);
        this.http = http.createServer(this.app);
        this.socket = io(this.http);
        this.enableSocketIO = enableSocketio;

        
        let appRoot = path.join(__dirname, "./../../../app");
        this.applicationRootDirectory = (applicationRootDirectory === null) ? appRoot : applicationRootDirectory;

        console.log(`this.applicationRootDirectory: ${this.applicationRootDirectory}`);
        
    }

    public startServer(): void {       
        
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

        if (this.enableSocketIO) {
            this.startSocketIOServer(this.config.Port, this.config.Hostname, app);
        }
        else {
            this.applyWebServerListener(this.config.Port, this.config.Hostname, app)
        }
    }

    private applyWebServerListener(port: number, host: string, app: e.Application): void {

        app.listen(port, host, () => {
            console.log(`Server has been started at Http://${host}:${port}`);
            console.log(`Application is Serving from: ${this.applicationRootDirectory}`);
        }).on('error', (err) => {

            port = port + 1;
            settings.Port = port;
            settings.BrowserSyncPort = settings.BrowserSyncPort + 1;
            this.applyWebServerListener(port, host, app);
        });
    }

    private startSocketIOServer(port: number, host: string, app: e.Application): void {

        this.socket.on('connection', (socket) =>{
            console.log(`connection`);
            console.log('a user is connected');
           });

           
        
           this.http.listen(port, host, () => {
            console.log(`Http and Socket.IO Server has been started at Http://${host}:${port}`);
            console.log(`Application is Serving from: ${this.applicationRootDirectory}`);
        }).on('error', (err) => {

            port = port + 1;
            settings.Port = port;
            settings.BrowserSyncPort = settings.BrowserSyncPort + 1;
            this.startSocketIOServer(port, host, app);
        });
    }
}
