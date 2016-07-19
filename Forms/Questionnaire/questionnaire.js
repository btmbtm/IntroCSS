window.onload = function() {
    var pizzaQuestionnaireForm = document.getElementById("pizzaQuestionnaire");
    var pizzaTypeSelect = pizzaQuestionnaireForm.pizzaType;
    var pizzaToppingSelect = pizzaQuestionnaireForm.pizzaTopping;
    var pizzaTypeSelectOtherInput = document.getElementById("pizzaTypeOther");
    var pizzaToppingSelectOtherInput = document.getElementById("pizzaToppingOther");

    for (var i = 0; i < pizzaTypeSelect.length - 1; i++) {
        pizzaTypeSelect[i].addEventListener("change", function() {
            pizzaTypeSelectOtherInput.value = "";
            pizzaTypeSelectOtherInput.setAttribute("readonly", "");
            pizzaTypeSelectOtherInput.removeAttribute("required");
        });
    }

    var otherPizzaTypeSelect = pizzaTypeSelect[pizzaTypeSelect.length - 1];
    otherPizzaTypeSelect.addEventListener("change", function() {
        if (this.checked) {
            pizzaTypeSelectOtherInput.removeAttribute("readonly");
            pizzaTypeSelectOtherInput.setAttribute("required", "");

        }
    });

    pizzaTypeSelectOtherInput.addEventListener("keyup", function() {
        if (otherPizzaTypeSelect.checked) {
            if (!(validator.isTrimmed(pizzaTypeSelectOtherInput.value))) {
                pizzaTypeSelectOtherInput.setCustomValidity("A pizza type should not have leading or trailing spaces. Please remove =)");
            } else if (!(validator.isOfLength(pizzaTypeSelectOtherInput.value, 3) && validator.isLength(pizzaTypeSelectOtherInput.value, 20))) {
                pizzaTypeSelectOtherInput.setCustomValidity("A pizza type should be longer than 3 characters and less than 25 characters =)");
            } else if (!(validator.isAlphanumeric(pizzaTypeSelectOtherInput.value))) {
                pizzaTypeSelectOtherInput.setCustomValidity("A pizza topping should only be made up of letters and numbers =)");

            } else {
                pizzaTypeSelectOtherInput.setCustomValidity("")
            }
        } else {
            pizzaTypeSelectOtherInput.setCustomValidity("")
        }
    })


    for (var i = 0; i < pizzaToppingSelect.length - 1; i++) {
        pizzaToppingSelect[i].addEventListener("change", function() {
            pizzaToppingSelectOtherInput.value = "";
            pizzaToppingSelectOtherInput.setAttribute("readonly", "");
            pizzaToppingSelectOtherInput.removeAttribute("required");
        });
    }

    var otherpizzaToppingSelect = pizzaToppingSelect[pizzaToppingSelect.length - 1];
    otherpizzaToppingSelect.addEventListener("change", function() {
        if (this.checked) {
            pizzaToppingSelectOtherInput.removeAttribute("readonly");
            pizzaToppingSelectOtherInput.setAttribute("required", "");

        }
    });

    pizzaToppingSelectOtherInput.addEventListener("keyup", function() {
        if (otherpizzaToppingSelect.checked) {
            if (!(validator.isTrimmed(pizzaToppingSelectOtherInput.value))) {
                pizzaToppingSelectOtherInput.setCustomValidity("A pizza topping should not have leading or trailing spaces. Please remove =)");
            } else if (!(validator.isOfLength(pizzaToppingSelectOtherInput.value, 3) && validator.isLength(pizzaToppingSelectOtherInput.value, 20))) {
                pizzaToppingSelectOtherInput.setCustomValidity("A pizza topping should be longer than 3 characters and less than 25 characters =)");
            } else if (!(validator.isAlphanumeric(pizzaToppingSelectOtherInput.value))) {
                pizzaToppingSelectOtherInput.setCustomValidity("A pizza topping should only be made up of letters and numbers =)");

            } else {
                pizzaToppingSelectOtherInput.setCustomValidity("")
            }
        } else {
            pizzaToppingSelectOtherInput.setCustomValidity("")
        }
    })

}
