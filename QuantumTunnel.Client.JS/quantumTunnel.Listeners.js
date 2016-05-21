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
