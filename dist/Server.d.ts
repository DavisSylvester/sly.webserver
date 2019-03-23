/// <reference types="socket.io" />
import e from "express";
import { Router } from "express";
import { IServerConfig } from "./Interfaces/index";
export declare class Server {
    private enableSocketio;
    private config;
    private app;
    private http;
    private socket;
    private applicationRootDirectory;
    private enableSocketIO;
    readonly App: e.Application;
    readonly Io: SocketIO.Server;
    constructor(enableSocketio?: boolean, config?: IServerConfig);
    startServer(applicationRootDirectory?: string | null): void;
    createRouter(): Router;
    applyRouter(routes: Router): void;
    private configureServer;
    private applyWebServerListener;
    private startSocketIOServer;
}
//# sourceMappingURL=Server.d.ts.map