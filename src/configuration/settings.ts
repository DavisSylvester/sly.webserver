import { IServerConfig } from "../Interfaces/index";

export const settings: IServerConfig  = {

    Port: 5303,
    Hostname: "localhost", 
    BrowserSyncPort: 7005,
    LiveReloadPort: 35850,

    RootDirectory: "app",
    TsDirectory: "app/assets/ts",
    AssetDirectory: "app/assets",

    useHttps: false,

    DefaultPage: "index.html"
};

