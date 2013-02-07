if (typeof princessJs == "undefined"){
	var princessJs = {};
}
if (typeof princessJs.util == "undefined"){
	princessJs.util = {};
}
(function() {
	var ns = princessJs.util;
	/**
	* 関数のカリー化を行う
	* @param {function} func カリー化する関数
	* @returns {function} カリー化された関数
	*/
	ns.curry = function(f) {
		if (f.length == 0) {
			return f;
		}
		function iterate(var_args) {
			if (var_args.length >= f.length)
				return f.apply(null, var_args);
			return function () {
				return iterate(var_args.concat(Array.prototype.slice.call(arguments)));
			};
		}
		return iterate([]);
	};
})();