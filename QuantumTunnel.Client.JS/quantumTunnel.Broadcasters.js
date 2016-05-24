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
            withParams: function () { broadcasterInfo.params = arguments; return this; },
            clients: function (clients) { broadcasterInfo.broadcastTo = clients || qt.dataTypes.broadcastingClients.self; return this; },
            module: function (moduleName) { broadcasterInfo.moduleName = moduleName || qt.config.moduleName; return this; },
            done: function (callBack) { return this; },
            failed: function (callBack) { return this; }
        };
    };

    //#endregion

    return qt;
}(QT || {}));
