var QT = (function (qt) {

    //#region Dependencies check

    qt.resources = {
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the QuantumTunnel.Core.js file."
    };

    //#endregion

    //#region Dependencies check

    function printMessage(msg) {
        if (console && console.log) {
            console.log("QT : ", msg);
        } else {
            alert("QT info : ", msg);
        }
    };

    if (typeof ($) !== "function") {
        throw new Error(qt.resources.nojQuery);
    }

    //#endregion

    //#region init

    var qTag = $("script[quantum-tunnel]");

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

    //#endregion

    //#region public helpers

    qt.logConnection = function (msg) {
        if (qt.config.logConnectionEvents) printMessage(msg);
    };

    qt.logInternal = function (msg) {
        if (qt.config.logInternalEvents) printMessage(msg);
    };

    qt.logBroadcasting = function (msg) {
        if (qt.config.logBroadcastingEvents) printMessage(msg);
    };

    qt.logListening = function (msg) {
        if (qt.config.logListeningEvents) printMessage(msg);
    };

    qt.logError = function (err) {
        if (qt.config.logErrors) printError(err);
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
            qt.logInternal("setting attr config : " + key + " = " + value);
            qt.config[key] = value;
        } catch (e) {
            qt.logError("setting attributes configs" + e);
        }
    });

    //#endregion

    qt.logInternal("QT Core initialized!");
    qt.logInternal(qt.config);

    return qt;
}(QT || {}));