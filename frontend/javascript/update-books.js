//* UPDATE BOOKS

// LOAD EXISTING DATA
let urlParameters = new URLSearchParams(window.location.search)
// Access the book ID from the query string (?=id=1)
let bookID = urlParameters.get("id")
// if there the bookID is not null do thing


// populate author select lists
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("authorID")

        for (let author of authors) {
            authorSelect.innerHTML += `
            <option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }

    })

// populate cover select lists
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


// push response data into form inputs
if (bookID) {
    fetch(`/api/books/${bookID}`)
        .then(res => res.json())
        .then(book => {
            console.log(book.coverImagePath)
            console.log(book.authorID)
            console.log(book)
            console.log(book.bookID)
            //push existing book info to form inputs
            document.getElementById("bookID").value = book.bookID
            document.getElementById("coverImagePath").value = book.coverImagePath
            document.getElementById("bookTitle").value = book.bookTitle
            document.getElementById("yearofPublication").value = book.yearofPublication
            document.getElementById("authorID").value = book.authorID
            document.getElementById("millionsSold").value = book.millionsSold
        })
}

// Check if form input is valid before sending post request to server
function submitForm() {
    // find form
    let form = document.getElementById("update-books-form");
    // Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    // report form validity to client
    form.reportValidity();
    // if valid execute createbook function
    if (chk_status) {
        postUpdateBook()
    }
}

// Post updated data
function postUpdateBook() {
    // get access to update book form
    let updatebookForm = document.getElementById("update-books-form")
    // get select list value and form data
    cover = {
        "coverImagePath": document.getElementById("coverImagePath").value
    }
    formData = Object.fromEntries(new FormData(updatebookForm));
    // add select list value to form data 
    Object.assign(formData, cover)
    // Convert the formData object into JSON
    let formDataJSON = JSON.stringify(formData)
    // post the json data to the api
    fetch("/api/books/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {

            alert(res)
            // redirect back to book list
            window.location.href = "../html/view-books.html"
        })
        .catch(err => {
            // handle the error from the server
            console.log("update book request failed!" + err)
            console.log(err)
        })
}