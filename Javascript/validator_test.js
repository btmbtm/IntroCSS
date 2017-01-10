var EXCEPTION = "EXCEPTION"
var EMPTYSTRING = "";

function testValidatorFunction(fcn, name, toTest) {
    document.write("<br><table><caption>Testing <i>" + name + "</i> function</caption><tr><th>Testing </th><th>Input</th><th> Expected</th><th>Output</th><th>Pass/Fail</th><tr>");
    var testingMessage, input, expected, output, passFail;

    for (var i = 0; i < toTest.length; i++) {
        testingMessage = toTest[i][0];
        input = toTest[i][1];
        expected = toTest[i][2];
        try {
            if (Array.isArray(input)) {
                output = fcn.apply(null, input);
            } else {
                output = fcn(input);
            }
        } catch (e) {
            output = EXCEPTION;
        }

        passFail = output === expected ? "pass" : "fail";

        output = output === EMPTYSTRING ? "EMPTY STRING" : output;
        input = input === EMPTYSTRING ? "EMPTY STRING" : (input + " (" + typeof input + ")");
        expected = expected === EMPTYSTRING ? "EMPTY STRING" : expected;
        document.write("<tr><td>" + testingMessage + "<td class='input'><pre> " + input + "</pre> </td><td><i>" + expected + "</i></td><td><i>" + output + "</i> </td> <td><div class='indicator " + passFail + "'></div></td></tr>");
    }

    document.write("</table>")
}

testValidatorFunction(validator.isEmailAddress, "(1) isEmailAddress", [
    ["Invalid input type: number", 123, EXCEPTION],
    ["Empty input: empty string", "", EXCEPTION],
    ["Valid email", "lala@la.com", true],
    ["Valid email", "3ads2@wow.com", true],
    ["Broken email(only back half of email)", "@la.com", false],
    ["Broken email: only front half of email", "lala@", false],
    ["Broken email: only @ symbol", "@", false],
    ["Broken email: too many @ symbols", "lalal@alalla@lalala.com", false],
    ["Broken email:too many top level domains", "fail@email.com.place", false]
]);



testValidatorFunction(validator.isPhoneNumber, "(2) isPhoneNumber", [
    ["Invalid input type: null", null, EXCEPTION],
    ["Empty input: empty string", EMPTYSTRING, EXCEPTION],
    ["Invalid input type: Number Object", Number, EXCEPTION],
    ["Number", 1245678901, EXCEPTION],
    ["Valid Us phone number", "1245678901", true],
    ["Valid US phone number", "123-456-7890", true],
    ["Valid US phone number", "(123)-456-7890", true],
    ["Broken phone number: Not enough digits", "(123)", false],
    ["Broken phone number: Letters", "(123)-456-dsaa", false]
]);

testValidatorFunction(validator.withoutSymbols, "(3) withoutSymbols", [
    ["Empty input: empty string", EMPTYSTRING, EXCEPTION],
    ["Invalid input type: number", 123, EXCEPTION],
    ["Valid string w/ mix of symbols, letters", "Hi, john.doe@live.com., is that you?/", "Hi johndoelivecom is that you"],
    ["Valid string w/ all symbols", "@#$#@$$@#$#@$#@$#@$#@%$^%&^#^%~", EMPTYSTRING],
    ["Valid string w/ many symbols, few letters", "@#$#@$$@#$#@$A@$#@$#@%$b%&^#^%~", "Ab"],
    ["Valid string w/o symbols", "wow12", "wow12"]

]);

testValidatorFunction(validator.isDate, "(4) isDate", [
    ["Invalid date string: garbage", "#$@", false],
    ["Invalid date string: word", "today", false],
    ["Valid date: date string", "2015", true],
    ["Valid date: date string", "03/25/2015", true],
    ["Valid date: date string", "2015-03", true],
    ["Valid date: date object", new Date("2016"), true],
]);

testValidatorFunction(validator.isBeforeDate, "(5) isBeforeDate", [
    ["Input date after reference", [new Date(), new Date("2015")], false],
    ["Input date before reference", [new Date(), new Date("2017")], true],
    ["Input date after reference", [new Date("2000"), new Date("1999")], false],
    ["Mixed input: String and date object", ["2000", new Date("1999")], false],
    ["String input only", ["2000", "1999"], false]
]);

testValidatorFunction(validator.isAfterDate, "(6) isAfterDate", [
    ["Invalid input: number", [213, new Date("2015")], EXCEPTION],
    ["Invalid input: missing parameter", [new Date("2015")], EXCEPTION],
    ["Input date after reference", [new Date(), new Date("2015")], true],
    [
        "Input date before reference", ["2015-03", new Date("2017")], false
    ],
    [
        "Input date after reference", [new Date("2000"), new Date("1999")], true
    ],
    ["Mixed input: String and date object", ["2000", new Date("1999")], true],
    ["String input only", ["2000", "1999"], true]

]);


