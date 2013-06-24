if (typeof princessJS === "undefined"){
    var princessJs = {};
}
(function() {
    var ns = princessJs;

    ns.Color = function(r, g, b) {
        var _r = r ? r : 0;
        var _g = g ? g : 0;
        var _b = b ? b : 0;

        this.toCssHexCode = function () {
            var color = "#" + this.toHexCode();
            return color;
        };

        this.toHexCode = function () {
            return ns.Color.getHexCode(_r, _g, _b);
        };

        this.toRGB = function () {
            return { r: _r,
                g: _g,
                b: _b
            };
        };

        this.toHSV = function() {
            var h = ns.Color.getHue(_r, _g, _b);
            var s = ns.Color.getSaturation(_r, _g, _b);
            var v = ns.Color.getLightness(_r, _g, _b);
            return { h: h,
                s: s,
                v: v
            };
        };

        //mutable
        this.additiveBlend = function(color){
            var _rgb = color.toRGB();
            _r += _rgb.r;
            _g += _rgb.g;
            _b += _rgb.b;
            _r = ns.Color.getRGBColorValue(_r);
            _g = ns.Color.getRGBColorValue(_g);
            _b = ns.Color.getRGBColorValue(_b);
        };
        
        //immutable
        this.createAdditiveBlendedColor = function(color){
            var rgb = color.toRGB();
            var r = ns.Color.getRGBColorValue(_r + rgb.r);
            var g = ns.Color.getRGBColorValue(_g + rgb.g);
            var b = ns.Color.getRGBColorValue(_b + rgb.b);
            return new ns.Color(r, g, b);
        };
    };

    ns.Color.getRGB = function(hexCode){
        //#00ffffと00ffff
        var _hexCode = hexCode.substr(hexCode.length - 6, 6);
        var rHex = _hexCode.substring(0, 2);
        var gHex = _hexCode.substring(2, 4);
        var bHex = _hexCode.substring(4, 6);
        var r = parseInt(rHex, 16);
        var g = parseInt(gHex, 16);
        var b = parseInt(bHex, 16);
        return {
            r:r,
            g:g,
            b:b
        };
    };

    ns.Color.getHexCode = function(r, g, b){
        function getHexPaddingString(v) {
            var temp = "00" + parseInt(v, 10).toString(16);
            temp = temp.substr(temp.length - 2, 2);
            return temp;
        }
        var rHexCode = getHexPaddingString(r);
        var gHexCode = getHexPaddingString(g);
        var bHexCode = getHexPaddingString(b);
        var hexCode = "" + rHexCode + gHexCode + bHexCode;
        return hexCode;
    };

    ns.Color.getCssHexCode = function(r, g, b){
        return "#" + ns.Color.getHexCode(r, g, b);
    };

    ns.Color.create = function (r, g, b) {
        return new ns.Color(r, g, b);
    };

    ns.Color.createFromRGB = function (rgb) {
        return new ns.Color(rgb.r, rgb.g, rgb.b);
    };
    
    ns.Color.createFromHSV = function (hsv) {
        var rgb = ns.Color.getRGBFromHSV(hsv.h, hsv.s, hsv.v);
        return new ns.Color(rgb.r, rgb.g, rgb.b);
    };

    ns.Color.createFromHexCode = function (hexCode) {
        var _rgb = ns.Color.getRGB(hexCode);
        return new ns.Color(_rgb.r, _rgb.g, _rgb.b);
    };
    
    ns.Color.getHSVFromRGB = function(r, g, b) {
        var h = ns.Color.getHue(r, g, b);
        var s = ns.Color.getSaturation(r, g, b);
        var v = ns.Color.getLightness(r, g, b);
        return {
            h:h,
            s:s,
            v:v
        };
    },
    
    ns.Color.getHue = function(r, g, b) {
        var max = getMinMax(r,g,b).max;
        var min = getMinMax(r,g,b).min;
        if( max === min) {
            return 0;
        }
        var hue;
        if (r === max) {
            hue = 0 | (60 * ( g - b ) / (max - min)) + 0;
        } else if (g === max) {
            hue = 0 | (60 * ( b - r ) / (max - min)) + 120;
        } else if (b === max) {
            hue = 0 | (60 * ( r - g ) / (max - min)) + 240;
        }

        return _roundHue(hue);
    };

    var _roundHue = function(hue) {
        return (hue < 0) ? hue + 360 : hue;
    };

    ns.Color.getSaturation = function(r, g, b) {
        var saturation;
        var max = getMinMax(r,g,b).max;
        var min = getMinMax(r,g,b).min;
        if(max === 0) {
            saturation = 0;
        }else{
            saturation = 0 | (255 * (max - min)/max);
        }
        return saturation;
    };
    
    ns.Color.getLightness = function(r, g, b) {
        var max = getMinMax(r, g, b).max;
        return 0 | max;
    };
    
    ns.Color.getRGBColorValue = function(value) {
        if(value > 255) {
            return 255;
        }else if(value < 0) {
            return 0;
        }else {
            return value;
        }
    };

    ns.Color.getSanitizedHSV = function(h, s, v){
        if(h >= 360) {  h = h % 360; }
        if(h < 0){      h = 0; }
        if(s > 255) {   s = 255; }
        if(s < 0){      s = 0; }
        if(v > 255){    v = 255; }
        if(v < 0){      v = 0; }
        return {h:h,
            s:s,
            v:v};
    };

    ns.Color.getRGBFromHSV = function(h, s, v){
        var hsv = ns.Color.getSanitizedHSV(h, s, v);
        h = hsv.h;
        s = hsv.s;
        v = hsv.v;

        if(s === 0){
            return { r:v,
                g:v,
                b:v };
        }

        var hi = 0 | (h / 60);
        var f = (h / 60) - hi;
        var p = v * (1 - s / 255);
        var q = v * (1 - f * s / 255);
        var t = v * (1 - (1 - f) * s / 255);

        var rgb = {r:null,
            g:null,
            b:null};

        switch(hi) {
        case 0:
            rgb.r = v;
            rgb.g = t;
            rgb.b = p;
            break;
        case 1:
            rgb.r = q;
            rgb.g = v;
            rgb.b = p;
            break;
        case 2:
            rgb.r = p;
            rgb.g = v;
            rgb.b = t;
            break;
        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = v;
            break;
        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = v;
            break;
        case 5:
            rgb.r = v;
            rgb.g = p;
            rgb.b = q;
            break;
        }
        return rgb;
    };
    
    function getMinMax(/*varArgs*/) {
        var max = Math.max.apply(null, arguments);
        var min = Math.min.apply(null, arguments);
        return {
            max : max,
            min : min
        };
    }
})();
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
    };
})();
if (typeof princessJs === "undefined"){
	var princessJs = {};
}
if (typeof princessJs.util === "undefined"){
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
		if (f.length === 0) {
			return f;
		}
		function iterate(varArgs) {
			if (varArgs.length >= f.length)
				return f.apply(null, varArgs);
			return function () {
				return iterate(varArgs.concat(Array.prototype.slice.call(arguments)));
			};
		}
		return iterate([]);
	};
})();
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
          .replace(/&(?!\w+;)/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
	};
})();
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