//================================================
// quantumTunnel.SingalR
// sharpcodex , sharpcodex@gmail.com
//================================================

var QT = (function (qt) {

    //#region Init

    var rtc = {};
    rtc.config = {};

    qt.rtc = qt.rtc || {};

    //#endregion

    //#region dependencies

    if (typeof ($.hubConnection) !== "function") {
        qt.logError(qt.resources.noSignalR);
        return qt;
    }

    //#endregion

    //#region Default configurations

    rtc.config = {
        transport: null,
        serverUrl: "/",
        hubName: "linker",
        init: true
    };

    //#endregion

    //#region attribute configurations Reader

    (function (qt) {
        var qRtcTag = $("script[quantum-tunnel-rtc]");
        if (qRtcTag && rtc.config) qt.configReader(rtc.config, qRtcTag);
    }(qt));

    //#endregion 

    //#region Events Handlers

    function errorHandler(error) {
        qt.logConnection(error);
    };

    function stateChangedHandler(state) {
        switch (state.newState) {
            case $.signalR.connectionState.connecting:
                qt.logConnection("connecting");
                break;
            case $.signalR.connectionState.connected:
                qt.logConnection("connected");
                break;
            case $.signalR.connectionState.reconnecting:
                qt.logConnection("reconnecting");
                break;
            case $.signalR.connectionState.disconnected:
                qt.logConnection("disconnected");
                break;
        }
    };

    //#endregion

    //#region Connection Helpers

    var rtcConnection = (function () {
        var connection = $.hubConnection();

        connection.logging = qt.config.logLowLevelConnectionEvents;
        connection.url = rtc.config.serverUrl;
        connection.error(errorHandler);
        connection.stateChanged(stateChangedHandler);

        return connection;
    })();

    var rtcProxy = rtcConnection.createHubProxy(rtc.config.hubName);

    rtc.on = function (event, fn) {
        rtcProxy.on(event, fn);
    };

    rtc.invoke = function () {
        return rtcProxy.invoke.apply(rtcProxy, arguments);
    };

    rtc.connect = function () {
        return rtcConnection.start(rtc.config.transport ? { transport: rtc.config.transport } : null);
    };

    //#endregion

    //#region Broadcast

    qt.rtc.broadcast = function (moduleName, listenerName, params) {
        rtc.connect().done(function () {
            var msg = "broadcasting : " + moduleName + "." + listenerName + " ";
            qt.logBroadcasting(msg + "Started");
            rtc.invoke("Broadcast", { moduleName: moduleName, listenerName: listenerName, params: params }).done(function () {
                qt.logBroadcasting(msg + "Succeeded");
            }).fail(function (error) {
                qt.logError(msg + "Failed : " + error);
            });
        });
    };

    //#endregion

    //#region Listen

    rtc.on("execListener", function (listener) {
        qt.executeListener(listener);
    });

    //#endregion

    //#region Public helpers

    qt.getTransportType = function () {
        return rtcConnection.transport.name;
    };

    qt.disconnect = function () {
        rtcConnection.stop();
    };

    qt.rtc.start = function () {
        rtc.connect();
    };

    //#endregion

    return qt;
}(QT || {}));