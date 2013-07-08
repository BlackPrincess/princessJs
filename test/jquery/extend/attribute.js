TestCase("Test jquery.attribute",{
    "test checked": function(){
		/*:DOC checkbox = <input type="checkbox"> */
		/*:DOC checkbox2 = <input type="checkbox" checked> */
		assertEquals(false, $(this.checkbox).checked());
		assertEquals(true, $(this.checkbox2).checked());
    },
	"test check": function(){
		/*:DOC checkbox = <input type="checkbox"> */
		$(this.checkbox).check();
		assertEquals(true, $(this.checkbox).checked());
    },
	"test uncheck": function(){
		/*:DOC checkbox = <input type="checkbox" checked> */
		$(this.checkbox).uncheck();
		assertEquals(false, $(this.checkbox).checked());
    },
	"test check all": function(){
		/*:DOC checkbox = <input type="checkbox"><input type="checkbox"> */
		$(this.checkbox).check();
		$(this.checkbox).each(function(){
			assertEquals(true, $(this).checked());
		});
    },
	"test uncheck all": function(){
		/*:DOC checkbox = <input type="checkbox" checked><input type="checkbox" checked> */
		$(this.checkbox).uncheck();
		$(this.checkbox).each(function(){
			assertEquals(false, $(this).checked());
		});
    },
});