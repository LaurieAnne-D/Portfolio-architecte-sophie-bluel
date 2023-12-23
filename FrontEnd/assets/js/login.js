"use strict";

// ********** CONSTANTS ********** //
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
console.log(submit);

// ********** FUNCTIONS ********** //
function errorMsg() {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
}

function login(event) {
    console.log(event);
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
            console.log(resp);
            if (resp.ok) {
                resp.json().then(data => {
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("token", data.token);
                    console.log(document.location.href = "index.html");
                    document.location.href = "index.html";
                })
            } else {
                errorMsg();
            }
        })
}

// ********** MAIN ********** //
submit.addEventListener("click", login);