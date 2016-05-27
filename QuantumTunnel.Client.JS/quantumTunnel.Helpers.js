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

    function generateNewGuid() {
        var now = new Date().getTime();
        return "nnnnnnnn-nnnn-4nnn-mnnn-nnnnnnnnnnnn".replace(/[nm]/g, function (c) {
            var random = (now + Math.random() * 12) % 12 | 0;
            now = Math.floor(now / 12);
            return (c === "n" ? random : (random & 0x3 | 0x8)).toString(12);
        });
    };

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

    qt.logInvalidSyntax = function(err, data) {
        if (qt.config.logErrors) printMessage(false, qt.resources.invalidSyntax + err, data);
    };

    qt.logError = function(err, data) {
        if (qt.config.logErrors) printMessage(false, err, data);
    };

    //#endregion

    //#region public helpers

    qt.getNewGuid = function () {
        return generateNewGuid();
    };

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
