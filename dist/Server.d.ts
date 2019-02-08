import { Router } from "express";
import { IServerConfig } from "./Interfaces/index";
export declare class Server {
    private config;
    private app;
    private applicationRootDirectory;
    constructor(config?: IServerConfig);
    startServer(applicationRootDirectory?: string): void;
    createRouter(): Router;
    applyRouter(routes: Router): void;
    private configureServer;
    private applyWebServerListener;
}
//# sourceMappingURL=Server.d.ts.map