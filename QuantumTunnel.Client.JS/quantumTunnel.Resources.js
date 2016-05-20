//================================================
// quantumTunnel.Resources
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    qt.resources = {
        name: "Quantum Tunnel",
        shortName: "QT",
        nojQuery: "JQuery was not found. Please ensure jQuery is referenced before the quantumTunnel.Core.js file.",
        noSignalR: "SignalR was not found. Please ensure signalR is referenced before the quantumTunnel.signalR.js file.",
        moduleInitialized: "Module initialized successfully : quantumTunnel.modules.",
        settingAttrConfig: "Setting attribute configurations : ",
        invalidSyntax: "Invalid syntax when calling ",
        invalidParams: "Invalid parameters when calling ",
        unexposable: "Cann't expose unnamed functions",
        exposed: "Function exposed successfully : ",
        unExposed: "Function unExposed successfully : "
    };

    return qt;
}(QT || {}));
