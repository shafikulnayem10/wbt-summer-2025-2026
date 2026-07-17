const form = document.getElementById("myForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isLocked) {
        document.getElementById("passwordError").innerText = "Password is locked. Try again after 1 minute.";
        return;
    }

    let valid = true;

    let errors = document.querySelectorAll(".error");
    errors.forEach(function(error) {
        error.innerText = "";
    });

    let inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach(function(input) {
        input.classList.remove("fail");
    });

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const category = document.getElementById("category");
    const reason = document.getElementById("reason");

    const gender = document.querySelector('input[name="gender"]:checked');
    const clubs = document.querySelectorAll('input[name="club"]:checked');

    if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {
        firstName.classList.add("fail");
        document.getElementById("firstNameError").innerText = "First name is required and alphabets only";
        valid = false;
    }

    if (!/^[A-Za-z]+$/.test(lastName.value.trim())) {
        lastName.classList.add("fail");
        document.getElementById("lastNameError").innerText = "Last name is required and alphabets only";
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add("fail");
        document.getElementById("emailError").innerText = "Enter valid email address";
        valid = false;
    }

    if (password.value === "") {
        password.classList.add("fail");
        document.getElementById("passwordError").innerText = "Password is required";
        valid = false;
    } 
    else if (password.value !== "AIUB123") {
        wrongAttempts++;
        password.classList.add("fail");
        document.getElementById("passwordError").innerText = "Wrong Password! Attempt " + wrongAttempts + " of 3.";
        valid = false;

        if (wrongAttempts >= 3) {
            isLocked = true;
            document.getElementById("passwordError").innerText = "Too many wrong attempts. Password locked for 1 minute.";
            password.disabled = true;

            setTimeout(function () {
                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;
                document.getElementById("passwordError").innerText = "Password unlocked. Try again.";
            }, 60000);
        }
    }

    if (!gender) {
        document.getElementById("genderError").innerText = "One option must be selected";
        valid = false;
    }

    if (clubs.length === 0) {
        document.getElementById("clubError").innerText = "Select at least one club";
        valid = false;
    }

    if (category.value === "") {
        category.classList.add("fail");
        document.getElementById("categoryError").innerText = "Choose a valid category";
        valid = false;
    }

    if (reason.value.trim().length < 20) {
        reason.classList.add("fail");
        document.getElementById("reasonError").innerText = "Required, minimum 20 characters";
        valid = false;
    }

    if (valid) {
        alert("Form Submitted Successfully");
        wrongAttempts = 0;
        form.reset();
    }
});