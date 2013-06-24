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
    var millis = '000' + this.getMilliseconds().toString();
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