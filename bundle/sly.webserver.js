;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Sly.webserver = factory();
  }
}(this, function() {
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define("Interfaces/IServerConfig",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),define("Interfaces/index",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),define("configuration/settings",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.settings={Port:5303,Hostname:"localhost",BrowserSyncPort:7005,LiveReloadPort:35850,RootDirectory:"app",TsDirectory:"app/assets/ts",AssetDirectory:"app/assets",DefaultPage:"index.html"}}),define("Server",["require","exports","express","path","configuration/settings"],function(e,t,r,i,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r=__importDefault(r);var n=function(){function e(e){void 0===e&&(e=o.settings),this.config=e,this.app=r.default()}return e.prototype.startServer=function(){this.configureServer(this.app)},e.prototype.configureServer=function(e){var t=this,o=this.config.AssetDirectory,n=this.config.TsDirectory;e.use(r.default.static("app")),e.use("/node_modules",r.default.static("node_modules")),e.use("/assets",r.default.static(o)),e.use("/ts",r.default.static(n)),e.get("/",function(e,r){var o=i.join(t.config.RootDirectory,t.config.DefaultPage);r.sendFile(o)}),e.get("",function(e,r){var o=i.join(t.config.RootDirectory,t.config.DefaultPage);r.sendFile(o)}),e.get("*",function(e,r){var o=i.join(t.config.RootDirectory,t.config.DefaultPage);r.sendFile(o)}),this.applyWebServerListener(this.config.Port,this.config.Hostname,e)},e.prototype.applyWebServerListener=function(e,t,r){var i=this;r.listen(e,t,function(){console.log("Server has been started at Http://"+t+":"+e)}).on("error",function(n){e+=1,o.settings.Port=e,o.settings.BrowserSyncPort=o.settings.BrowserSyncPort+1,i.applyWebServerListener(e,t,r)})},e}();t.Server=n}),define("index",["require","exports","Server","configuration/settings"],function(e,t,r,i){"use strict";function o(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),o(r),o(i)});
return Sly.webserver;
}));