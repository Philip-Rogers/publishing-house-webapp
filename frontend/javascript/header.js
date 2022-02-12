//* FETCH HEADER

fetch("../html/header.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });


//* LOGOUT FUNCTION

function postLogoutUser() {
    fetch("/api/users/logout", {
            method: "POST"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.href = "../html/login.html"
        })
        .catch(error => {
            console.log("logout failed" + error)
        })
}