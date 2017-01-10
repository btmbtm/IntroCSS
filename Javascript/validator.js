function isUpperCaseLetter(char) {
    var charCode = char.charCodeAt(0);
    return charCode >= 65 && charCode <= 90;
}

function isLowerCaseLetter(char) {
    var charCode = char.charCodeAt(0);
    return charCode >= 97 && charCode <= 122;
}

function isDigit(char) {
    var charCode = char.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
}

function isAlphanumericChar(char) {
    var currChar = char.charAt(0);
    return isLowerCaseLetter(currChar) || isUpperCaseLetter(currChar) || isDigit(currChar);
}

//returns string with only alphaNumeric and spaces
function cleanString(input) {
    var currChar;
    var output = "";

    //replace non-alphaNumeric/space characters w/ spaces
    for (var i = 0; i < input.length; i++) {
        currChar = input.charAt(i);

        if (isLowerCaseLetter(currChar) || isUpperCaseLetter(currChar) || isDigit(currChar) || currChar === " ") {
            output += currChar;
        } else {
            output += " ";
        }
    }

    return removeWhiteSpaceGroups(output);
}

//removes whitespace groups
function removeWhiteSpaceGroups(input) {
    input = input.trim();
    var cleaned = input.charAt(0);
    for (var i = 1; i < input.length; i++) {
        if (input.charAt(i) === " " && input.charAt(i - 1) === " ") {
            continue;
        } else {
            cleaned += input.charAt(i);
        }
    }
    return cleaned;
}

function removeWhiteSpace(string) {
    var output = "";
    for (var i = 0; i < string.length; i++) {
        output += (string.charAt(i) === " ") ? "" : string.charAt(i);
    }
    return output;
}

function hasWhiteSpace(string) {
    var output = "";
    for (var i = 0; i < string.length; i++) {
        if (string.charAt(i) === " ")
            return true;
    }
    return false;
}



var validator = {};

validator.isOnlyDigits = function(input){
    for (var i = 0; i < input.length; i++) {
        if (!(isDigit(input.charAt(i)))){
            return false;

        }
    }
    return true;
}

//1 isEmailAddress
validator.isEmailAddress = function(input) {

    if (!input) throw "Missing Parameter in isEmailAddress function: 'email'.";
    if (input !== input + "")
        throw "Parameter passed to isEmailAddress function is not a string: 'input'. It is a " + typeof input + ".";
    //check if input is string
    if (input + "" !== input) return false;

    //check if input is empty
    if (input === "") return false;

    input = input.trim();

    if (hasWhiteSpace(input)) {

        return false;
    }

    //check if email is min length "a@b.c"
    if (input.length < 4) return false;

    //check if @ symbol exists
    if (input.indexOf("@") < 0) return false;

    //check if @ symbol is at end or beginning of string
    if (input.indexOf("@") === 0 || input.indexOf("@") === input.length - 1) return false;

    //check if more than one "@"
    var splitEmail = input.split("@");
    if (splitEmail.length != 2) {

        return false;
    }

    //check if there is tld after @ .something
    var afterAt = splitEmail[1];
    if (afterAt.indexOf(".") < 0 || afterAt.indexOf(".") === afterAt.length - 1) {
        return false;
    }
    var splitAfterAt = afterAt.split(".");
    if (splitAfterAt.length != 2) return false;


    return true;
};

//2 isPhoneNumber 
validator.isPhoneNumber = function(phoneNumber) {
    if (!phoneNumber) throw "Missing Parameter in isPhoneNumber function: 'phoneNumber'.";
    if (phoneNumber !== phoneNumber + "")
        throw new TypeError("validator.withoutSymbols input parameter 'phoneNumber' must be a String, not a " + typeof input, "validator.js");

    phoneNumber = removeWhiteSpace(phoneNumber + "");
    var len = phoneNumber.length;
    if (len !== 10 && len !== 12 && len !== 14) {
        return false;
    }

    var nums = "0123456789";
    var dash = "-";
    var openParen = "(";
    var closeParen = ")";
    if (len === 10) {
        for (var i = 0; i < 10; i++) {
            if (!isDigit(phoneNumber.charAt(i))) return false;
        }

        return true;

    } else if (len === 12 || len === 14) {
        var numSets = phoneNumber.split("-");

        if (numSets.length != 3) return false;


        if (len === 14) {
            if (numSets[0].charAt(0) !== "(" && numSets[0].chartAt(4) !== ")")
                return false;
            numSets[0] = numSets[0].substring(1, 4);

        }

        var withOutDashesParens = numSets.join("");
        for (var i = 0; i < withOutDashesParens.length; i++) {
            if (nums.indexOf(withOutDashesParens[i]) < 0) return false;
        }
        return true;
    }


};

