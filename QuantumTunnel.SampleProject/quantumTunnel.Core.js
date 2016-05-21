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

//================================================
// quantumTunnel.Dependencies
// sharpcodex , sharpcodex@gmail.com
//================================================

function QuantomError(message) {
    this.message = message;
    this.name = "Quantum tunnel";
}

if (typeof ($) !== "function") {
    throw new QuantomError(QT.resources.nojQuery);
}

//================================================
// quantumTunnel.Helpers
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function(qt) {
    "use strict";

    //#region private helpers

    function printMessage(isInfo, msg, data) {
        msg = qt.resources.name + " : " + msg;
        if (typeof (window.console) === "undefined") return;

        if (window.console.debug && isInfo) {
            if (data) {
                window.console.debug(msg, data);
            } else {
                window.console.debug(msg);
            }
        } else if (window.console.error && !isInfo) {
            if (data) {
                window.console.error(msg, data);
            } else {
                window.console.error(msg);
            }
        } else if (window.console.log) {
            if (data) {
                window.console.log(msg, data);
            } else {
                window.console.log(msg);
            }
        }
    };

    function getCamelCase(str) {
        return str.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
    }

    function parseAttribute(value) {
        if (!value) return null;
        if (value === "true" || value === "false") return /^true$/i.test(value);
        if (!isNaN(value)) return parseFloat(value);
        return value;
    }

    //#endregion

    //#region public log helpers

    qt.logConnection = function(msg, data) {
        if (qt.config.logConnectionEvents) printMessage(true, msg, data);
    };

    qt.logInternal = function(msg, data) {
        if (qt.config.logInternalEvents) printMessage(true, msg, data);
    };

    qt.logBroadcasting = function(msg, data) {
        if (qt.config.logBroadcastingEvents) printMessage(true, msg, data);
    };

    qt.logListening = function(msg, data) {
        if (qt.config.logListeningEvents) printMessage(true, msg, data);
    };

    qt.logError = function(err, data) {
        if (qt.config.logErrors) printMessage(false, err, data);
    };

    //#endregion

    //#region public helpers

    qt.configReader = function (configObject, htmlTag) {
        htmlTag = $(htmlTag);
        $.each(htmlTag.get(0).attributes, function (i, attrib) {
            try {
                var key = getCamelCase(attrib.name);
                var value = parseAttribute(attrib.value);
                configObject[key] = value;
                qt.logInternal(qt.resources.settingAttrConfig + key + " = " + value);
            } catch (e) {
                qt.logError(qt.resources.settingAttrConfig + e);
            }
        });
    };

    //#endregion 

    return qt;
}(QT || {}));

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
//================================================
// quantumTunnel.Listeners
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    //#region init

    var listeners = [];

    //#endregion

    //#region private helpers

    function listenerExist(listenerName) {
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].name === listenerName) return true;
        }
        return false;
    };

    function addListener(name, func) {
        if (typeof (name) !== "string" || name.length < 1 || typeof (func) !== "function") {
            qt.logError(qt.resources.unexposable);
        } else {
            listeners.push({ name: name, func: func });
            qt.logInternal(qt.resources.exposed + name);
        }
    }

    function removeListener(name) {
        if (typeof (name) === "string") {
            listeners = listeners.filter(function (el) {
                return el.name !== name;
            });
            qt.logInternal(qt.resources.unExposed + name);
        } else {
            qt.logError(qt.resources.invalidParams + "unExpose()");
        }
    }

    //#endregion

    //#region exposeers

    qt.expose = function (x, y, z) {
        if (typeof (x) === "string" && typeof (y) === "function" && typeof (z) === "undefined") {
            addListener(x, y);
        } else {
            var param;
            for (var paramIndex = 0; paramIndex < arguments.length; paramIndex++) {
                param = arguments[paramIndex];
                if (typeof (param) === "function") {
                    addListener(param.name, param);
                } else if (Object.prototype.toString.call(param) === "[object Array]") {
                    for (var elementIndex = 0; elementIndex < param.length; elementIndex++) {
                        var element = param[elementIndex];
                        if (typeof (element) === "function") {
                            addListener(element.name, element);
                        } else {
                            qt.logError(qt.resources.invalidSyntax + "expose()");
                        }
                    }
                } else if (Object.prototype.toString.call(param) === "[object Object]") {
                    var objProps = Object.getOwnPropertyNames(param);
                    for (var propIndex = 0; propIndex < objProps.length; propIndex++) {
                        var propName = objProps[propIndex];
                        if (typeof (param[propName]) === "function") {
                            addListener(propName, param[propName]);
                        } else {
                            qt.logError(qt.resources.invalidSyntax + "expose()");
                        }
                    }
                } else {
                    qt.logError(qt.resources.invalidSyntax + "expose()");
                }
            }
        }
        return arguments;
    };

    qt.unExpose = function () {
        for (var paramIndex = 0; paramIndex < arguments.length; paramIndex++) {
            var param = arguments[paramIndex];
            if (typeof (param) === "function") {
                removeListener(param.name);
            } else if (typeof (param) === "string") {
                removeListener(param);
            } else if (Object.prototype.toString.call(param) === "[object Array]") {
                for (var elementIndex = 0; elementIndex < param.length; elementIndex++) {
                    var element = param[elementIndex];
                    if (typeof (element) === "function") {
                        removeListener(element.name);
                    } else if (typeof (element) === "string") {
                        removeListener(element);
                    } else {
                        qt.logError(qt.resources.invalidSyntax + "unExpose()");
                    }
                }
            } else if (Object.prototype.toString.call(param) === "[object Object]") {
                var objProps = Object.getOwnPropertyNames(param);
                for (var propIndex = 0; propIndex < objProps.length; propIndex++) {
                    var propName = objProps[propIndex];
                    removeListener(propName);
                }
            } else {
                qt.logError(qt.resources.invalidSyntax + "unExpose()");
            }
        }

        return arguments;
    };

    qt.listExposed = function (listFunctions) {
        qt.logInternal("Listing Exposed functions");
        for (var i = 0; i < listeners.length; i++) {
            if (listFunctions) {
                qt.logInternal("Listener " + listeners[i].name, listeners[i].func);
            } else {
                qt.logInternal("+++ " + listeners[i].name);
            }
        }
    };

    qt.isExposed = function (func) {
        if (typeof (func) === "function") {
            return listenerExist(func.name);
        } else if (typeof (func) === "string") {
            return listenerExist(func);
        } else {
            qt.logError(qt.resources.invalidSyntax + "isExposed()");
            return false;
        }
    };

    //#endregion

    //#region executors

    qt.executeListener = function (listener) {
        qt.logListening("Executing listener : ");
    };

    //#endregion

    return qt;
}(QT || {}));

//================================================
// quantumTunnel.Broadcasters
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";

    //#region init

    //#endregion

    return qt;
}(QT || {}));

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

//================================================
// quantumTunnel.Starter
// sharpcodex , sharpcodex@gmail.com
//================================================


var QT = (function (qt) {
    "use strict";

    qt.start = function () {
        qt.rtc.start();
    };

    return qt;
}(QT || {}));

(function (qt) {
    "use strict";

    $(function () {
        if (qt.config.autoStart) {
            qt.start();
        }
    });

}(QT));