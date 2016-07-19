var apptForm = document.getElementById("apptForm");
var apptDateInput = apptForm.apptDate;
var apptPurposeInput = apptForm.apptPurpose;
var contactEmailInput = apptForm.contactEmail;
var contactTelInput = apptForm.contactTel;

apptDateInput.addEventListener("change", function() {
    if (!(validator.isDate(apptDateInput.value))) {
        apptDateInput.setCustomValidity("Not a valid date!");
    } else if (validator.isBeforeToday(apptDateInput.value)) {
        apptDateInput.setCustomValidity("Enter a date after today.");
    } else if (validator.isAfterDate(apptDateInput.value, "2017")) {
        apptDateInput.setCustomValidity("We only take appointments for 2016. Please select an earlier date.");
    } else {
        apptDateInput.setCustomValidity("");
    }
});

apptPurposeInput.addEventListener("keyup", function() {
    if (!(validator.isOfLength(apptPurposeInput.value, 20))) {
        apptPurposeInput.setCustomValidity("Please make sure you provide enough information! Appointment purpose should be at least 20 characters long");
    } else {
        apptPurposeInput.setCustomValidity("");
    }
});


contactTelInput.addEventListener('keyup', function(event) {
    if (!(validator.isPhoneNumber(contactTelInput.value))) {
        contactTelInput.setCustomValidity("Please enter a valid email (something@something.extension)");
    } else {
        contactTelInput.setCustomValidity("");
    }
});


//Check if user's email is valid

contactEmailInput.addEventListener('keyup', function(event) {
    if (!(validator.isEmailAddress(contactEmailInput.value))) {
        contactEmailInput.setCustomValidity("Please enter a valid email (something@something.extension)");
    } else {
        contactEmailInput.setCustomValidity("");
    }
});


