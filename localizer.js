// this is the main dictionary that stores the Localozation key / values
"use strict";
var Localizer = Localizer || {};

Localizer.ProcessDivLocalization = function () {
    $("div[localeval]").each(function (index) {
        //var arr = $(this).attr('localeval').split(":");
        $(this).html(resources[$(this).attr('localeval')]);
    });
    $("span[localeval]").each(function (index) {
        //var arr = $(this).attr('localeval').split(":");
        //$(this).html(resourceArr[arr[0]][arr[1]]);
        console.log($(this).attr('localeval'));
        $(this).html(resources[$(this).attr('localeval')]);
    });
};

