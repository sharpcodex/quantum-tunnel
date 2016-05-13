var QT = (function (qt) {

    //#region init

    var thisScript = $("script[quantum-tunnel]");

    //#endregion

    //#region helpers

    function getCamelCase(str) {
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }

    function parseAttribute(value) {
        if (!value) return null;
        if (value === "true" || value === "false") return /^true$/i.test(value);
        if (!isNaN(value)) return parseFloat(value);
        return value;
    }

    //#end

    //#region default config

    qt.config = {
        logConnectionEvents: false,
        logInternalEvents: true,
        logBroadcastingEvents: true,
        logListeningEvents: true,

        init: true
    };

    //#end

    //#region config setters

    $.each(thisScript.get(0).attributes, function (i, attrib) {
        qt.config[getCamelCase(attrib.name)] = parseAttribute(attrib.value);
    });

    //#end

    console.log(qt.config);
    return qt;
}(QT || {}));