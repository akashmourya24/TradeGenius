// // services/auth.service.js
// import prisma from "../config/db.js";
// import { hashPassword, comparePassword } from "../utils/bcrypt.js";
// import { generateToken } from "../utils/jwt.js"; // ensure jwt.js has a named export

// // Signup function
// export const signup = async (data) => {
//   const hashedPassword = await hashPassword(data.password);

//   // Check email
//   const emailExists = await prisma.user.findUnique({
//     where: { email: data.email },
//   });

//   if (emailExists) {
//     throw new Error("Email already in use");
//   }

//   // Check phone
//   const phoneExists = await prisma.user.findUnique({
//     where: { phone: data.phone },
//   });

//   if (phoneExists) {
//     throw new Error("Phone already in use");
//   }
//   function isValidGmail(email) {
//     const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     return regex.test(email);
//   }
//   if (!isValidGmail(data.email)) {
//     throw new Error("Email is not correctly formatted as a Gmail address");
//   }
//   return await prisma.user.create({
//     data: { ...data, password: hashedPassword },
//   });
// };

// // Login function
// export const login = async (email, password) => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) throw new Error("Invalid credentials");
//   console.log("User found:", user);
//   const isMatch = await comparePassword(password, user.password);
//   if (!isMatch) throw new Error("Invalid credentials");

//   return {
//     token: generateToken({ userId: user.id }),
//     user: { id: user.id },
//     name: user.fullName,
//     email: user.email,
//     phone: user.phone,
//     isPaid: user.isPaid,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//   };
// };
