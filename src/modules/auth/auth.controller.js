import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { signUpSchema } from "./auth.validation.js";
import sendEmail from "../../utils/sendEmail.js";

export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
        const newUser = await userModel.create({ userName, email, password: hashedPassword });
        if (!newUser) {
            return res.status(500).json({ message: "Error while creating user" });
        }

        const emailConfirmationToken = jwt.sign({ email }, process.env.EMAILSIGN, { expiresIn: '1d' });

        const confirmationLink = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${emailConfirmationToken}`;
        const html = `
            <h1>Welcome to Infinity</h1>
            <h2>${userName}</h2>
            <p>Please confirm your email address by clicking the following link:</p>
            <a href="${confirmationLink}">Confirm Email</a>
        `;

        await sendEmail(email, "Welcome to Infinity", html);

        return res.status(201).json({ message: "User created successfully. Please check your email to confirm your account." });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const confirmEmail = async (req, res) => {
  try {
      const { token } = req.params;
      console.log(token)
      if (!token) {
          return res.status(400).json({ message: "Token is missing" });
      }
      const decoded = jwt.verify(token, process.env.EMAILSIGN);
      const updatedUser = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      return res.redirect(process.env.FURL + "/email-confirmed");
  } catch (error) {
      console.error("Error in confirmEmail:", error);
      return res.status(400).json({ message: "Invalid or expired token" });
  }
};
