Date.prototype.getMonthLength = function() {
    return this.getMonthLast().getDate();
};

Date.prototype.getPrevMonth = function() {
    return this.dateAdd("month", -1);
};


Date.prototype.getNextMonth = function() {
    return this.dateAdd("month", 1);
};


Date.prototype.getMonthFirst = function() {
    var tempDate = this.getDatePart();
    tempDate.setDate(1);
    return tempDate;
};


Date.prototype.getMonthLast = function() {
    var tempDate = this.getMonthFirst();
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(0);
    return tempDate;
};

Date.prototype.getDatePart = function(){
    var tempDate = this.clone();
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    tempDate.setMilliseconds(0);
    return tempDate;
};

Date.prototype.dateAdd = function(datePartName, spanCount) {
    var tempDate = this.clone();
    var dateMemo;

    switch(datePartName) {
    case "year":
    case "y":
        tempDate = this.dateAdd("month", spanCount * 12);
        break;

    case "month":
    case "m":
        dateMemo = tempDate.getDate();
        tempDate.setDate(1);
        tempDate.setMonth(tempDate.getMonth() + spanCount + 1);
        tempDate.setDate(0);
        tempDate.setDate(Math.min(dateMemo, tempDate.getDate()));
        break;

    case "day":
    case "date":
    case "d":
        tempDate.setDate(tempDate.getDate() + spanCount);
        break;

    case "week":
        tempDate = this.dateAdd("day", spanCount * 7);
        break;

    case "hour":
        tempDate.setHours(tempDate.getHours() + spanCount);
        break;

    case "minute":
        tempDate.setMinutes(tempDate.getMinutes() + spanCount);
        break;

    case "second":
        tempDate.setSeconds(tempDate.getSeconds() + spanCount);
        break;

    case "millisecond":
        tempDate.setMilliseconds(tempDate.getMilliseconds() + spanCount);
        break;
    }

    return tempDate;
};


Date.prototype.dateDiff = function(datePartName, dateTarget) {
    var ticksBase = (new Date()).getDatePart().getTime();

    switch(datePartName) {
    case "year":
    case "y":
        return dateTarget.getFullYear() - this.getFullYear();

    case "month":
    case "m":
        return this.dateDiff("year", dateTarget) * 12 + dateTarget.getMonth() - this.getMonth();

    case "day":
    case "date":
    case "d":
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60*60*24)) -
            Math.floor(
                (this.getTime() - ticksBase) / (1000*60*60*24)
            );

    case "week":
        return Math.floor(this.dateDiff("day", dateTarget) / 7);

    case "hour":
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60*60)) -
            Math.floor((this.getTime() - ticksBase) / (1000*60*60));

    case "minute":
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60)) -
            Math.floor((this.getTime() - ticksBase) / (1000*60));

    case "second":
        return Math.floor((dateTarget.getTime() - ticksBase) / 1000) -
            Math.floor((this.getTime() - ticksBase) / 1000);

    case "millisecond":
        return dateTarget.getTime() - this.getTime();
    }

    return null;
};


Date.prototype.toFormatString = function(format) {
    // TODO:言語別に変更可能にする
    var week = new Array("Sun","Mon","Tue","Web","Tur","Fri","Sat");

    var yyyy = this.getFullYear().toString();
    var yy = yyyy.slice(2);
    var M = (this.getMonth() + 1).toString();
    var MM = M.length === 1 ? "0" + M : M;
    var d = this.getDate().toString();
    var dd = d.length === 1 ? "0" + d : d;
    var ddd = week[this.getDay()];
    var H = this.getHours().toString();
    var HH = H.length === 1 ? "0" + H : H;
    var h = (this.getHours() % 12).toString();
    if(h === "0") {
        h = "12";
    }
    var hh = h.length === 1 ? "0" + h : h;
    var m = this.getMinutes().toString();
    var mm = m.length === 1 ? "0" + m : m;
    var s = this.getSeconds().toString();
    var ss = s.length === 1 ? "0" + s : s;
    var millis = "000" + this.getMilliseconds().toString();
    var f = millis.substr(millis.length - 3, 1);
    var ff = millis.substr(millis.length - 3, 2);
    var fff = millis.substr(millis.length - 3, 3);

    return format
        .replace(/yyyy/g, yyyy)
        .replace(/yy/g, yy)
        .replace(/MM/g, MM)
        .replace(/M/g, M)
        .replace(/ddd/g, ddd)
        .replace(/dd/g, dd)
        .replace(/d/g, d)
        .replace(/HH/g, HH)
        .replace(/H/g, H)
        .replace(/hh/g, hh)
        .replace(/h/g, h)
        .replace(/mm/g, mm)
        .replace(/m/g, m)
        .replace(/ss/g, ss)
        .replace(/s/g, s)
        .replace(/fff/g, fff)
        .replace(/ff/g, ff)
        .replace(/f/g, f);
};

Date.prototype.clone = function() {
    return new Date(this.getTime());
};
String.prototype.format = function(arg) {
    var repFn;
    var str = this;
    
    if (typeof arg === "object") {
        // "{name}".format({name:"name"})
        repFn = function(a, b) { return arg[b] ? arg[b] : a; };
    } else {
        // "{0}".format("name");
        var args = arguments;
        var argLen = args.length - 1;
        // {{0}} は {0} で出力させる。置き換えない
        str = str.replace(/(?!\{)*\{\{(\w+)\}\}/g, function(a) {
            args[++argLen] = a.replace("{{", "{").replace("}}", "}");
            var ret = "{" + argLen + "}";
            return ret;
        });
        repFn = function(a, b) { return args[ parseInt(b, 10) ]; };
    }
    
    return str.replace( /(?!\{)*\{(\w+)\}/g, repFn );
};

/**
 * Int型へと変換します
 * @returns {Number} 変換した値
 */
String.prototype.toInt = function() {
    return parseInt(this, 10);
};

/**
 * Float型へと変換します
 * @returns {Number} 変換した値
 */
String.prototype.toFloat = function() {
    return parseFloat(this);
};

/**
 * Int型へと変換します。変換できない場合は0を返します
 * @returns {Number} 変換した値。または0
 */
String.prototype.toIntOrZero = function() {
    return (isNaN(this)) ? 0 : this.toInt();
};

/**
 * Float型へと変換します。変換できない場合は0.0を返します
 * @returns {Number} 変換した値。または0.0
 */
String.prototype.toFloatOrZero = function() {
    return (isNaN(this)) ? 0.0 : this.toFloat();
};


(function(){
    var charCode = 0xFEE0;
    /**
     * 全角数字を半角数字へと変換します
     * @returns {string} 全角数字が半角数字へと変換した文字列
     */
    String.prototype.toHalfNumber = function() {
        return this.replace(/[０１２３４５６７８９]/g, function(a){
            return String.fromCharCode(a.charCodeAt(0) - charCode);
        }).replace(/\d+\．\d+/g, function(a) {
            return a.replace("．", ".");
        });
    };

    /**
     * 全角アルファベットを半角アルファベットへ変換します
     * @returns {string} 全角アルファベットを半角アルファベットへと変換した文字列
     */
    String.prototype.toHalfAlphabet = function() {
        return this.replace(/[Ａ-Ｚａ-ｚ]/g, function(s){
            return String.fromCharCode(s.charCodeAt(0) - charCode);
        });
    };
})();

/**
 * 全角文字を取り除いた文字列を返します
 * @returns {string} 全角文字を取り除いた文字列
 */
String.prototype.removeFullWidth = function() {
    return this.replace(/[^!-~]/g, "");
};


