//================================================
// quantumTunnel.Config
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    qt.config = {
        //log
        logErrors: true,
        logConnectionEvents: true,
        logInternalEvents: true,
        logBroadcastingEvents: true,
        logListeningEvents: true,

        //backend
        tunnelPath: "/qt",

        init: true
    };

    return qt;
}(QT || {}));
