declare module "Interfaces/IServerConfig" {
    export interface IServerConfig {
        Port: number;
        Hostname: string;
        BrowserSyncPort: number;
        LiveReloadPort: number;
        RootDirectory: string;
        AssetDirectory: string;
        TsDirectory: string;
        DefaultPage: string;
    }
}
declare module "Interfaces/index" {
    export * from "Interfaces/IServerConfig";
}
declare module "configuration/settings" {
    import { IServerConfig } from "Interfaces/index";
    export const settings: IServerConfig;
}
declare module "Server" {
    import { IServerConfig } from "Interfaces/index";
    export class Server {
        private config;
        private app;
        constructor(config?: IServerConfig);
        startServer(): void;
        private configureServer;
        private applyWebServerListener;
    }
}
declare module "index" {
    export * from "Server";
    export * from "configuration/settings";
}
//# sourceMappingURL=sly.webserver.d.ts.map