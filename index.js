
// Endpoint for API
const ENDPOINT = "https://660ed71e356b87a55c504539.mockapi.io/Week12/Task";

// Function to fetch users from the API
const getUsers = async () => {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    renderUsers(data); // Render the fetched users
}

getUsers(); // Call the getUsers function when the page loads

// Event listener for the add button
let addButton = document.getElementById('button');
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('nameInput').value;
    addUser(name); // Call the addUser function when the add button is clicked
});

// Function to add a new user
function addUser(name) {
    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // Send a POST request to add a new user
    })
    .then(response => response.json())
    .then(data => {
        getUsers(); // Re-fetch users after adding
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Function to render users in the UI
function renderUsers(users) {
    let list = document.getElementById("nameList");
    list.innerHTML = ""; // Clear the existing list
    users.forEach(user => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            ${user.name}
            <button class="editButton" data-id="${user.id}">Edit</button>
            <button class="deleteButton" data-id="${user.id}">Delete</button>
        `;
        list.appendChild(listItem); // Append user name and buttons to the list
    });
}

// Event listener for clicks on the document
document.addEventListener('click', (e) => {
    // If the click is on an edit button
    if (e.target.classList.contains('editButton')) {
        let userId = e.target.getAttribute('data-id');
        let newName = prompt('Enter new name:');
        if (newName) {
            editUser(userId, newName); // Call the editUser function
        }
    }

    // If the click is on a delete button
    if (e.target.classList.contains('deleteButton')) {
        let userId = e.target.getAttribute('data-id');
        deleteUser(userId); // Call the deleteUser function
    }
});

// Function to edit a user
function editUser(id, newName) {
    fetch(`${ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }), // Send a PUT request to edit the user
    })
    .then(response => response.json())
    .then(data => {
        getUsers(); // Re-fetch users after editing
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Function to delete a user
function deleteUser(id) {
    fetch(`${ENDPOINT}/${id}`, {
        method: 'DELETE', // Send a DELETE request to delete the user
    })
    .then(response => {
        if (response.ok) {
            getUsers(); // Re-fetch users after deletion
            console.log('User deleted successfully');
        } else {
            console.error('Failed to delete user');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
