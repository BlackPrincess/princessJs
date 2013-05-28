TestCase("TestStringExtension",{
    "test String.prototype.format": function(){
        var actual = "{0} is Foo.{1} is Bar".format("Foo", "Bar");
        assertString(actual);
        assertEquals("Foo is Foo.Bar is Bar", actual);
    },
	"test String.prototype.format {{0}}": function(){
		var actual = "{0} is Foo.{{0}} is Bar".format("Foo");
        assertString(actual);
        assertEquals("Foo is Foo.{0} is Bar", actual);
	},
	
	"test String.prototype.format arguments is object": function(){
		var actual = "{foo} is Foo.{bar} is Bar".format({foo:"Foo",bar:"Bar"});
        assertString(actual);
        assertEquals("Foo is Foo.Bar is Bar", actual);
	},
	
	"test String.prototype.format arguments is object(2)": function(){
		var actual = "{foo} is Foo.{bar} is Bar".format({foo:"Foo"});
        assertString(actual);
        assertEquals("Foo is Foo.{bar} is Bar", actual);
	},

	"test String.prototype.toHalfNumber" : function() {
		// TODO:JsTestDriverで実行できるように対応
		// var actual = "０．２".toNumberHalf();
		// assertString(actual);
		// assertEquals("0.2", actual);	// ブラウザ上の実行結果とテストの結果が違う…？
	},
	"test String.prototype.toHalfNumber (2)" : function() {
		// TODO:JsTestDriverで実行できるように対応
		// var actual = "私．さん".toNumberHalf();
		// assertString(actual);
		// assertEquals("私．さん", actual);	// ブラウザ上の実行結果とテストの結果が違う…？
	}
});