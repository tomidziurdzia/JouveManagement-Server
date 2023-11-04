const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const checkRegexPassword = (password: string) => {
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }
  return;
};

export { checkRegexPassword };
