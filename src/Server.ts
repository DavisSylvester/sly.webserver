// import * as e from "express";
import e, { Request, Response, NextFunction, Application } from "express";
import { Router } from "express";
import https = require("https"); // Import Node types
import http = require("http"); // Import Node types
import io, { Socket } from "socket.io";
import path = require("path");
import { IServerConfig } from "./Interfaces/index";
import { settings } from "./configuration/settings";
import { Http2SecureServer, IncomingHttpStatusHeader } from "http2";
import { runInThisContext } from "vm";

export class Server {
  private app: e.Application;
  private http: http.Server | https.Server;
  private socket: io.Server;
  private applicationRootDirectory: string = "";
  protected enableSocketIO = false;

  get App(): e.Application {
    return this.app;
  }

  get Io(): io.Server {
    return this.socket;
  }

  constructor(
    private enableSocketio = false,
    private config: IServerConfig = settings
  ) {
    this.app = e();
    this.http = http.createServer(this.app);
    this.enableSocketIO = enableSocketio;

    if (this.enableSocketIO) {
      this.socket = io(this.http);
    }

    let appRoot =
      this.config && this.config.RootDirectory
        ? this.config.RootDirectory
        : path.join(__dirname, "./../../../app");
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
      let rootDir = path.join(
        this.applicationRootDirectory,
        this.config.DefaultPage
      );
      res.sendFile(rootDir);
    });

    app.get("", (req, res) => {
      let rootDir = path.join(
        this.applicationRootDirectory,
        this.config.DefaultPage
      );

      res.sendFile(rootDir);
    });

    app.get("*", (req, res) => {
      let rootDir = path.join(
        this.applicationRootDirectory,
        this.config.DefaultPage
      );
      res.sendFile(rootDir);
    });

    if (this.enableSocketIO) {
      this.startSocketIOServer();
    } else {
      this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
    }
  }

  private applyWebServerListener(
    port: number,
    host: string,
    app: e.Application
  ): void {
    app
      .listen(port, host, () => {
        console.log(`Server has been started at Http://${host}:${port}`);
        console.log(
          `Application is Serving from: ${this.applicationRootDirectory}`
        );
      })
      .on("error", err => {
        port = port + 1;
        settings.Port = port;
        settings.BrowserSyncPort = settings.BrowserSyncPort + 1;
        this.applyWebServerListener(port, host, app);
      });
  }

  private configureHttporHttps(useHttps: boolean) {
    // if (useHttps) {
    //     this.http = https.createServer({

    //     }, this.app);

    // } else {
    //     this.http = http.createServer(this.app);
    // }

    this.http = http.createServer(this.app);
  }

  private startSocketIOServer(): void {
    this.socket.on("connection", socket => {
      console.log(`connection`);
      console.log("a user is connected");
    });
  }
}
