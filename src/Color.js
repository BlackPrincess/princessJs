if (this.princessJS == undefined){
	this.princessJs = {};
}

princessJs.Color = function(r, g, b) {
    var _r = r ? r : 0;
    var _g = g ? g : 0;
    var _b = b ? b : 0;

    function getColorValue(value){
        if(value > 255) {
            return 255;
        }else if(value < 0) {
            return 0;
        }else {
            return value;
        }
    }

    this.toCssHexCode = function () {
        var color = "#" + this.toHexCode();
        return color;
    };

    this.toHexCode = function () {
        return princessJs.Color.getHexCode(_r,_g,_b);
    };

    this.toRGB = function () {
        return { r: _r,
            g: _g,
            b: _b
        };
    };

    //mutable
    this.additiveBlend = function(color){
        var _rgb = color.toRGB();
        _r += _rgb.r;
        _g += _rgb.g;
        _b += _rgb.b;

        _r = getColorValue(_r);
        _g = getColorValue(_g);
        _b = getColorValue(_b);
    };
    //immutable
    this.additiveBlendColor = function(color){
        var _rgb = color.toRGB();
        var r = getColorValue(_r + _rgb.r);
        var g = getColorValue(_g + _rgb.g);
        var b = getColorValue(_b + _rgb.b);
        return new princessJs.Color(r, g, b);
    };
}

princessJs.Color.getRGB = function(hexCode){
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

princessJs.Color.getHexCode = function(r, g, b){
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

princessJs.Color.getCssHexCode = function(r, g, b){
    return "#" + princessJs.Color.getHexCode(r, g, b);
};

princessJs.Color.create = function (r, g, b) {
    return new princessJs.Color(r, g, b);
};

princessJs.Color.createFromRGB = function (rgb) {
    return new princessJs.Color(rgb.r, rgb.g, rgb.b);
};

princessJs.Color.createFromHexCode = function (hexCode) {
    var rgb = princessJs.Color.getRGB(hexCode);
    return new princessJs.Color(rgb.r, rgb.g, rgb.b);
};