// getting the element using document.getElementByID
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// --- UTILITY FUNCTIONS ---
/**
 * Displays an error message and applies error styling to an input field.
 * @param {HTMLElement} inputElement - The input element that has an error.
 * @param {string} message - The error message to display.
 */
function showError(inputElement, message) {
  // Get the parent div, which is the '.form-control' element
  const formControl = inputElement.parentElement;

  // Add the 'error' class to that div
  //   formControl.className = "form-control error";
  formControl.classList.add("error");
  //  Now adding the text to the small tag we have used
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(inputElement) {
  const formControl = inputElement.parentElement;
  formControl.className = "form-control success";
}

function isValidEmail(email) {
  const mailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return mailRegex.test(email);
}

//  Applying the event listerner to the form tag
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting in the default way (which would cause a page reload).
  if (username.value === "") {
    // Calling the function -> Defining above
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, "email is required");
  } else if (!isValidEmail(email.value)) {
    showError(email, "email is not valid");
  } else {
    showSuccess(email);
  }
});
