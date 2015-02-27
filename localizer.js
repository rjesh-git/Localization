// this is the main dictionary that stores the Localozation key / values
"use strict";


var ProcessDivLocalization = function () {
    $("div[localeval]").each(function (index) {
        var arr = $(this).attr('localeval').split(":");
        $(this).html(resourceArr[arr[0]][arr[1]]);
    });
    $("span[localeval]").each(function (index) {
        var arr = $(this).attr('localeval').split(":");
        $(this).html(resourceArr[arr[0]][arr[1]]);
    });
};

