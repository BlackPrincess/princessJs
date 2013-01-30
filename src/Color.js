function Color(r, g, b) {
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
        return Color.getHexCode(_r,_g,_b);
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
        return new Color(r, g, b);
    };
}

Color.getRGB = function(hexCode){
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

Color.getHexCode = function(r, g, b){
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

Color.getCssHexCode = function(r, g, b){
    return "#" + Color.getHexCode(r, g, b);
};

Color.create = function (r, g, b) {
    return new Color(r, g, b);
};

Color.createFromRGB = function (rgb) {
    return new Color(rgb.r, rgb.g, rgb.b);
};

Color.createFromHexCode = function (hexCode) {
    var rgb = Color.getRGB(hexCode);
    return new Color(rgb.r, rgb.g, rgb.b);
};