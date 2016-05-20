//================================================
// System Name : Quantum Tunnel
// Program/Module Name : Init
// Created by : sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {
    
    //#region Dependencies check

    if (typeof ($.hubConnection) !== "function") {
        qt.logError(qt.resources.noSignalR);
        return qt;
    }

    //#endregion
    qt.logInternal("QT SignalR initialized!");
    return qt;
}(QT || {}));