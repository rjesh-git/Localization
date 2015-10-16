var localizer = localizer || {};

var qs = [],opt,
	q = document.URL.split('?')[1];
if (q !== undefined) {
	q = q.split('&');
	for (var i = 0; i < q.length; i++) {
		var hash = q[i].split('=');
		qs.push(hash[1]);
		qs[hash[0]] = decodeURIComponent(hash[1]);
	}
}

localizer.Process = function() {
	var lElements = document.querySelectorAll('h1[localeval], div[localeval], span[localeval], a[localeval]');
	for (var i = 0, il = lElements.length; i < il; i++) {
		lElements[i].innerHTML = resources[lElements[i].getAttribute("localeval")];
	}
	lElements = document.querySelectorAll('input[localeval]');
	for (i = 0, il = lElements.length; i < il; i++) {
		lElements[i].value = resources[lElements[i].getAttribute("localeval")];
	}
};

localizer.Init = function(options) {
	opt = $.extend({}, {
	defaultLang: "en-US", 
	cache: true	
	}, options);

	try {
		localizer.getResource().then(
		function(status) {
			setTimeout(function(){ localizer.Process(); }, 100);	
		}, function(status) {
			console.error('Failed to load resource files');
		});
	} catch (ex) {
		console.error(ex.message);
	}
};

localizer.getResource = function() {
	var dfd = new jQuery.Deferred(),
		llcc = qs["SPLanguage"] || opt.defaultLang;
	$.cachedScript("../Scripts/resource." + llcc + ".js").done(function(script, textStatus) {
		dfd.resolve();
	}).fail(function(jqxhr, settings, exception) {
		if (llcc !== opt.defaultLang) {
			$.cachedScript("../Scripts/resource." + opt.defaultLang +".js").done(function(script, textStatus) {
				dfd.resolve();
			}).fail(function(jqxhr, settings, exception) {
				dfd.reject();
			});
		}
	});
	return dfd.promise();
};

jQuery.cachedScript = function(url, options) {
	options = $.extend(options || {}, {
		dataType: "script",
		cache: opt.cache,
		url: url
	});
	return jQuery.ajax(options);
};