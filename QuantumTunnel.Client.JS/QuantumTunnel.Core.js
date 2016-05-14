var QT = (function (qt) {

    //#region resources

    qt.resources = {
        name: "Quantum Tunnel",
        shortName: "qt",
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the QuantumTunnel.Core.js file.",
        coreInitialized: "QT Core initialized with configs ",
        settingAttrConfig: "setting attr config  ",
        invalidSyntax: "Invalid syntax when calling ",
        unexposable: "QT can only expose named functions",
        exposed: "function exposed successfully : "
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
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }

    function parseAttribute(value) {
        if (!value) return null;
        if (value === "true" || value === "false") return /^true$/i.test(value);
        if (!isNaN(value)) return parseFloat(value);
        return value;
    }

    function pushListener(name, func) {
        if (typeof (name) !== "string" || name.length < 1 || typeof (func) !== "function") {
            qt.logError(qt.resources.unexposable);
        } else {
            listeners.push({ name: name, func: func });
            qt.logInternal(qt.resources.exposed + name);
        }
    }

    //#endregion

    //#region public helpers

    qt.logConnection = function (msg, data) {
        if (qt.config.logConnectionEvents) printMessage(true, msg, data);
    };

    qt.logInternal = function (msg, data) {
        if (qt.config.logInternalEvents) printMessage(true, msg, data);
    };

    qt.logBroadcasting = function (msg, data) {
        if (qt.config.logBroadcastingEvents) printMessage(true, msg, data);
    };

    qt.logListening = function (msg, data) {
        if (qt.config.logListeningEvents) printMessage(true, msg, data);
    };

    qt.logError = function (err, data) {
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

    $.each(qTag.get(0).attributes, function (i, attrib) {
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

    qt.expose = function (x, y) {

        //expose(namedFunc)
        if (typeof (x) === "function" && typeof (y) === "undefined") {
            pushListener(x.name, x);
        }
            //expose(name,func)
        else if (typeof (x) === "string" && typeof (y) === "function") {
            pushListener(x, y);
        }
            //expose([func1,func2])
        else if (Object.prototype.toString.call(x) === "[object Array]" && typeof (y) === "undefined") {
            x.forEach(function (func) {
                pushListener(func.name, func);
            });
        }
            //expose({name1:func1,name2:func2})
        else if (Object.prototype.toString.call(x) === "[object Object]" && typeof (y) === "undefined") {
            Object.getOwnPropertyNames(x).forEach(function (name) {
                pushListener(name, x[name]);
            });
        }
            //expose(func1,func2,....)
        else if (typeof (x) === "function" && typeof (y) === "function") {
            for (var i = 0, j = arguments.length; i < j; i++) {
                pushListener(arguments[i].name, arguments[i]);
            }
        }
            //invalid Syntax
        else {
            qt.logError(qt.resources.invalidSyntax + "expose()");
        }

        return arguments;
    };

    //#endregion

    qt.logInternal(qt.resources.coreInitialized, qt.config);
    return qt;
}(QT || {}));