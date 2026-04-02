

export const validateSignup = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "Name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  if (!formData.confirm_password) {
    errors.confirm_password = "Confirm password is required";
  } else if (formData.password !== formData.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
};
