if (typeof princessJs === "undefined"){
	var princessJs = {};
}
if (typeof princessJs.util === "undefined"){
	princessJs.util = {};
}
(function() {
	var ns = princessJs.util;
	/**
	* メモ化された関数を生成する
	* @param {function} func メモ化する関数
	* @returns {function} メモ化された関数
	*/
	ns.memorizer = function(func) {
		var memo = {};
		if(func.length === 1){
			return function(arg) {
				if(typeof(arg) === "undefined") {
					arg = "undefined";
				}
				if(memo[arg]) {
					return memo[arg];
				}else {
					var result = func(arg);
					memo[arg] = result;
					return result;
				}
			};
		} else {
			return function(/* var_args */) {
				var arg = Array.prototype.slice.call(arguments);
				if(memo[arg]) {
					return memo[arg];
				}else {
					var result = func(arg);
					memo[arg] = result;
					return result;
				}
			};
		}
	};
})();