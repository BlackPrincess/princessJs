TestCase("Test util escape",{
    "test util.escape": function(){
        var actual = princessJs.util.escape("<text>\"&lt;\"");
		assertEquals("&lt;text&gt;&quot;&lt;&quot;",actual);
    }
});