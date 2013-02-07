TestCase("Test util curry",{
	"test util.curry 1" : function() {
		var target = princessJs.util.curry(function(){
			return 0;
		});
		
		var actual = target();
		assertEquals(0,actual);
	},
	"test util.curry 2" : function() {
		var target = princessJs.util.curry(function(a){
			return a;
		});
		var actual = target(1);
		assertEquals(1,actual);
	},
	"test util.curry 3"  : function() {
		var target = princessJs.util.curry(function(a,b,c,d){
			return a + b + c + d;
		});
		var f1 = target(1);
		assertFunction(f1);
		var f2 = target(1)(1);
		assertFunction(f2);
		var actual = target(1)(2)(3)(4);
		assertNumber(actual);
		assertEquals(10,actual);
	}
});