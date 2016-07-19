window.onload = function() {
    var loginForm = document.getElementById("loginForm");
    var usernameInput = loginForm.username;
    var passwordInput = loginForm.password;

    alert(passwordInput);

    usernameInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(usernameInput.value))) {
            usernameInput.setCustomValidity("Username must have NO leading or trailing white space. Please remove excess whitespace =)");
        } else if (!(validator.isAlphanumeric(usernameInput.value))) {
            usernameInput.setCustomValidity("Username must be alphanumeric. Numbers and letters only. No spaces or symbols!");
        } else if (!(validator.isOfLength(usernameInput.value, 6) && validator.isLength(usernameInput.value, 40))) {
            usernameInput.setCustomValidity("Usernames should be longer than 6 characters and less than 40 characters!");
        } else {
            usernameInput.setCustomValidity("");
        }

    });

    passwordInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(passwordInput.value))) {
            passwordInput.setCustomValidity("Password must have NO leading or trailing white space. Please remove excess whitespace =)");
        } else if (!(validator.isOfLength(passwordInput.value, 6) && validator.isLength(passwordInput.value, 40))) {
            passwordInput.setCustomValidity("Passwords should be longer than 6 characters and less than 40 characters!");
        } else {
            passwordInput.setCustomValidity("");
        }
    });
};
