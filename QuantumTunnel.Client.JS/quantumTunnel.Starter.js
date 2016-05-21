//================================================
// quantumTunnel.Starter
// sharpcodex , sharpcodex@gmail.com
//================================================


var QT = (function (qt) {
    "use strict";

    qt.start = function () {
        qt.rtc.start();
    };

    return qt;
}(QT || {}));

(function (qt) {
    "use strict";

    $(function () {
        if (qt.config.autoStart) {
            qt.start();
        }
    });

}(QT));
