if(typeof jQuery === undefined) {
    var jQuery = {};
}

(function($){
    var _number = function(){
        var value = $(this).val();
        // 数字以外を置き換える
        value = value.toHalfNumber().replace(".","");
        if(!$.isNumeric(value)) {
            $(this).val("");
            return;
        }
        $(this).val(value);
    };
    
    var _integer = function(){
        var value = $(this).val();
        // 全角数字を置き換える
        value = value.toHalfNumber();
        if(!$.isNumeric(value)) {
            $(this).val("");
            return;
        }
        $(this).val(Math.floor(value));
    };
    
    var _float = function(){
        var value = $(this).val();
        value = value.toHalfNumber();
        if(!$.isNumeric(value)) {
            $(this).val("");
            return;
        }
        var digit = $(this).attr("data-float-digit");
        if(!$.isNumeric(digit) || digit === "") {
            digit = 2;  // 初期値として二桁
        }
        value *= Math.pow(10, digit);
        value = Math.floor(value) / Math.pow(10, digit);
        $(this).val(value);
    };
    
    var _date = function(){
        var value = $(this).val();
        var date = new Date(value);
        if(date.toString() === "Invalid Date") {
            $(this).val("");
            return;
        }
        var format = $(this).attr("data-date-format");
        if(!format || format === "") {
            format = "yyyy-MM-dd"; // datetimeで作った方がよかった？
        }
        $(this).val(date.toFormatString(format));
    };
    
    var _getFunction = function(type) {
        switch(type) {
        case "number":
            return _number;
        case "integer":
            return _integer;
        case "float":
            return _float;
        case "date":
            return _date;
        default:
            return function(){};
        }
    };
    
    $.fn.extend({
        inputSupport : function() {
            var attr = this.attr("data-type");
            this.on("blur", _getFunction(attr));
        }
    });
})(jQuery);