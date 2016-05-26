//================================================
// quantumTunnel.Broadcasters
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function(qt) {
    "use strict";

    //#region init

    //#endregion

    //#region Invoker

    qt.createTunnel = function() {
        var broadcasterInfo = {};
        broadcasterInfo.guid = qt.getNewGuid();
        broadcasterInfo.moduleName = qt.config.moduleName;

        return {
            toClients: function(clients) {
                broadcasterInfo.broadcastTo = clients || qt.dataTypes.broadcastingClients.self;
                return this;
            },
            toModule: function(moduleName) {
                broadcasterInfo.moduleName = moduleName || qt.config.moduleName;
                return this;
            },
            withParams: function() {
                broadcasterInfo.params = arguments;
                return this;
            },
            callback: function(callBack) { return this; },
            invoke: function() { return this; }
        };
    };

    //#endregion

    return qt;
}(QT || {}));
