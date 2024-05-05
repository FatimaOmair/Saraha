import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { signUpSchema } from "./auth.validation.js";
import sendEmail from "../../utils/sendEmail.js";

export const signUp = async (req, res,next) => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(new Error("User already exists"))
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
      return res.json(decoded);
      const decoded = jwt.verify(token, process.env.EMAILSIGN);
      
      const updatedUser = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true }, { new: true });
      console.log(token)

      

      if (!token) {
          return res.status(400).json({ message: "Token is missing" });
      }
     

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      if(updatedUser.modifiedCount>0){
        return res.redirect(process.env.FURL + "/email-confirmed");
      }

     
  } catch (error) {
      console.error("Error in confirmEmail:", error);
      return res.status(400).json({ message: "Invalid or expired token" });
  }
};





export const signIn = async (req, res) => {
    const { email, password } = req.body; // Destructuring email and password from request body

    try {
        const user = await userModel.findOne({ email }).select('userName password');

        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }
       const token = jwt.sign({id:user._id},process.env.LOGINSIG)
        // If both email and password are correct, return success message and user data
        return res.json({ message: "Success", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

