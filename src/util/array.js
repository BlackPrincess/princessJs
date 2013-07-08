if (typeof princessJs === "undefined"){
    var princessJs = {};
}
if (typeof princessJs.util === "undefined"){
    princessJs.util = {};
}
(function() {
    var ns = princessJs.util;
    /**
    * 配列をdistinctして返す
    * @param {Array} array 対象のArrayオブジェクト
    * @returns {Array} 重複を除かれたArrayオブジェクト
    */
    ns.distinct = function (array) {
        if(array[0] instanceof Object) {
            return _distinctMap(array);
        } else {
            return _distinct(array);
        }
    };

    var _distinct = function (array) {
        var u = {}, ret = [];
        for(var i = 0, l = array.length; i < l; ++i){
            if(u.hasOwnProperty(array[i])) {
                continue;
            }
            ret.push(array[i]);
            u[array[i]] = 1;
        }
        return ret;
    };

    var _distinctMap = function(array) {
        // これでいいのか・・・？
        var u = {}, ret = [];
		var _filter = function(a) {
			if(!y.hasOwnProperty(array[i][a])) {
				y[array[i][a]] = {};
				added = true;
			}
			y = y[array[i][a]];
		};
        for(var i = 0, l = array.length; i < l; ++i) {
            var y = u;
            var added = false;
			ns.forinIf(array[i], _filter);
            if(added) ret.push(array[i]);
        }
        return ret;
    };
    
	/**
    * for in hasOwnPropertyの構文
    * @param {Array} array 対象のArrayオブジェクト
	* @param {Function} f それぞれのループ時に実行される関数
    */
    ns.forinIf = function(array, f) {
        for(var a in array) if (array.hasOwnProperty(a)) {
                f(a);
            }
    };
    
})();