import {
  UserPasswordInput,
  UserRegisterInput,
  FieldError,
} from "../resolvers/user";

export function validateRegisterInput({
  firstName,
  lastName,
  userEmail,
  password,
  confirmPassword,
}: UserRegisterInput) {
  var errors: FieldError[] = [];

  if (firstName.trim() === "" || lastName.trim() === "") {
    errors.push({
      field: "naming",
      message: "First name and last name must not be empty",
    });
  }

  if (userEmail.trim() === "") {
    errors.push({
      field: "email",
      message: "Email must not be empty",
    });
  } else {
    if (!isEmailValid(userEmail)) {
      errors.push({
        field: "email",
        message: "A valid email address is required",
      });
    }
  }

  if (password.trim() === "") {
    errors.push({
      field: "password",
      message: "Password must not be empty",
    });
  } else if (password != confirmPassword) {
    errors.push({
      field: "password",
      message: "Passwords must match",
    });
  } else if(!isPasswordSecure(password)) {
    errors.push({
      field: "password",
      message: "Password must contain a minimum of 8 characters and at least 1 uppercase letter, one lowercase letter and 1 number"
    });
  }

  return {
    errors,
    valid: errors.length === 0,
  };
}

export function validateLoginInput({ userEmail, password }: UserPasswordInput) {
  var errors: FieldError[] = [];

  if (userEmail.trim() === "") {
    errors.push({
      field: "email",
      message: "Email must not be empty",
    });
  }

  if (password.trim() === "") {
    errors.push({
      field: "password",
      message: "Password must not be empty",
    });
  }

  return {
    errors,
    valid: errors.length === 0,
  };
}

export function isEmailValid(email: String) {
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  return email.match(regEx) ? true : false;
}

export function isPasswordSecure(password: String) {
  const regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  return password.match(regEx) ? true : false;
}
