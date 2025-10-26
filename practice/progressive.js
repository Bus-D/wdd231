function submitForm(event) {
    // console.log("Submit Button functioning");

    const nameInput = this.name;
    const emailInput = document.getElementById('email');

    console.log(this.name.value);
    let error = "";

    if (nameInput.value === "") {
        error += "Name is required.\n";
    }

    validateEmail(emailInput);

    if (validateEmail(emailInput)) {
        console.log("Email validated");
    }

    if (emailInput.value === "") {
        error = "Email is required";
    } else if (!validateEmail(emailInput)) {
        error = "Invalid email address. Please enter a valid email."
    }

    if (error) {
        event.preventDefault();
        document.getElementById("form-error").textContent = error;
    } else {
        console.log("Function worked");
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById("contact-form").addEventListener("submit", submitForm);