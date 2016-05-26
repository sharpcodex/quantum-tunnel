//================================================
// quantumTunnel.Broadcasters
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function(qt) {
    "use strict";

    //#region Invoker

    qt.createTunnel = function (moduleName, clients) {
        var broadcasterInfo = {};
        broadcasterInfo.guid = qt.getNewGuid();
        broadcasterInfo.moduleName = moduleName || qt.config.moduleName;
        broadcasterInfo.broadcastTo = clients || qt.config.defaultBroadcastingClient;
        broadcasterInfo.params = [];

        return {
            getTunnelInfo: function() {
                return broadcasterInfo;
            },
            toClients: function (newClients) {
                broadcasterInfo.broadcastTo = newClients || qt.config.defaultBroadcastingClient;
                return this;
            },
            toModule: function(newModuleName) {
                broadcasterInfo.moduleName = newModuleName || broadcasterInfo.moduleName;
                return this;
            },
            withParams: function() {
                broadcasterInfo.params = arguments;
                return this;
            },
            callback: function(callBack) {
                 return this;
            },
            invoke: function() {
                 return this;
            }
        };
    };

    //#endregion

    return qt;
}(QT || {}));
