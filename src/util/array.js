if (typeof princessJs == "undefined"){
	var princessJs = {};
}
if (typeof princessJs.util == "undefined"){
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
        for(var i = 0, l = array.length; i < l; ++i) {
            var y = u;
            var added = false;
            for(var c in array[i]) {
                if(!y.hasOwnProperty(array[i][c])) {
                    y[array[i][c]] = {};
                    added = true;
                }
                y = y[array[i][c]];
            }
            if(added) ret.push(array[i]);
        }
        return ret;
    }
})();