//3 withoutSymbols
validator.withoutSymbols = function(input) {

    if (!input)
        throw "Missing Parameter in withoutSymbols function: 'input'.";
    if (input !== input + "")
        throw new TypeError("validator.withoutSymbols input must be a String, not a " + typeof input, "validator.js");

    var currChar;
    var output = "";

    for (var i = 0; i < input.length; i++) {
        currChar = input.charAt(i);

        if (isLowerCaseLetter(currChar) || isUpperCaseLetter(currChar) || isDigit(currChar) || currChar == " ") {
            output = output + currChar;
        }
    }
    return output;
};


//4 isDate
validator.isDate = function(input) {

    if (!input) throw "Missing Parameter in isDate function: 'input'.";
    if (!(input instanceof Date) && input !== input + "") throw new TypeError("validator.isDate input must be a String or Date, not a " + typeof input, "validator.js");

    if (input instanceof Date && !Number.isInteger(input.getDate())) {
        throw "Date must be valid";
    }

    var date = new Date(input.toString());
    return Number.isInteger(date.getDate());
};

//5 isBeforeDate
validator.isBeforeDate = function(input, reference) {
    if (!input)
        throw "Missing Parameter in isBeforeDate function: 'input'.";

    if (!reference)
        throw "Missing Parameter in isBeforeDate function: 'reference'.";

    if (!validator.isDate(input)) throw "Input Parameter in isBeforeDate function is not a valid date";

    if (!validator.isDate(reference)) throw "Reference Parameter in isBeforeDate function is not a valid date";

    return new Date(input) < new Date(reference);
};

//6 isAfterDate
validator.isAfterDate = function(input, reference) {

    if (!input)
        throw "Missing Parameter in isAfterDate function: 'input'.";

    if (!reference)
        throw "Missing Parameter in isAfterDate function: 'reference'.";

    if (!validator.isDate(input)) throw "Input Parameter in isBeforeDate function is not a valid date";

    if (!validator.isDate(reference)) throw "Reference Parameter in isBeforeDate function is not a valid date";

    return new Date(input) > new Date(reference);
};

//7 isBeforeToday
validator.isBeforeToday = function(input) {
    if (!input)
        throw "Missing Parameter in isBeforeToday function: 'input'.";

    if (!validator.isDate(input)) throw "Input Parameter in isBeforeDate function is not a valid date";

    return new Date(input) < new Date();
};

//8 isAfterToday
validator.isAfterToday = function(input) {
    if (!input)
        throw "Missing Parameter in isAfterToday function: 'input'.";

    if (!validator.isDate(input)) throw "Input Parameter in isBeforeDate function is not a valid date";

    return new Date(input) > new Date();
};

// EXTRA

validator.isThirteenYearsOld = function(birthday) {

    if (!birthday)
        throw "Missing Parameter in isThirteenYearsOld function: 'birthday'.";

    if (!validator.isDate(birthday)) throw "birthday Parameter in isThirteenYearsOld function is not a valid date";

    var thirteenYearsAgoYear = new Date().getFullYear() - 13;
    var thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgoYear);
    return birthday < thirteenYearsAgo;
};

//9 isEmpty
validator.isEmpty = function(input) {
    if (input !== "" && !input)
        throw "Missing Parameter in isEmpty function: 'input'.";

    if (input !== input + "")
        throw new TypeError("validator.isEmpty parameter 'input' must be a String, not a " + typeof input, "validator.js");

    return input.trim() === "";
};

//10 contains
validator.contains = function(input, words) {

    if (!input)
        throw "Missing Parameter in isAfterToday function: 'input'.";

    if (!words)
        throw "Missing Parameter in isAfterToday function: 'input'.";

    if (input !== input + "")
        throw new TypeError("validator.contains parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (!Array.isArray(words))
        throw new TypeError("validator.contains parameter 'words' must be an Array, not a " + typeof input, "validator.js");

    for (var i = 0; i < words.length; i++) {
        if (words[i] !== words[i] + "")
            throw new TypeError("validator.contains 'words' array must only be of type string,", "validator.js");
    }
    var cleanedString = cleanString(input).trim();
    var splitString = cleanedString.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (splitString.indexOf(words[i].toLowerCase()) < 0) {
            return false;
        }
    }
    return true;
};

