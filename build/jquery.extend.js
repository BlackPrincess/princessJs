(function($){
    $.fn.extend({
        check : function() {
            this.each(function() {
                var elem = $(this).get(0);
                if(elem.checked !== null) {
                    elem.checked = true;
                }
            });
            return this;
        },
        uncheck : function() {
            this.each(function() {
                var elem = $(this).get(0);
                if(elem.checked !== null) {
                    elem.checked = false;
                }
            });
            return this;
        },
        checked : function() {
            var elem = this.get(0);
            if(elem.checked !== null) {
                return elem.checked;
            }
            return null;
        }
    });
})(jQuery);