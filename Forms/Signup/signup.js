window.onload = function() {    var signupForm = document.getElementById('signupform');    var firstNameInput = signupForm.firstName;    var lastNameInput = signupForm.lastName;    var DOBInput = signupForm.DOB;    var emailInput = signupForm.email;    var passwordInput = signupForm.password;    //Check if user's first name is between 2 and 40 characters    firstNameInput.addEventListener('keyup', function(event) {        if (!(validator.isOfLength(firstNameInput.value, 2) && validator.isLength(firstNameInput.value, 40))) {            firstNameInput.setCustomValidity("First names should be longer than 2 characters and less than 40 characters!");        } else {            firstNameInput.setCustomValidity("");        }    });    // Check if user's late name is between 2 and 40 characters    lastNameInput.addEventListener('keyup', function(event) {        if (!(validator.isOfLength(lastNameInput.value, 2) && validator.isLength(lastNameInput.value, 40))) {            lastNameInput.setCustomValidity("Last names should be longer than 2 characters and less than 40 characters!");        } else {            lastNameInput.setCustomValidity("");        }    });    // Check if user's DOB is valid and user is at least 13 years old    DOBInput.addEventListener('keyup', function() {        if (!validator.isDate(DOBInput.value)) {            DOBInput.setCustomValidity("Please enter a valid date =)");        } else if (!validator.isThirteenYearsOld(new Date(DOBInput.value))) {            DOBInput.setCustomValidity("You must be 13 years old to signup!");        } else {            DOBInput.setCustomValidity("");        }    });    //Check if user's email is valid    emailInput.addEventListener('keyup', function(event) {        if (!validator.isEmailAddress(emailInput.value)) {            emailInput.setCustomValidity("Please enter a valid email (something@something.extension)");        } else {            emailInput.setCustomValidity("");        }    });    // Check if user's late name is between 2 and 40 characters    passwordInput.addEventListener('keyup', function(event) {        if (!(validator.isOfLength(passwordInput.value, 6) && validator.isLength(passwordInput.value, 30))) {            passwordInput.setCustomValidity("Passwords should be longer than 6 characters and less than 30 characters!");        } else {            passwordInput.setCustomValidity("");        }    });};