var QT = (function(qt) {
    "use strict";

    //#region resources

    qt.resources = {
        name: "Quantum Tunnel",
        shortName: "qt",
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the QuantumTunnel.Core.js file.",
        coreInitialized: "QT Core initialized with configs ",
        settingAttrConfig: "setting attr config  ",
        invalidSyntax: "Invalid syntax when calling ",
        unexposable: "QT can only expose named functions",
        exposed: "function exposed successfully : ",
        unExposed: "function unExposed successfully : ",
        unExposeInvalidParams: "Calling unExpose() with invalid parameters",
        unExposeUnExposed: "Can not unExpose an already unExposed function"
    };

    //#endregion

    //#region Dependencies check

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

    if (typeof ($) !== "function") {
        printMessage(false, qt.resources.nojQuery);
        return qt;
    }

    //#endregion

    //#region init

    var qTag = $("script[quantum-tunnel]");
    var listeners = [];

    //#endregion

    //#region private helpers

    function getCamelCase(str) {
        return str.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
    }

    function parseAttribute(value) {
        if (!value) return null;
        if (value === "true" || value === "false") return /^true$/i.test(value);
        if (!isNaN(value)) return parseFloat(value);
        return value;
    }

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
            listeners = listeners.filter(function(el) {
                return el.name !== name;
            });
            qt.logInternal(qt.resources.unExposed + name);
        } else {
            qt.logError(qt.resources.unExposeInvalidParams);
        }
    }

    //#endregion

    //#region public helpers

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

    //#region default config

    qt.config = {
        logErrors: true,
        logConnectionEvents: true,
        logInternalEvents: true,
        logBroadcastingEvents: true,
        logListeningEvents: true,

        init: true
    };

    //#endregion

    //#region config setters

    $.each(qTag.get(0).attributes, function(i, attrib) {
        try {
            var key = getCamelCase(attrib.name);
            var value = parseAttribute(attrib.value);
            qt.logInternal(qt.resources.settingAttrConfig + key + " = " + value);
            qt.config[key] = value;
        } catch (e) {
            qt.logError(qt.resources.settingAttrConfig + e);
        }
    });

    //#endregion

    //#region listeners

    qt.expose = function(x, y, z) {
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

    qt.unExpose = function() {
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

    qt.listExposed = function() {
        qt.logInternal("Listing Exposed functions");
        for (var i = 0; i < listeners.length; i++) {
            qt.logInternal(listeners[i].name);
        }
    };
    //#endregion

    qt.logInternal(qt.resources.coreInitialized, qt.config);
    return qt;
}(QT || {}));