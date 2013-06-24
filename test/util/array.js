TestCase("Test util distinct",{
    "test util.distinct": function(){
        var target = [1,2,2,3,3,3,4,4,4,4];
        var actual = princessJs.util.distinct(target);
        assertEquals([1,2,3,4],actual);
    },
    "test util.distinctMaps": function(){
        var target = [{a:"1"}, {a:"2"}, {a:"2"}, {a:"3"}, {a:"3"}, {a:"3"}];
        var actual = princessJs.util.distinct(target);
        assertEquals([{a:"1"}, {a:"2"}, {a:"3"}], actual);
    },
    "test util.distinct types": function(){
        var target = [new String("1"), new String("2"), new String("3")];
        var actual = princessJs.util.distinct(target);
        assertEquals([new String("1"), new String("2"), new String("3")], actual);
        assertEquals(["1", "2", "3"], actual);
    },

    "test util.distinct type mixed": function(){
        var target = [0,"0",1,"1",true,false,{a:"a"}];
        var actual = princessJs.util.distinct(target);
        assertEquals([0,1,true,false,{a:"a"}], actual); // 添え字の問題上消え去る
    },
});