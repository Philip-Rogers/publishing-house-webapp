//* CREATE USERS

function submitForm() {
    let form = document.getElementById("create-users-form");
    let chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
        postCreateUser()
    }
}

function postCreateUser() {
    // Get access to the create user form
    let createUserForm = document.getElementById("create-users-form")
    accessRights = {
        "accessRights": document.getElementById("accessRights").value
    }
    formData = Object.fromEntries(new FormData(createUserForm));
    //add select list value to form data 
    Object.assign(formData, accessRights)
    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(formData) 
    console.log(formDataJSON)
    // Post the form JSON to the backend

    //show loading screen
    fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            //alert response from server
            alert(res)
            //redirect to view users
            window.location.href = "../html/view-users.html"
        })
        .catch(err => {
            //handle the error from the server
            console.log("create user request failed!" + err)
        })
}