import { AuthFormInterface } from "../auth/typage/interfaces/authFormI";
import { AuthFieldsValidation } from "../auth/typage/types/authForm";

export const validateRegister = (
  formData: AuthFormInterface
): AuthFieldsValidation => {
  const email = formData.email;
  const password = formData.password;
  const firstname = formData.firstname;
  const lastname = formData.lastname

  if (email.trim() === "" || !email || password.trim() === '' || !password || 
    firstname?.trim() === '' || !firstname || lastname?.trim() === '' || !lastname
    ) {
    throw new Error("Fill all the fields");
  }

  else if (!email.match("[0-9a-zA-Z-_]+[.0-9a-zA-Z-_]*@[a-zA-Z-_]+.(com|fr)")){
    throw new Error("Email not valid, try again");
  }

  return { valid: true };
};


export const validateLogin = (
  formData: AuthFormInterface
): AuthFieldsValidation => {
  const email = formData.email;
  const password = formData.password;

  if (email.trim() === "" || !email) {
    throw new Error("Email field is mandatory");
  }

  if (password.trim() === "" || !password) {
    throw new Error("Password field is mandatory");
  }

  return { valid: true };
};
