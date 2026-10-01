export const checkValidateData = (email, password,name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPassValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid=/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(name);

  if(!isEmailValid) return "Email ID is not valid";
  if(!isPassValid) return "password is not valid";
  if(!isNameValid) return "Name is not valid";

  return null;
};
