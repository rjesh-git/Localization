// this is the main dictionary that stores the Localozation key / values
"use strict";
var Localizer = Localizer || {};

Localizer.Process = function () {
    /*$("div[localeval]").each(function (index) {
        //var arr = $(this).attr('localeval').split(":");
        $(this).html(resources[$(this).attr('localeval')]);
    });*/

	console.time("localizer");

    $("[localeval]").each(function (index) {
        //console.log($(this).attr('localeval'));
        $(this).html(resources[$(this).attr('localeval')]);
    });

	console.timeEnd("localizer");
    /*$("span[localeval]").each(function (index) {
        //var arr = $(this).attr('localeval').split(":");
        //$(this).html(resourceArr[arr[0]][arr[1]]);
        console.log($(this).attr('localeval'));
        $(this).html(resources[$(this).attr('localeval')]);
    });*/
};

