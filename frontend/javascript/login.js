//* LOGIN 

//Check if form input is valid before sending post request to server
function submitForm() {
    //find form
    let form = document.getElementById("login-user-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute login function
    if (chk_status) {
        postLoginUser()
    }
}

function postLoginUser() {

    //get access to login form
    let loginUserForm = document.getElementById("login-user-form")

    //convert form data into json
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)))
    //post the json data to the back end
    console.log(formDataJSON)
    fetch("/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJSON
        })
        .then(res => res.json()) //interperet response as json
        .then(response => {
            if (response == "login failed") {
                alert(response)
                return
            }
            window.location.href = "../html/view-books.html"
        })
        .catch(error => {
            alert("user login failed" + error)
        })
}