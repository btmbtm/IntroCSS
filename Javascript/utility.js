(function(window) {

  var utilities = {};


  utilities.isArray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';

  };

  //1 utilities.by | Write a function that operates similarly to .forEach. Your function should iterate and call the callback parameter for each element or property of a list at the interval specified by the n parameter. It should not call callback on values greater than the list’s number of elements.
  //
  //INSTRUCTIONS UNCLEAR

  utilities.by = function(list, n, callback) {
    for (var i = n - 1; i < list.length; i += n) {
      callback(list[i]);
    }
  };



  //2 utilities.keys | Returns an array of all the keys of an object
  utilities.keys = function(object) {
    return Object.keys(object); // this returns an array of keys
  };

  //3 utilities.values | create array of all the values of an object
  utilities.values = function(object) {
    var out = [];

    //use for in loop to access object keys
    for (var key in object) {
      out.push(object[key]);
    }
    return out;
  };


  //4 utilities.pairs | create an array of all the keys and values of an object
  utilities.pairs = function(object) {

    var out = [];

    //loop thru keys w/ for in loop
    for (var key in object) {
      //first push key  onto output array 
      out.push(key);
      //next push key's value
      out.push(object[key]);
    }


    return out;
  };


  //5  utilities.shuffle | returns a returns a randomly re-arranged copy of the elements in its parameter array

  utilities.shuffle = function(array) {
    var outputArray = array.slice(); //copy the input array

    var temp; //declare temp for copying

    //Use fisher yates algo
    //Pick random item in list and place it at end of list
    //Repeat until all items are placed at end of list
    for (var i = outputArray.length - 1; i >= 0; i--) {
      var nextLoc = Math.floor(Math.random() * i);
      temp = outputArray[i];
      outputArray[i] = outputArray[nextLoc];
      outputArray[nextLoc] = temp;
    }

    return outputArray;
  };



  //6 utilities.pluralize | ll return the plural of a word depending on the value of the n parameter. If n is 1, return the non-plural word (parameter word); otherwise, add an “s” to the plural word. If the pluralWord parameter is provided, instead of adding an “s,” return the pluralWord.
  utilities.pluralize = function(n, word, pluralWord) {
    //if number of items is 1, return word
    if (n === 1) {
      return word;
    }

    //if no pluralWord argument, return word + s
    //otherwise return pluralWord
    if (arguments[2] === undefined) {
      return word + s;
    } else {
      return pluralWord;
    }
  };

  //7 utilities.toDash | convert a camelCase string to a dashed string
  utilities.toDash = function(str) {
    var dash = "";
    var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //remove white space from input
    var camel = str.trim();

    //loop thru string characters
    for (var i = 0; i < camel.length; i++) {
      //if uppercase letter found, insert dash before adding it to output string, otherwise just add char to output string
      if (upperCase.indexOf(camel.charAt(i)) >= 0) {
        dash += "-" + camel.charAt(i);
      } else {
        dash += camel.charAt(i);
      }
    }

    //set output string to lowercase and return it 
    return dash.toLowerCase();
  };


  //8 utilities.toCamel | convert dashed string to a camelCase string
  utilities.toCamel = function(str) {
    //split into words using dash as separator
    var cc = str.trim().toLowerCase().split("-");

    //loop thru words and convert to Title case (sans 1st item)
    for (var i = 1; i < cc.length; i++) {
      cc[i] = cc[i].substring(0, 1).toUpperCase() + cc[i].substring(1);
    }

    //return joined words to make camelCase string
    return cc.join("");
  };



  //9 utilities.has | searches all values of the parameter obj and returns “true” if any are equal to the search parameter

  utilities.has = function(obj, search) {
    //loop through search keys
    for (var i = 0; i < search.length; i++) {

      //if search key in obj return true
      if (search[i] in obj) {
        return true;
      }
    }

    //return false if no key is found in obj
    return false;
  };

  //10 utilities.pick | returns a new object by picking all key/value pairs from the parameter obj. The keys that are picked will be determined by the array parameter keys.
  utilities.pick = function(obj, keys) {
    //create empty object to copy matching key/value pairs into
    var out = {};

    //loop thru obj and 
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] in obj) {
        out[keys[i]] = obj[keys[i]];
      }
    }
    return out;
  };


  /* testing objects 

  var testObj = {
    wow: 2,
    fun: 3,
    hat: "COOL!"
  };

  var data = {
    type: "transformer",
    index: 19,
    siblings: 19,
    access: "full"
  };

  var arr = [1,2,3,4,5,6,7];
  document.write(utilities.keys(testObj) + "<br>");
  document.write(utilities.values(testObj) + "<br>");
  document.write(utilities.pairs(testObj) + "<br>");
  document.write(utilities.shuffle(arr) + "<br>");
  document.write(utilities.shuffle(arr) + "<br>");
  document.write(utilities.shuffle(arr) + "<br>");
  document.write(utilities.pluralize(1, "cow", "cows") + "<br>");
  document.write(utilities.pluralize(2, "cow", "cows") + "<br>");
  document.write(utilities.pluralize(500, "goose", "geese") + "<br>");
  document.write(utilities.toDash("hotDogFourthOfJuly") + "<br>");
  document.write(utilities.toDash("spaceStationComplex") + "<br>");
  document.write(utilities.toDash("myFirstFunction") + "<br>");
  document.write(utilities.toCamel("hot-dog") + "<br>");
  document.write(utilities.toCamel("space-station-complex") + "<br>");
  document.write(utilities.toCamel("my-first-function") + "<br>");
  document.write(JSON.stringify(utilities.pick(data, ["type", "index"])) + "<br>");
  document.write(JSON.stringify(utilities.pick(data, ["siblings", "index"]), null, 4) + "<br>");
  document.write(JSON.stringify(utilities.pick(data, ["access", "animal"]), null, 4) + "<br>");
*/
})(window);