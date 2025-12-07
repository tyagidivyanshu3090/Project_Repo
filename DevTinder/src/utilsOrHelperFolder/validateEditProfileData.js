// This code checks whether the data sent by the user is valid or not
// As we are not allowing the user to update the email & password
// for password we create different api

const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedFields.includes(field);
  });

  return isEditAllowed;
};

module.exports = validateEditProfileData;
