if (typeof princessJs === "undefined"){
	var princessJs = {};
}
if (typeof princessJs.util === "undefined"){
	princessJs.util = {};
}
(function() {
	var ns = princessJs.util;
	/**
	* Htmlエスケープを行う
	* @param 
	* @returns 
	*/
	ns.escape = function(text) {
		return String(text)
          .replace(/&(?!\w+;)/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
	};
})();