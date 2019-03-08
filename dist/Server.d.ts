import e from "express";
import { Router } from "express";
import { IServerConfig } from "./Interfaces/index";
export declare class Server {
    private config;
    private app;
    private applicationRootDirectory;
    readonly App: e.Application;
    constructor(config?: IServerConfig);
    startServer(applicationRootDirectory?: string | null): void;
    createRouter(): Router;
    applyRouter(routes: Router): void;
    private configureServer;
    private applyWebServerListener;
}
//# sourceMappingURL=Server.d.ts.map