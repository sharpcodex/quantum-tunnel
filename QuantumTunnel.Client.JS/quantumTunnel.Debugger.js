//================================================
// quantumTunnel.Debugger
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    qt.debugger = {};

    qt.debugger.setLogLevel = function (logError, logInternal, logConnection, logBroadcasting, logListening) {
        qt.config.logErrors = logError || true;
        qt.config.logInternalEvents = logInternal || true;
        qt.config.logConnectionEvents = logConnection || true;
        qt.config.logBroadcastingEvents = logBroadcasting || true;
        qt.config.logListeningEvents = logListening || true;
    };

    return qt;
}(QT || {}));
