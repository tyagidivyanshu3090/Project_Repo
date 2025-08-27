// getting the element using document.getElementByID
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(inputElement, message) {
  // Get the parent div, which is the '.form-control' element
  const formControl = inputElement.parentElement;

  // Add the 'error' class to that div
  //   formControl.className = "form-control error";
  formControl.classList.add("error");
  //  Now adding the text to the small tag we have used
  const small = document.querySelector("small");
  small.innerText = message;
}


function showSuccess(inputElement){
    const formControl = inputElement.parentElement;
    formControl.className = 'form-control success'
}

//  Applying the event listerner to the form tag
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value === "") {
    // Calling the function -> Defining above
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }
});
