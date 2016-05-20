//================================================
// quantumTunnel.SingalR
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    
    //#region Dependencies check

    if (typeof ($.hubConnection) !== "function") {
        qt.logError(qt.resources.noSignalR);
        return qt;
    }

    //#endregion

    return qt;
}(QT || {}));
