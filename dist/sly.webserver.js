var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("Interfaces/IServerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Interfaces/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("configuration/settings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.settings = {
        Port: 5303,
        Hostname: "localhost",
        BrowserSyncPort: 7005,
        LiveReloadPort: 35850,
        RootDirectory: "app",
        TsDirectory: "app/assets/ts",
        AssetDirectory: "app/assets",
        DefaultPage: "index.html"
    };
});
define("Server", ["require", "exports", "express", "path", "configuration/settings"], function (require, exports, express_1, path, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_1 = __importDefault(express_1);
    var Server = (function () {
        function Server(config) {
            if (config === void 0) { config = settings_1.settings; }
            this.config = config;
            this.app = express_1.default();
        }
        Server.prototype.startServer = function () {
            this.configureServer(this.app);
        };
        Server.prototype.configureServer = function (app) {
            var _this = this;
            var assetsDir = this.config.AssetDirectory;
            var TsDir = this.config.TsDirectory;
            app.use(express_1.default.static("app"));
            app.use("/node_modules", express_1.default.static("node_modules"));
            app.use("/assets", express_1.default.static(assetsDir));
            app.use("/ts", express_1.default.static(TsDir));
            app.get("/", function (req, res) {
                var rootDir = path.join(_this.config.RootDirectory, _this.config.DefaultPage);
                res.sendFile(rootDir);
            });
            app.get("", function (req, res) {
                var rootDir = path.join(_this.config.RootDirectory, _this.config.DefaultPage);
                res.sendFile(rootDir);
            });
            app.get('*', function (req, res) {
                var rootDir = path.join(_this.config.RootDirectory, _this.config.DefaultPage);
                res.sendFile(rootDir);
            });
            this.applyWebServerListener(this.config.Port, this.config.Hostname, app);
        };
        Server.prototype.applyWebServerListener = function (port, host, app) {
            var _this = this;
            app.listen(port, host, function () {
                console.log("Server has been started at Http://" + host + ":" + port);
            }).on('error', function (err) {
                port = port + 1;
                settings_1.settings.Port = port;
                settings_1.settings.BrowserSyncPort = settings_1.settings.BrowserSyncPort + 1;
                _this.applyWebServerListener(port, host, app);
            });
        };
        return Server;
    }());
    exports.Server = Server;
});
define("index", ["require", "exports", "Server", "configuration/settings"], function (require, exports, Server_1, settings_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Server_1);
    __export(settings_2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2x5LndlYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIuL2FwcHMvYXNzZXRzL3RzLyIsInNvdXJjZXMiOlsiSW50ZXJmYWNlcy9JU2VydmVyQ29uZmlnLnRzIiwiSW50ZXJmYWNlcy9pbmRleC50cyIsImNvbmZpZ3VyYXRpb24vc2V0dGluZ3MudHMiLCJTZXJ2ZXIudHMiLCJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJRUVhLFFBQUEsUUFBUSxHQUFtQjtRQUVwQyxJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLGNBQWMsRUFBRSxLQUFLO1FBRXJCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFdBQVcsRUFBRSxlQUFlO1FBQzVCLGNBQWMsRUFBRSxZQUFZO1FBRTVCLFdBQVcsRUFBRSxZQUFZO0tBQzVCLENBQUM7Ozs7OztJQ1JGO1FBTUksZ0JBQW9CLE1BQWdDO1lBQWhDLHVCQUFBLEVBQUEsU0FBd0IsbUJBQVE7WUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7WUFDaEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBQyxFQUFFLENBQUM7UUFJbkIsQ0FBQztRQUVNLDRCQUFXLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHbkMsQ0FBQztRQUVPLGdDQUFlLEdBQXZCLFVBQXdCLEdBQWtCO1lBQTFDLGlCQXFDQztZQWhDRyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUdwQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsaUJBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxpQkFBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGlCQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFFbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUU1RSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBR0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFJakIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUU1RSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM1RSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzVFLENBQUM7UUFFTyx1Q0FBc0IsR0FBOUIsVUFBK0IsSUFBWSxFQUFFLElBQVksRUFBRSxHQUFrQjtZQUE3RSxpQkFXQztZQVRHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBcUMsSUFBSSxTQUFJLElBQU0sQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUVmLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixtQkFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLG1CQUFRLENBQUMsZUFBZSxHQUFHLG1CQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFDeEQsS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsYUFBQztJQUFELENBQUMsQUF0RUQsSUFzRUM7SUF0RVksd0JBQU07Ozs7Ozs7O0lDTm5CLG1CQUF5QjtJQUN6QixxQkFBeUMifQ==