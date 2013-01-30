TestCase("Test",{
    "test Color.toHexCode. black": function(){
        var result = new Color(0, 0, 0).toHexCode();
        assertString(result);
        assertEquals("000000", result);
    },

    "test Color.toHexCode. mixed color": function(){
        var result = new Color(0, 255, 15).toHexCode();
        assertString(result);
        assertEquals("00ff0f", result);
    },

    "test Color.toHexCode. white": function(){
        var result = new Color(255, 255, 255).toHexCode();
        assertString(result);
        assertEquals("ffffff", result);
    },

    "test Color.toCssHexCode": function(){
        var result = new Color(0, 0, 0).toCssHexCode();
        assertString(result);
        assertEquals("#000000", result);
    },

    "test Color.additiveBlend" : function(){
        var target = new Color(100,0,0);
        var addition = new Color(100,100,100);
        target.additiveBlend(addition);
        assertEquals({r:200,g:100,b:100},target.toRGB());
    },

    "test Color.additiveBlendColor" : function(){
        var target = new Color(100,0,0);
        var addition = new Color(100,100,100);
        var actual = target.additiveBlendColor(addition);
        assertEquals({r:200,g:100,b:100},actual.toRGB());
    },

    /* static */
    "test Color.toRGB. black": function(){
        var result = new Color(0, 0, 0).toRGB();
        assertEquals({r:0, g:0, b:0}, result);
    },

    "test Color.toRGB. mixed color": function(){
        var result = new Color(0, 255, 15).toRGB();
        assertEquals({r:0, g:255, b:15}, result);
    },

    "test Color.create": function(){
        var result = Color.create(0,255,15).toHexCode()
        assertEquals("00ff0f", result);
    },

    "test Color.createFromRGB": function(){
        var result = Color.createFromRGB({r:0,g:255,b:15}).toHexCode()
        assertEquals("00ff0f", result);
    },

    "test Color.createFromHexCode": function(){
        var result = Color.createFromHexCode("0f0f0f").toHexCode()
        assertEquals("0f0f0f", result);
    },

    "test Color.createFromHexCode. with sharp": function(){
        var result = Color.createFromHexCode("#0f0f0f").toHexCode()
        assertEquals("0f0f0f", result);
    },

    "test Color.getRGB " : function(){
        var result = Color.getRGB("00ff0f");
        assertEquals({r:0,g:255,b:15},result);
    },

    "test Color.getHexCode " : function(){
        var result = Color.getHexCode(0,255,15);
        assertString(result);
        assertEquals("00ff0f",result);
    },

    "test Color.getCssHexCode " : function(){
        var result = Color.getCssHexCode(0,255,15);
        assertString(result);
        assertEquals("#00ff0f",result);
    }
});