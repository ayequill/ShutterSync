export default function isStrongPassword(password: string): boolean {
  // Define the regular expressions for the criteria
  const minLengthRegex = /.{8,}/; // Minimum 8 characters
  const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
  const lowercaseRegex = /[a-z]/; // At least one lowercase letter
  const digitRegex = /\d/; // At least one digit
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  // Check if the password meets all criteria
  const meetsMinLength = minLengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasDigit = digitRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return (
    meetsMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar
  );
}