testValidatorFunction(validator.isBeforeToday, "(7) isBeforeToday", [
    ["Invalid input: empty string", "", EXCEPTION],
    ["Date before today", "March 2016", true],
    ["Date before today", new Date("2012"), true],
    ["Date after today", new Date("2323"), false],
    ["Date after today (string input)", "2323", false]
]);

testValidatorFunction(validator.isAfterToday, "(8) isAfterToday", [
    ["Invalid input: empty string", "", EXCEPTION],
    ["Date before today", "March 2016", true],
    ["Date before today", new Date("2012"), false],
    ["Date after today", new Date("2323"), true]
]);

testValidatorFunction(validator.isEmpty, "(9) isEmpty", [
    ["Invalid input: null", null, EXCEPTION],
    ["Invalid input: number", 1, EXCEPTION],
    ["Empty string", "   ", true],
    ["Empty string", "", true],
    ["Valid string", "a", false]
]);

testValidatorFunction(validator.contains, "(10) contains", [
    ["Invalid input type: words parameter not an array", ["Visiting new places is fun.", "places"], EXCEPTION],
    ["Invalid input type: string parameter a number", [2, ["places"]], EXCEPTION],
    ["Invalid input type: words array contains numbers", [2, [2, 3, 4]], EXCEPTION],
    ["String contains all words", ['"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"]], true],
    ["String contains all words even with different case", ['"Definitely," he said in a matter-of-fact tone.', ["matter", "deFInitely"]], true],
    ["String contains no words", ['"Definitely," he said in a matter-of-fact tone.', ["hat", "WOW"]], false]
]);

testValidatorFunction(validator.lacks, "(11) lacks", [
    ["Invalid input type: words parameter not an array", ["Visiting new places is fun.", "places"], EXCEPTION],
    ["Invalid input type: string parameter a number", [2, ["places"]], EXCEPTION],
    ["Invalid input type: words array contains numbers", [2, [2, 3, 4]], EXCEPTION],
    [
        "String does not contain any words", ["Visiting new places is fun.", ["coconut"]], true
    ],
    [
        "String does not contain any words", ["Visiting new places is fun.", ["aces"]], true
    ],
    [
        "String contains a word", ["Visiting new places is fun.", ["places"]], false
    ],
    [
        "String contains multiple words (mixed case)", ['"Definitely," he said in a matter-of-fact tone.', ["mAtter", "definiTEly"]], false
    ]
]);


testValidatorFunction(validator.isComposedOf, "(12) isComposedOf", [
    ["Invalid input type: words parameter not an array", ["Visiting new places is fun.", "places"], EXCEPTION],
    ["Invalid input type: string parameter a number", [2, ["places"]], EXCEPTION],
    ["Invalid input type: words array contains numbers", [2, [2, 3, 4]], EXCEPTION],
    ["Is composed of strings", ["wow", ["w", "OW"]], true],
    [
        "Is not composed of string", ["ImamnotreadyEDDY.", ["I", "I'm", "am", "not", "ready"]], false
    ],
    [
        "Is composed of strings", ['Iamnotready.IIIIIIIII', ['I', 'am', 'not', 'ready']], true
    ],
    [
        "Is not composed of strings", ["10184", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]], true
    ]
])

testValidatorFunction(validator.isLength, "(13) isLength", [
    ["Invalid input type: word is number", [4, 4], EXCEPTION ],
    ["Invalid input type: n is string", ["wow", "CAT"], EXCEPTION ],
    ["A string shorter than length", ["wow", 4], true ],
    ["A string equal to length", ["wow", 3], true],
    [
        "A string longer than length", ["FDFADSFADSFADFDGFASGDFASGDAFDSGAS", 5], false
    ]
]);

testValidatorFunction(validator.isOfLength, "(14) isOfLength", [
    ["Invalid input type: word is number", [4, 4], EXCEPTION ],
    ["Invalid input type: n is string", ["wow", "CAT"], EXCEPTION ],
    ["A string shorter than length", ["wow", 4], false ],
    ["A string equal to length", ["wow", 3], true],
    [
        "A string longer than length", ["FDFADSFADSFADFDGFASGDFASGDAFDSGAS", 5], true
    ]
    
]);


testValidatorFunction(validator.countWords, "(15) countWords", [
    ["Invalid input: a number", 5, EXCEPTION],
    ["A string with 5 words", "Visiting new places is fun.", 5],
    ["A string with 5 words separated by dashes", "Hard-to-type-really-fast!", 5],
    ["An empty string","", 0],
    ["Character groups don't count as words","#$@#$@# a @#$@#$#@", 1],
    ["Character groups don't count as words","#$@#$fds@# a @#$@#$#@", 2],
    ["A long single word", "supercalifragilisticexpialidocious", 1]
]);


testValidatorFunction(validator.lessWordsThan, "(16) lessWordsThan", [
    [        "Invalid input: number for strings", [5, 7], EXCEPTION  ],
    [        "Invalid input: missing parameter", [ 7], EXCEPTION  ],
    [        "Invalid input: NaN for wordCount", ["Visiting new places is fun.", "WAH"], EXCEPTION   ],
    [        "Word count match", ["Visiting new places is fun.", 5], true   ],
    [        "Word count less than string words", ["Visiting new places is fun.", 6], true ],
    [        "Empty string has 0 words?", ["", 1], true   ],
]);

testValidatorFunction(validator.moreWordsThan, "(17) moreWordsThan", [
    [        "Invalid input: number for strings", [5, 7], EXCEPTION  ],
    [        "Invalid input: NaN for wordCount", ["Visiting new places is fun.", "WAH"], EXCEPTION   ],
     [        "Invalid input: missing parameter", [ 7], EXCEPTION  ],
    [        "Word count match", ["Visiting new places is fun.", 5], true  ],
    [        "Word count less than string words", ["Visiting new places is fun.", 6], false ],
    [        "Empty string has 0 words?", ["", 1], false   ],
]);

testValidatorFunction(validator.isBetween, "(18) isBetween", [
    [ "Valid input: number inbetween",[2, 1, 100], true ],
    [
        "Valid input: number not inbetween",[2, 3, 4], false
    ],
    [
        "Valid input: number not inbetween",[-5, 0, 300], false
    ]
]);

testValidatorFunction(validator.isAlphanumeric, "(19) isAlphanumeric", [
    ["Valid input: not Alphanumeric, has space","wow space", false],
    ["Valid input: Alphanumeric","wowNoSpace", true],
    ["Valid input: Alphanumeric","DSAFDFDSAF342354356afddavadsfDAFDSFDAvfa32432", true],
    ["Valid input: almost Alphanumeric","DSAFDF_SAF342354356afddavadsfDAFDSFDAvfa32432", false],
    ["Valid input: not Alphanumeric","342DFDS@#", false]
]);

testValidatorFunction(validator.isCreditCard, "(20) isCreditCard", [
    ["Valid input: CC#","1234567891011121", true],
    ["Valid input: Too short","123456789101112", false],
    ["Valid input: CC# w/ Dashes","123b-5678-9101-1121", true],
    ["Valid input: Empty","testcard", false]
]);

testValidatorFunction(validator.isHex, "(21) isHex", [
    ["Long hex number, but not hex color","#432ABCFFF2", false],
    ["6 digit hex number","#432ABC", true],
    ["Not HEX digit (G)","#432ABG", false],
    ["CC Number","123b-5678-9101-1121", false],
    ["Use non-hex digits","#54K", false],
    ["Use non-hex digits","#93L", false],
    ["Valid","#ABC", true],
    ["Not a string!",999, EXCEPTION]
]);

testValidatorFunction(validator.isRGB, "(22) isRGB", [
    ["Valid RGB","rgb(21,32,34)", true],
    ["Invalid RGB string","rgb(,,)", false],
    ["Invalid RGB string","rgb(21000,32,34)", false],
    ["Invalid RGB","rgb(21,32,340)", false],
    ["Invalid RGB string","rgb(21,32,34", false],
    ["Invalid RGB string","bgb(21,32,34)", false],
    ["Invalid RGB string","rgbff(21,32,34)", false],
    ["Invalid RGB string","rgb(21,32,34", false],
    ["Invalid RGB string","rgb(21,#$@#@         ,22)", false]
]);

testValidatorFunction(validator.isHSL, "(23) isHSL", [
    ["Valid HSL","hsl(21, .55,0.66)", true],
    ["Invalid HSL string","hsl(21, 1.55,0.66)", false],
    ["Invalid HSL string","hsl(21, .55,1.66)", false],
    ["Invalid HSL string","hsl(-5, .55,1.66)", false],
    ["Invalid HSL string","hsl(21,32,34)", false],
    ["Valid HSL w/ extra spacing","hsl(21,.00001         ,1)", true]
]);


testValidatorFunction(validator.isColor, "(24) isColor", [
    ["Valid HSL","hsl(21, .55,0.66)", true],
    ["VALID RGB","rgb(21,32,34)", true],
    ["INVALID RGB","rgb(21,320,34)", false],
    ["VALID RGB","rgb(21,255,34)", true],
    ["VALID HEX","#F84", true],
    ["JUNK","#F84FDSAFSD", false],
    ["JUNK","DSADSADSADSA", false]
]);


testValidatorFunction(validator.isTrimmed, "(25) isTrimmed", [
    ["NOT TRIMMED","     hsl(21, .55,0.66)", false],
    ["TRIMMED","rgb(21,32,34)", true],
    ["TRIMMED","#F84", true],
    ["","", EXCEPTION],
    ["NOT TRIMMED"," A SINGLE SPACE", false]
]);
