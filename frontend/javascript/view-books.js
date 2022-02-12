//* VIEW BOOKS

//populate view books table with all books
fetch("/api/books")
    .then(res => res.json())
    .then(books => {
        //access table body
        let book_list = document.getElementById("books-body")
        console.log(books)
        //for store each book in 'book' variable and populate iwth data
        for (let book of books) {
            book_list.innerHTML += `
            <tr class="book-body">
            <td>${book.bookID}</td>
            <td><img src="../images/${book.coverImagePath}.jpeg" alt="book cover" width="75"></td>
            <td>${book.bookTitle}</td>
            <td>${book.yearofPublication}</td>
            <td>${book.name+" "+book.surname}</td>  
            <td>${book.millionsSold}</td>
            <td>${book.dateCreated}</td>
            <td>${book.dateChanged}</td>
            <td>${book.username}</td>
            <td>
            <a href="update-books.html?id=${book.bookID}">UPDATE</a> 
            <a href="delete-books.html?id=${book.bookID}">DELETE</a>
            </td>
            </tr>
            `
        }
    })