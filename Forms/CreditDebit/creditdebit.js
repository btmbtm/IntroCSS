window.onload = function() {
    var CCForm = document.getElementById("CCForm");
    var fullNameInput = CCForm.fullName;
    var cardNumInput = CCForm.cardNum
    var CVVInput = CCForm.CVV;

    fullNameInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(fullNameInput.value))) {
            fullNameInput.setCustomValidity("Full name input must have NO leading or trailing white space. Please remove excess whitespace =)");
        } else if (!(validator.isOfLength(fullNameInput.value, 2) && validator.isLength(fullNameInput.value, 40))) {
            fullNameInput.setCustomValidity("Full name should be at least 2 characters long and less than 40 characters!");
        } else {
            fullNameInput.setCustomValidity("");
        }
    });


    cardNumInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(cardNumInput.value))) {
            cardNumInput.setCustomValidity("Card number must have NO leading or trailing white space. Please remove excess whitespace =)");
        } else if (!(validator.isCreditCard(cardNumInput.value))) {
            cardNumInput.setCustomValidity("Card number should be 16 characters long, optionally separated by dashe!");
        } else {
            cardNumInput.setCustomValidity("");
        }
    });

    CVVInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(CVVInput.value))) {
            CVVInput.setCustomValidity("CVV must have NO leading or trailing white space. Please remove excess whitespace =)");
        } else if (!(validator.isLengthRange(CVVInput.value,3, 4))) {
            CVVInput.setCustomValidity("CVV must be 3 or 4 characters long!");
        } else if (!(validator.isOnlyDigits(CVVInput.value))) {
            CVVInput.setCustomValidity("CVV should only be made up of numbers!");
        } else {
            CVVInput.setCustomValidity("");
        }
    });
}
