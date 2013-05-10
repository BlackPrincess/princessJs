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
        var u = {}, a = [];
        for(var i = 0, l = array.length; i < l; ++i){
           if(u.hasOwnProperty(array[i])) {
              continue;
           }
           a.push(array[i]);
           u[array[i]] = 1;
        }
        return a;
    }
})();