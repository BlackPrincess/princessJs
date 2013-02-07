TestCase("Test util memorizer",{
    "test util.memorizer arg1": function(){
		var counter = 0;
        var actual = princessJs.util.memorizer(function(a){
			++counter;
			return a + 1;
		});
		assertEquals(0, counter);
		actual(0);
        assertEquals(1, counter);
		actual(0);
        assertEquals(1, counter);
		actual(1);
        assertEquals(2, counter);
		actual();
        assertEquals(3, counter);
		actual();
        assertEquals(3, counter);
		actual(null);
        assertEquals(4, counter);
		actual(null);
        assertEquals(4, counter);
		var array = [1,2];
		actual(array);
        assertEquals(5, counter);
		actual(array);
        assertEquals(5, counter);
		var array2 = [1,2,3];
		actual(array2);
        assertEquals(6, counter);
    },
	"test util.memorizer arg2": function(){
		var counter = 0;
        var actual = princessJs.util.memorizer(function(a,b){
			++counter;
			return a + b;
		});
		assertEquals(0, counter);
		actual(0,0);
        assertEquals(1, counter);
		actual(0,0);
        assertEquals(1, counter);
		actual(0,1);
        assertEquals(2, counter);
		actual(1,0);
        assertEquals(3, counter);
    }
});