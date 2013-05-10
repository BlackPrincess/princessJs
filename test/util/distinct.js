TestCase("Test util distinct",{
    "test util.distinct": function(){
		var target = [1,2,2,3,3,3,4,4,4,4]
        var actual = princessJs.util.distinct(target);
		assertEquals([1,2,3,4],actual);
    }
});