// 11 lacks
validator.lacks = function(input, words) {
    if (!input)
        throw "Missing Parameter in lacks function: 'input'.";

    if (!words)
        throw "Missing Parameter in lacks function: 'input'.";

    if (input !== input + "")
        throw new TypeError("validator.lacks parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (!Array.isArray(words))
        throw new TypeError("validator.lacks parameter 'words' must be an Array, not a " + typeof input, "validator.js");

    for (var i = 0; i < words.length; i++) {
        if (words[i] !== words[i] + "")
            throw new TypeError("validator.isEmpty array 'input' must only be of type string,", "validator.js");
    }

    var cleanedString = cleanString(input);
    var splitString = cleanedString.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (splitString.indexOf(words[i].toLowerCase()) >= 0) {
            return false;
        }
    }
    return true;
};


//12 isComposedOf
validator.isComposedOf = function(input, strings) {
    if (!input)
        throw "Missing Parameter in validator.isComposedOf  function: 'input'.";

    if (!strings)
        throw "Missing Parameter in validator.isComposedOf  function: 'strings'.";

    if (input !== input + "")
        throw new TypeError("validator.lacks parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (!Array.isArray(strings))
        throw new TypeError("validator.isComposedOf parameter 'words' must be an Array, not a " + typeof input, "validator.js");

    for (var i = 0; i < strings.length; i++) {
        if (strings[i] !== strings[i] + "")
            throw new TypeError("validator.isComposedOf array 'input' must only be of type string,", "validator.js");
    }

    //clean input string "THIS#@$IS# .  A MESS" -> "thisisamess"
    input = validator.withoutSymbols(input.toLowerCase());
    input = removeWhiteSpace(input);

    //clean input array ["I'm", "aWESOME", "@t", "CODING"] -> ["im", "awesome", "t", "coding"]
    var lowerCaseStrings = strings.map(function(val) {
        val = validator.withoutSymbols(val.toLowerCase());
        return removeWhiteSpace(val);
    });

    //run clean input on helper array
    return isComposedOfHelper(input, lowerCaseStrings);
};

function isComposedOfHelper(input, strings) {
    if (input === "") return true;
    for (var i = 0; i < strings.length; i++) {
        //if
        if (input.startsWith(strings[i])) {
            if (isComposedOfHelper(input.substring(strings[i].length), strings))
                return true;
        }
    }
    return false;
}


//13 isLength
validator.isLength = function(input, n) {
    if (!input)
        throw "Missing Parameter in validator.isLength  function: 'input'.";
    if (!n)
        throw "Missing Parameter in validator.isLength function: 'n'.";

    if (input !== input + "")
        throw new TypeError("validator.isLength  parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (isNaN(n))
        throw new TypeError("validator.isLength  parameter 'input' must be a number, not a " + typeof input, "validator.js");


    return input.length <= n;
};

validator.isOnlyLength = function(input, n) {
    if (!input)
        throw "Missing Parameter in validator.isOnlyLength  function: 'input'.";
    if (!n)
        throw "Missing Parameter in validator.isOnlyLength function: 'n'.";

    if (input !== input + "")
        throw new TypeError("validator.isOnlyLength  parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (isNaN(n))
        throw new TypeError("validator.isOnlyLength  parameter 'input' must be a number, not a " + typeof input, "validator.js");


    return input.length === n;
};

//14 isOfLength
validator.isOfLength = function(input, n) {

    if (!input)
        throw "Missing Parameter in validator.isOfLength  function: 'input'.";
    if (!n)
        throw "Missing Parameter in validator.isOfLength function: 'n'.";

    if (input !== input + "")
        throw new TypeError("validator.isOfLength  parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (isNaN(n))
        throw new TypeError("validator.isOfLength  parameter 'input' must be a number, not a " + typeof input, "validator.js");

    return input.length >= n;
};

validator.isLengthRange = function(input, low, high) {
    return input.length >= low && input.length <= high;
};
//15 countWords
validator.countWords = function(input) {
    if (!input && input !== "")
        throw "Missing Parameter in validator.countWords function: 'input'.";


    if (input !== input + "")
        throw new TypeError("validator.countWords parameter 'input' must be a String, not a " + typeof input, "validator.js");


    if (input === "") return 0;

    //remove symbols and reduce whitespace groups
    var cleanedString = cleanString(input);
    return cleanedString.split(" ").length;
};

// 16 lessWordsThan
validator.lessWordsThan = function(input, n) {
    if (!input && input !== "")
        throw "Missing Parameter in validator.isOfLength  function: 'input'.";
    if (!n)
        throw "Missing Parameter in validator.isOfLength function: 'n'.";

    if (input !== input + "")
        throw new TypeError("validator.isOfLength  parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (isNaN(n))
        throw new TypeError("validator.isOfLength  parameter 'input' must be a number, not a " + typeof input, "validator.js");
    return validator.countWords(input) <= n;
};

//17 moreWordsThan
validator.moreWordsThan = function(input, n) {
    if (!input && input !== "")
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";
    if (!n)
        throw "Missing Parameter in validator.moreWordsThan  function: 'n'.";

    if (input !== input + "")
        throw new TypeError("validator.moreWordsThan  parameter 'input' must be a String, not a " + typeof input, "validator.js");

    if (isNaN(n))
        throw new TypeError("validator.moreWordsThan parameter 'input' must be a number, not a " + typeof input, "validator.js");

    return validator.countWords(input) >= n;
};

//18 isBetween 
validator.isBetween = function(input, floor, ceiling) {
    if (isNaN(ceiling) && !input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    if (isNaN(ceiling) && !floor)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    if (isNaN(ceiling) && !ceiling)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    return input >= floor && input <= ceiling;
};

//19 isAlphaNumeric
validator.isAlphanumeric = function(input) {
    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";


    return input.split("").every(isAlphanumericChar);
};

//20 isCreditCard
validator.isCreditCard = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    var len = input.length;
    if (len !== 16 && len !== 19) {
        return false;
    }

    if (len === 16) {
        return validator.isAlphanumeric(input);
    } else if (len === 19) {
        var strgroups = input.split("-");
        if (strgroups.length != 4) return false;
        for (var i = 0; i < strgroups.length; i++) {
            if (strgroups[i].length !== 4 || !validator.isAlphanumeric(strgroups[i])) {
                return false;
            }
        }
        return true;
    }
};

//21 isRGB

function isHexLetter(letter) {


    var charCode = letter.toUpperCase().charCodeAt(0);
    return charCode >= 65 && charCode <= 70;
}

validator.isHex = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    if (input.charAt(0) !== "#") return false;
    input = input.substring(1);
    var len = input.length;
    if (len !== 3 && len !== 6) {
        return false;
    }

    for (var i = 0; i < input.length; i++) {
        var currChar = input.charAt(i);
        if (!isDigit(currChar) && !isHexLetter(currChar)) {
            return false;
        }
    }
    return true;
};

//22 isRGB

validator.isRGB = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";



    input = removeWhiteSpace(input);
    if (input.length < 10) return false;

    if (!input.startsWith("rgb(") || !input.endsWith(")")) {
        return false;
    }

    input = input.substring(4, input.length - 1);

    rgbVals = input.split(",");
    if (rgbVals.length != 3) {
        alert("fail");
        return false;
    }

    for (var i = 0; i < rgbVals.length; i++) {
        if (!validator.isBetween(parseInt(rgbVals[i]), 0, 255)) {
            return false;
        }
    }
    return true;
};

//23 isHSL

validator.isHSL = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";



    if (input.length < 10) return false;

    if (!input.startsWith("hsl(") || !input.endsWith(")")) {
        return false;
    }

    input = input.substring(4, input.length - 1);

    hslVals = input.split(",");
    if (hslVals.length != 3) {
        return false;
    }

    if (!validator.isBetween(parseInt(hslVals[0]), 0, 300)) {
        return false;
    }

    if (!validator.isBetween(Number(hslVals[1]), 0, 1) || !validator.isBetween(Number(hslVals[2]), 0, 1)) {
        return false;
    }

    return true;
};


//24 isColor

validator.isColor = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";


    return validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input);
};

// 25 isTrimmed

validator.isTrimmed = function(input) {

    if (!input)
        throw "Missing Parameter in validator.moreWordsThan   function: 'input'.";

    return input === input.trim();
};
