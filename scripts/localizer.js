var localizer = localizer || {};

var qs = [], opt;
var q = document.URL.split('?')[1];
if(q !== undefined){
    q = q.split('&');
    for(var i = 0; i < q.length; i++){
        var hash = q[i].split('=');
        qs.push(hash[1]);
        qs[hash[0]] = hash[1];
    }
}

localizer.Process = function (mode) {
    $("[localeval]").each(function (index) {
        $(this).html(resources[$(this).attr('localeval')]);
    });
};

localizer.Init = function (options) {
	opt = $.extend({}, {
        default: "en-US",
        cache: true,
    }, options);
	
	//$.ajaxSetup({cache:true});
	
	try {
        localizer.getResource().then(
        function (status) {
            localizer.Process();
        },
        function (status) {
            console.error('Failed to load resource files');
        });
    }
    catch (ex) {
        console.error(ex.message);
    }
}

localizer.getResource = function () {
    var dfd = new jQuery.Deferred(),
    llcc = qs["SPLanguage"] || opt.default;
    $.cachedScript("../Scripts/resource." + llcc + ".js")
                .done(function (script, textStatus) { dfd.resolve(); })
                .fail(function (jqxhr, settings, exception) {
                    if (llcc !== opt.default) {
                        $.cachedScript("../Scripts/resource." + opt.default + ".js")
                        .done(function (script, textStatus) { dfd.resolve(); })
                        .fail(function (jqxhr, settings, exception) { dfd.reject();});
                    }
                });
    return dfd.promise();
};

jQuery.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return jQuery.ajax( options );
};

