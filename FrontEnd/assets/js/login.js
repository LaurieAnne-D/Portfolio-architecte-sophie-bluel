"use strict";

// ********** CONSTANTS ********** //
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

// ********** FUNCTIONS ********** //
function login(event) {
    event.preventDefault()

    const logData = {
        email: email.value,
        password: password.value
    };

    fetch("http://localhost:5678/api/users/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logData),
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("token", data.token);
                    location.href = "index.html";
                })
            } else {
                alert("Identifiant ou mot de passe incorrect !");
            }
        })
}


// ********** MAIN ********** //
submit.addEventListener("click", login);