(function (qt) {

    function dox() {
        console.log("dox func");
    }

    function doy() {
        console.log("doy func");
    }

    function doz() {
        console.log("doz func");
    }

    var funcArray = [dox, doy];

    var funcObj = { dox: dox, doy: doy }

    //qt.expose(function () {

    //});

    //qt.expose(dox);

    //qt.expose("doa", function () {
    //    console.log("test func");
    //});

    //qt.expose(funcArray);

    //qt.expose(funcObj);
    qt.expose(dox,doy);


    //qt.unExpose(funcObj);
    //qt.listExposed();


    //qt.listExposed(true);



    console.log(qt.isExposed(dox));
    console.log(qt.isExposed("dox"));
    console.log(qt.isExposed(doz));

})(QT);