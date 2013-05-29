TestCase("Test jquery.input-support",{

    "test input[data-type=number]": function(){
		/*:DOC input = <input id="test" type="text" data-type="number"> */
		$(this.input).inputSupport();
		$(this.input).val("a");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("", actual);
		
		$(this.input).val("0123");	// TODO:全角でテスト
		$(this.input).trigger("blur");
        var actual2 = $(this.input).val();
		assertEquals("0123", actual2);
    },
	
	"test input[data-type=integer]": function(){
		/*:DOC input = <input id="test" type="text" data-type="integer"> */
		$(this.input).inputSupport();
		
		$(this.input).val("a");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("", actual);
		
		$(this.input).val("0123.22");	// TODO:全角でテスト
		$(this.input).trigger("blur");
        var actual2 = $(this.input).val();
		assertEquals("123", actual2);
    },
	
	"test input[data-type=float]": function(){
		/*:DOC input = <input id="test" type="text" data-type="float"> */
		$(this.input).inputSupport();
		
		$(this.input).val("a");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("", actual);
		
		$(this.input).val("0123.223");	// TODO:全角でテスト
		$(this.input).trigger("blur");
        var actual2 = $(this.input).val();
		assertEquals("123.22", actual2);
    },
	"test input[data-type=float](2)": function(){
		/*:DOC input = <input id="test" type="text" data-type="float" data-float-digit="3"> */
		$(this.input).inputSupport();

		$(this.input).val("0123.2234");	// TODO:全角でテスト
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("123.223", actual);
    },
	
	"test input[data-type=date]": function(){
		/*:DOC input = <input id="test" type="text" data-type="date" data-date-format="yyyy/MM/dd"> */
		$(this.input).inputSupport();

		$(this.input).val("2013-01-03");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("2013/01/03", actual);
		
		$(this.input).val("a");
		$(this.input).trigger("blur");
        var actual2 = $(this.input).val();
		assertEquals("", actual2);
    },
	"test input[data-type=date](2)": function(){
		/*:DOC input = <input id="test" type="text" data-type="date" data-date-format="" > */
		$(this.input).inputSupport();

		$(this.input).val("2013/01/03");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("2013-01-03", actual);
    },
	"test input[data-type=date](3)": function(){
		/*:DOC input = <input id="test" type="text" data-type="date"> */
		$(this.input).inputSupport();

		$(this.input).val("2013/1/3");
		$(this.input).trigger("blur");
        var actual = $(this.input).val();
		assertEquals("2013-01-03", actual);
    },
});