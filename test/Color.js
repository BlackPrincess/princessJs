TestCase("Test Color",{
    "test Color.toHexCode. black": function(){
        var result = new princessJs.Color(0, 0, 0).toHexCode();
        assertString(result);
        assertEquals("000000", result);
    },

    "test Color.toHexCode. mixed color": function(){
        var result = new princessJs.Color(0, 255, 15).toHexCode();
        assertString(result);
        assertEquals("00ff0f", result);
    },

    "test Color.toHexCode. white": function(){
        var result = new princessJs.Color(255, 255, 255).toHexCode();
        assertString(result);
        assertEquals("ffffff", result);
    },

    "test Color.toCssHexCode": function(){
        var result = new princessJs.Color(0, 0, 0).toCssHexCode();
        assertString(result);
        assertEquals("#000000", result);
    },

    "test Color.additiveBlend" : function(){
        var target = new princessJs.Color(100,0,0);
        var addition = new princessJs.Color(100,100,100);
        target.additiveBlend(addition);
        assertEquals({r:200,g:100,b:100},target.toRGB());
    },

    "test Color.additiveBlendColor" : function(){
        var target = new princessJs.Color(100,0,0);
        var addition = new princessJs.Color(100,100,100);
        var actual = target.createAdditiveBlendedColor(addition);
        assertEquals({r:200,g:100,b:100},actual.toRGB());
    },
	
	"test Color.toHSV" : function(){
        var actual1 = new princessJs.Color(255,255,255);
        assertEquals({h:0, s:0, v:255},actual1.toHSV());
		var actual2 = new princessJs.Color(0,0,0);
        assertEquals({h:0, s:0, v:0},actual2.toHSV());
		var actual3 = new princessJs.Color(200,100,50);
        assertEquals({h:20, s:191, v:200},actual3.toHSV());
    },


    /* static */
    "test Color.toRGB. black": function(){
        var result = new princessJs.Color(0, 0, 0).toRGB();
        assertEquals({r:0, g:0, b:0}, result);
    },

    "test Color.toRGB. mixed color": function(){
        var result = new princessJs.Color(0, 255, 15).toRGB();
        assertEquals({r:0, g:255, b:15}, result);
    },

    "test Color.create": function(){
        var result = princessJs.Color.create(0,255,15).toHexCode()
        assertEquals("00ff0f", result);
    },

    "test Color.createFromRGB": function(){
        var result = princessJs.Color.createFromRGB({r:0,g:255,b:15}).toHexCode()
        assertEquals("00ff0f", result);
    },

    "test Color.createFromHexCode": function(){
        var result = princessJs.Color.createFromHexCode("0f0f0f").toHexCode()
        assertEquals("0f0f0f", result);
    },

    "test Color.createFromHexCode. with sharp": function(){
        var result = princessJs.Color.createFromHexCode("#0f0f0f").toHexCode()
        assertEquals("0f0f0f", result);
    },

    "test Color.getRGB " : function(){
        var result = princessJs.Color.getRGB("00ff0f");
        assertEquals({r:0,g:255,b:15},result);
    },

    "test Color.getHexCode " : function(){
        var result = princessJs.Color.getHexCode(0,255,15);
        assertString(result);
        assertEquals("00ff0f",result);
    },

    "test Color.getCssHexCode " : function(){
        var result = princessJs.Color.getCssHexCode(0,255,15);
        assertString(result);
        assertEquals("#00ff0f",result);
    },
	
	"test Color.getHue" : function(){
		var actual0 = princessJs.Color.getHue(255,255,255);
		assertEquals(0,actual0);
		var actual1 = princessJs.Color.getHue(255,255,254);
		assertEquals(60,actual1);
		var actual2 = princessJs.Color.getHue(255,254,255);
		assertEquals(300,actual2);
		var actual3 = princessJs.Color.getHue(254,255,255);
		assertEquals(180,actual3);
		var actual4 = princessJs.Color.getHue(254,255,253);
		assertEquals(90,actual4);
		var actual5 = princessJs.Color.getHue(254,253,255);
		assertEquals(270,actual5);
		var actual6 = princessJs.Color.getHue(253,254,255);
		assertEquals(210,actual6);
	},
	
	"test Color.getRGBColorValue" : function() {
		var actual0 = princessJs.Color.getRGBColorValue(256);
		var actual1 = princessJs.Color.getRGBColorValue(-1);
		var actual2 = princessJs.Color.getRGBColorValue(254);
		assertEquals(255,actual0);
		assertEquals(0,actual1);
		assertEquals(254,actual2);
	},
	"test Color.getRGBFromHSV": function() {
		var actual0 = princessJs.Color.getRGBFromHSV(359,0,255);
		assertEquals({r:255,g:255,b:255},actual0);
		var actual1 = princessJs.Color.getRGBFromHSV(0,1,255);
		assertEquals({r:255,g:254,b:254},actual1);
		var actual2 = princessJs.Color.getRGBFromHSV(0,255,255);
		assertEquals({r:255,g:0,b:0},actual2);
		var actual3 = princessJs.Color.getRGBFromHSV(60,255,255);
		assertEquals({r:255,g:255,b:0},actual3);
		var actual4 = princessJs.Color.getRGBFromHSV(120,255,255);
		assertEquals({r:0,g:255,b:0},actual4);
		var actual5 = princessJs.Color.getRGBFromHSV(180,255,255);
		assertEquals({r:0,g:255,b:255},actual5);
		var actual6 = princessJs.Color.getRGBFromHSV(240,255,255);
		assertEquals({r:0,g:0,b:255},actual6);
		var actual6 = princessJs.Color.getRGBFromHSV(300,255,255);
		assertEquals({r:255,g:0,b:255},actual6);
	},
	"test RGB -> HSV -> RGB": function() {
		function testcase(rgb){
			var hsv = princessJs.Color.getHSVFromRGB(rgb.r,rgb.g,rgb.b);
			var actual = princessJs.Color.getRGBFromHSV(hsv.h,hsv.s,hsv.v);
			assertEquals(rgb,actual);
		}
		testcase({r:100,g:100,b:100});
		testcase({r:200,g:200,b:200});
		testcase({r:254,g:254,b:254});
		testcase({r:128,g:128,b:128});
	},
	"test HSV -> RGB -> HSV": function() {
		//　これ戻るの無理だけど。
		function testcase(hsv){
			var rgb = princessJs.Color.getRGBFromHSV(hsv.h,hsv.s,hsv.v);
			var actual = princessJs.Color.getHSVFromRGB(rgb.r,rgb.g,rgb.b);
			assertEquals(hsv,actual);
		}
		testcase({h:0,s:0,v:0});
		testcase({h:60,s:60,v:60});
	},
});