// Get the form element
const form = document.getElementById('my-form');

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the user input values
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('Phone');
  const emailInput = document.getElementById('email');

  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;

  // Retrieve existing user details from local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if there is an edited user index stored in local storage
  const editedUserIndex = localStorage.getItem('editedUserIndex');

  if (editedUserIndex !== null) {
    // Update the existing user details at the edited index
    existingUsers[editedUserIndex] = {
      name: name,
      phone: phone,
      email: email
    };

    // Remove the edited user index from local storage
    localStorage.removeItem('editedUserIndex');

    // Display success message for user update
    showSuccess('User details updated successfully');
  } else {
    // Create an object to store the new user details
    const userDetails = {
      name: name,
      phone: phone,
      email: email
    };

    // Add the new user details to the existing users
    existingUsers.push(userDetails);

    // Display success message for new user addition
    showSuccess('User details stored successfully');
  }

  // Store the updated user details in local storage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Clear the form inputs
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';

  // Refresh the user list
  refreshUserList();
}

// Function to display error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.getElementById('my-form');

  container.insertBefore(errorDiv, form);

  // Remove the error message after 2 seconds
  setTimeout(function () {
    errorDiv.remove();
  }, 2000);
}

// Function to display success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success';
  successDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.getElementById('my-form');

  container.insertBefore(successDiv, form);

  // Remove the success message after 3 seconds
  setTimeout(function () {
    successDiv.remove();
  }, 3000);
}

// Function to refresh the user list
function refreshUserList() {
  const userList = document.getElementById('users');

  // Clear the existing user list
  userList.innerHTML = '';

  // Retrieve the user details from local storage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Create list items for each user and append to the user list
  users.forEach(function (user, index) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`Name: ${user.name}, Phone: ${user.phone}, Email: ${user.email}`));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      editUser(index);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteUser(index);
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    userList.appendChild(li);
  });
}

// Function to edit a user
function editUser(index) {
  // Retrieve existing user details from local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Retrieve the user details at the specified index
  const user = existingUsers[index];

  // Populate the form inputs with the user details
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('Phone');
  const emailInput = document.getElementById('email');

  nameInput.value = user.name;
  phoneInput.value = user.phone;
  emailInput.value = user.email;

  // Store the index of the user being edited in local storage
  localStorage.setItem('editedUserIndex', index.toString());
}

// Function to delete a user
function deleteUser(index) {
  // Retrieve existing user details from local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the user being deleted is the one being edited
  const editedUserIndex = localStorage.getItem('editedUserIndex');
  if (editedUserIndex !== null && index === parseInt(editedUserIndex)) {
    // Remove the edited user index from local storage
    localStorage.removeItem('editedUserIndex');
  }

  // Remove the user at the specified index
  existingUsers.splice(index, 1);

  // Store the updated user details in local storage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Refresh the user list
  refreshUserList();
}

// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);

// Refresh the user list on page load
refreshUserList();
