
var justEvaluated = false;

function checkIfJustEvaluated(){
    if(justEvaluated){
            clearDisplay();
            justEvaluated=false;
        }
}

function appendVal(val){
    return function(){
        checkIfJustEvaluated();
        display.innerHTML+=val;
    }
}

function evaluate(){
    //try catch finally -> with error input
    var result = eval(display.innerHTML);
    if(Number.isNaN(result)){
        alert(result);
        result = "ERROR";
    } 
    else if(result.toString().length > 12){
        result = result.toPrecision(12);
    }

    display.innerHTML = result;
    justEvaluated = true;
    
}

function clearDisplay(){
    display.innerHTML = "";
}

function deleteChar(){
    checkIfJustEvaluated();
    var len = display.innerHTML.length;
    display.innerHTML = display.innerHTML.substring(0,len-1);
}

var display = document.getElementById("display");


// 1ST ROW //

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearDisplay);

var deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", deleteChar);

var equals = document.getElementById("evaluateBtn");
evaluateBtn.addEventListener("click", evaluate);

var multBtn = document.getElementById("multBtn");
var appendMult = appendVal("*");
multBtn.addEventListener("click", appendMult);


// 2ND ROW //
var sevenBtn = document.getElementById("sevenBtn");
var append7 = appendVal(7);
sevenBtn.addEventListener("click", append7);

var eightBtn = document.getElementById("eightBtn");
var append8 = appendVal(8);
eightBtn.addEventListener("click", append8);

var nineBtn = document.getElementById("nineBtn");
var append9 = appendVal(9);
nineBtn.addEventListener("click", append9);

var div = document.getElementById("buttonDiv");
var appendDiv = appendVal("/");
div.addEventListener("click", appendDiv);

// 3RD ROW //
var fourBtn = document.getElementById("fourBtn");
var append4 = appendVal(4);
fourBtn.addEventListener("click", append4);

var fiveBtn = document.getElementById("fiveBtn");
var append5 = appendVal(5);
fiveBtn.addEventListener("click", append5);

var sixBtn = document.getElementById("sixBtn");
var append6 = appendVal(6);
sixBtn.addEventListener("click", append6);

var minusBtn = document.getElementById("minusBtn");
var appendMinus = appendVal("-");
minusBtn.addEventListener("click", appendMinus);

// FOURTH ROW //
var oneBtn = document.getElementById("oneBtn");
var append1 = appendVal(1);
oneBtn.addEventListener("click", append1);

var twoBtn = document.getElementById("twoBtn");
var append2 = appendVal(2);
twoBtn.addEventListener("click", append2);

var threeBtn = document.getElementById("threeBtn");
var append3 = appendVal(3);
threeBtn.addEventListener("click", append3);

var addBtn = document.getElementById("addBtn");
var appendAdd = appendVal("+");
addBtn.addEventListener("click", appendAdd);

// FIFTH ROW //

var zeroBtn = document.getElementById("zeroBtn");
var append0 = appendVal(0);
zeroBtn.addEventListener("click", append0);

var decBtn = document.getElementById("decBtn");
var appendDec = appendVal(".");
decBtn.addEventListener("click", appendDec);
