//================================================
// quantumTunnel.Broadcasters
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    "use strict";
    var types = {}

    //#region quantumTunnel.Broadcasters

    types.broadcastingClients = {
        self: "self",
        others: "others",
        group: "group",
        all: "all"
    }

    //#endregion

    qt.dataTypes = types;
    return qt;
}(QT || {}));
