exports.validateSignup = ({ fullName, phone, email, password }) => {
  if (!fullName || !phone || !email || !password) {
    throw new Error("All fields are required");
  }
};
