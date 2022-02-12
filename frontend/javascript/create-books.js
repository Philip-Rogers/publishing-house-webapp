//* BUTTON SUBMIT

//Check if form input is valid before sending post request to server
function submitForm() {
    //find form
    let form = document.getElementById("create-books-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute createbook function
    if (chk_status) {
        postCreateBook()
    }
}

// Post request to create book
function postCreateBook() {
    // Get access to the create user form
    let createBookForm = document.getElementById("create-books-form")

    //get select list value and form data
    cover = {
        "coverImagePath": document.getElementById("coverImagePath").value
    }
    // author = {
    //     "author": document.getElementById("author").value
    // }
    formData = Object.fromEntries(new FormData(createBookForm));
    //add select list value to form data 
    // Object.assign(formData, cover, authorID)
    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(formData)
    console.log(formDataJSON)
    let chk_status = createBookForm.checkValidity();

    if (chk_status) {
        console.log(formDataJSON)
        // Post the form JSON to the backend

        //show loading screen
        fetch("/api/books/create", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: formDataJSON
            })
            .then(res => res.json())
            .then(res => {
                //handle response from the server
                alert(res)
                console.log(res + "book request sent!")
                //hide the loading screen
                console.log(res)
                //redirect back to book list
                window.location.href = "../html/view-books.html"
            })
            .catch(err => {
                //handle the error from the server
                console.log("create book request failed!" + err)
                console.log(err)
            })
    }
}


//* FETCH AUTHORS

//populate author select list
fetch("/api/authors")
    //turn list into json format
    .then(res => res.json())
    .then((authors) => {
        //access select DOM element
        let authorSelect = document.getElementById("authorID")
        //each item in authors stores as 'author'  
        for (let author of authors) {
            //insert option and value html with each iteration's key value
            authorSelect.innerHTML += `
            <option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>
            `
        }
    })


//* FETCH COVERS

//populate cover select list
fetch("/api/covers")
    .then(res => res.json())
    .then((covers) => {
        let coverSelect = document.getElementById("coverImagePath")
        for (let cover of covers) {
            coverSelect.innerHTML += `
            <option value="${cover.coverImagePath}"> 
            src="../images/${cover.coverImagePath}.jpeg"
            </option>
            `
        }
    })