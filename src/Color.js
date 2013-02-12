if (typeof princessJS == "undefined"){
	var princessJs = {};
}
(function() {
	var ns = princessJs;
	ns.Color = function(r, g, b) {
		var r_ = r ? r : 0;
		var g_ = g ? g : 0;
		var b_ = b ? b : 0;

		this.toCssHexCode = function () {
			var _color = "#" + this.toHexCode();
			return _color;
		};

		this.toHexCode = function () {
			return ns.Color.getHexCode(r_, g_, b_);
		};

		this.toRGB = function () {
			return { r: r_,
				g: g_,
				b: b_
			};
		};

		this.toHSV = function() {
			var h = ns.Color.getHue(r_, g_, b_);
			var s = ns.Color.getSaturation(r_, g_, b_);
			var v = ns.Color.getLightness(r_, g_, b_);
			return { h: h,
				s: s,
				v: v
			};
		};
		
		//mutable
		this.additiveBlend = function(color){
			var _rgb = color.toRGB();
			r_ += _rgb.r;
			g_ += _rgb.g;
			b_ += _rgb.b;
			r_ = ns.Color.getRGBColorValue(r_);
			g_ = ns.Color.getRGBColorValue(g_);
			b_ = ns.Color.getRGBColorValue(b_);
		};
		
		//immutable
		this.createAdditiveBlendedColor = function(color){
			var rgb = color.toRGB();
			var r = ns.Color.getRGBColorValue(r_ + rgb.r);
			var g = ns.Color.getRGBColorValue(g_ + rgb.g);
			var b = ns.Color.getRGBColorValue(b_ + rgb.b);
			return new ns.Color(r, g, b);
		};
	};

	ns.Color.getRGB = function(hexCode){
		//#00ffffと00ffff
		var _hexCode = hexCode.substr(hexCode.length - 6, 6);
		var _rHex = _hexCode.substring(0, 2);
		var _gHex = _hexCode.substring(2, 4);
		var _bHex = _hexCode.substring(4, 6);
		var _r = parseInt(_rHex, 16);
		var _g = parseInt(_gHex, 16);
		var _b = parseInt(_bHex, 16);
		return {
			r:_r,
			g:_g,
			b:_b
		};
	};

	ns.Color.getHexCode = function(r, g, b){
		function getHexPaddingString(v) {
			var temp = "00" + parseInt(v).toString(16);
			temp = temp.substr(temp.length - 2, 2);
			return temp;
		}
		var _rHexCode = getHexPaddingString(r);
		var _gHexCode = getHexPaddingString(g);
		var _bHexCode = getHexPaddingString(b);
		var _hexCode = "" + _rHexCode + _gHexCode + _bHexCode;
		return _hexCode;
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
		return new ns.Color(hsv.h, hsv.s, hsv.v);
	};

	ns.Color.createFromHexCode = function (hexCode) {
		var _rgb = ns.Color.getRGB(hexCode);
		return new ns.Color(_rgb.r, _rgb.g, _rgb.b);
	};
	
	ns.Color.getHue = function(r, g, b) {
		var max = getMinMax(r,g,b).max;
		var min = getMinMax(r,g,b).min;
		if( max == min) { 
			return 0;
		}
		var hue;
		if (r == max) {
			hue = 0 | (60 * ( g - b ) / (max - min)) + 0;
		} else if (g == max) {
			hue = 0 | (60 * ( b - r ) / (max - min)) + 120;
		} else if (b == max) {
			hue = 0 | (60 * ( r - g ) / (max - min)) + 240;
		}
		
		if(hue < 0) {
			hue += 360;
		}
		return hue;
	};

	ns.Color.getSaturation = function(r, g, b) {
		var saturation;
		var max = getMinMax(r,g,b).max;
		var min = getMinMax(r,g,b).min;
		if(max == 0) {
			saturation = 0;
		}else{
			saturation = 0 | (255 * (max - min)/max);
		}
		return saturation;
	};
	
	ns.Color.getLightness = function(r, g, b) {
		var max = getMinMax(r,g,b).max;
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

	ns.Color.getHSV = function(h, s, v){
		if(h > 360 || h < 0){ throw new Error("ArgumentException")}
		if(s > 255 || s < 0){ throw new Error("ArgumentException")}
		if(v > 255 || v < 0){ throw new Error("ArgumentException")}
		
		if(s == 0){
			return {r:v,g:v,b:v};
		}
		var hi = 0 | (h / 60);
		var f = (h / 60) - hi;
		var p = v * (1 - s/255);
		var q = v * (1 - f * s / 255);
		var t = v * (1 - (1 - f) * s / 255);
		var rgb = {r:null,g:null,b:null};
		switch(hi) {
			case 0:
				rgb.r = v;
				rgb.g = t;
				rgb.b = p;
				return rgb;
				break;
			case 1:
				rgb.r = q;
				rgb.g = v;
				rgb.b = p;
				return rgb;
				break;
			case 2:
				rgb.r = p;
				rgb.g = v;
				rgb.b = t;
				return rgb;
				break;
			case 3:
				rgb.r = p;
				rgb.g = q;
				rgb.b = v;
				return rgb;
				break;
			case 4:
				rgb.r = t;
				rgb.g = p;
				rgb.b = v;
				return rgb;
				break;
			case 5:
				rgb.r = v;
				rgb.g = p;
				rgb.b = q;
				return rgb;
				break;
		}
		
	};
	
	function getMinMax(var_args) {
		var max = Math.max.apply(null,arguments);
		var min = Math.min.apply(null,arguments);
		return {
			max : max,
			min : min
		};
	}
})();