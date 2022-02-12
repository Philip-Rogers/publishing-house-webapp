

// Load existing data
let urlParameters = new URLSearchParams(window.location.search)

//Acess the user ID from the query string (i.e. ?id=1)
let userId = urlParameters.get("id")

if (userId) {
    // Get existing user information
    fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            // Push existing user information into the form inputs
            document.getElementById("userID").value = user.userID
            document.getElementById("username").value = user.username
            document.getElementById("password").value = user.password
            document.getElementById("accessRights").value = user.accessRights
        })
}


//Check if form input is valid before sending post request to server
function submitForm() {
    //find form
    let form = document.getElementById("update-users-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute postUpdateUser function
    if (chk_status) {
        postUpdateUser()
    }
}


// Post back updated data
function postUpdateUser() {
    // Get access to the update user form
    let updateUserForm = document.getElementById("update-users-form")
    // Convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))

    // Post the JSON data to the API
    fetch("/api/users/update", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            alert(res)
            // Redirect back to user list
            window.location.href = "../html/view-users.html"
        })
}