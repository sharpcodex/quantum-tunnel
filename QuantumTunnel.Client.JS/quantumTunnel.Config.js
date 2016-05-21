//================================================
// quantumTunnel.Config
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    //#region Default configurations

    qt.config = {
        //log
        logErrors: true,
        logConnectionEvents: true,
        logLowLevelConnectionEvents: true,
        logInternalEvents: true,
        logBroadcastingEvents: true,
        logListeningEvents: true,

        //Init
        autoStart: true,
        init: true
    };

    //#endregion 

    return qt;
}(QT || {}));

(function (qt) {
    "use strict";

    //#region attribute configurations Reader

    var qTag = $("script[quantum-tunnel]");
    if (qTag && qt.config) qt.configReader(qt.config, qTag);

    //#endregion 

}(QT));