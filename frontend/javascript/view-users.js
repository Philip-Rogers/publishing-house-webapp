//* FETCH USERS

fetch("/api/users")
    .then(res => res.json())
    .then(users => {
        let userListSection = document.getElementById("users-body")

        for (let user of users) {
            userListSection.innerHTML += `
        <tr class="user-body">
        <td>${user.userID}</td>
        <td>${user.username}</td>
        <td>${user.accessRights}</td>
        <td>
        <a href="update-users.html?id=${user.userID}">UPDATE</a>
        <a href="delete-users.html?id=${user.userID}">DELETE</a>
        </td>
        </tr>
        `
        }
    })