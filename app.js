// Get the form element
const form = document.getElementById('my-form');

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the user input values
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const name = nameInput.value;
  const email = emailInput.value;


  // Create an object to store the user details
  const userDetails = {
    name: name,
    email: email
  };

  // Retrieve existing user details from local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Add the new user details to the existing users
  existingUsers.push(userDetails);

  // Store the updated user details in local storage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Clear the form inputs
  nameInput.value = '';
  emailInput.value = '';

  // Display success message
  showSuccess('User details stored successfully');

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
  users.forEach(function (user) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`Name: ${user.name}, Email: ${user.email}`));
    userList.appendChild(li);
  });
}

// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);

// Refresh the user list on page load
refreshUserList();
