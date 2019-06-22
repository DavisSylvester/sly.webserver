import e from "express";
import { Router } from "express";
import io from "socket.io";
import { IServerConfig } from "./Interfaces/index";
export declare class Server {
    private enableSocketio;
    private config;
    private app;
    private http;
    private socket;
    private applicationRootDirectory;
    protected enableSocketIO: boolean;
    readonly App: e.Application;
    readonly Io: io.Server;
    constructor(enableSocketio?: boolean, config?: IServerConfig);
    startServer(): void;
    createRouter(): Router;
    applyRouter(routes: Router): void;
    private configureServer;
    private applyWebServerListener;
    private configureHttporHttps;
    private startSocketIOServer;
}
//# sourceMappingURL=Server.d.ts.map