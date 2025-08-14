export const validateData = (email, password, name) => {
  // --- Name Validation (only runs in Sign Up mode) ---
  // We check if 'name' was passed and is not null.
  if (name !== null) {
    if (name.trim().length < 2) {
      return "Please enter a valid full name.";
    }
  }
  const validEmail =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

  const validPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!validEmail) return "Email is not valid";
  if (!validPassword) return "Password is not valid";
  return null;
};
