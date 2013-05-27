String.prototype.format = function(arg) {
	var rep_fn;
	var str = this;
	
	if (typeof arg == "object") {
		// "{name}".format({name:"name"})
		rep_fn = function(a, b) { return arg[b] ? arg[b] : a; }
	} else {
		// "{0}".format("name");
		var args = arguments;
		var argLen = args.length - 1;
		// {{0}} は {0} で出力させる。置き換えない
		str = str.replace(/(?!\{)*\{\{(\w+)\}\}/g, function(a, b) {
			args[++argLen] = a.replace("{{", "{").replace("}}", "}"); 
			var ret = "{" + argLen + "}";
			return ret;
		});
		rep_fn = function(a, b) { return args[ parseInt(b, 10) ]; }
	}
	
    return str.replace( /(?!\{)*\{(\w+)\}/g, rep_fn );
};

String.prototype.toHalfNumber = function() {
    return this.replace(/[０１２３４５６７８９]/g, function(a){
        var b = "０１２３４５６７８９".indexOf(a);
        return (b !== -1) ? b : a;
    }).replace(/\d+\．\d+/g, function(a) {
        return a.replace("．", ".");
    });
};
