var QT = (function (qt) {

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

    function printMessage(msg) {
        if (console && console.log) {
            console.log("QT : ", msg);
        } else {
            alert("QT info : ", msg);
        }
    };

    function printError(err) {
        if (console && console.error()) {
            console.error("QT : ", err);
        } else {
            alert("QT error : ", err);
        }
    };

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
            qt.config[getCamelCase(attrib.name)] = parseAttribute(attrib.value);
        } catch (e) {
            qt.logError("setting attributes configs" + e);
        }
    });

    //#endregion

    qt.logInternal("QT initialized!");
    qt.logInternal(qt.config);

    return qt;
}(QT || {}));