import e from "express";
import { Router } from "express";
import * as io from "socket.io";
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
    readonly Io: io.SocketIO.Server;
    constructor(enableSocketio?: boolean, applicationRootDirectory?: string | null, config?: IServerConfig);
    startServer(): void;
    createRouter(): Router;
    applyRouter(routes: Router): void;
    private configureServer;
    private applyWebServerListener;
    private startSocketIOServer;
}
//# sourceMappingURL=Server.d.ts.map