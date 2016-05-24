//================================================
// quantumTunnel.Broadcasters
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    //#region init

    //#endregion

    //#region Invoker

    qt.module = function () {
        var broadcasterInfo = {};

        broadcasterInfo.moduleName = qt.config.moduleName;

        return {
            clients: function (clients) { broadcasterInfo.broadcastTo = clients || qt.dataTypes.broadcastingClients.self; return this; },
            module: function (moduleName) { broadcasterInfo.moduleName = moduleName || qt.config.moduleName; return this; }
        };
    };

    //#endregion

    return qt;
}(QT || {}));
