import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const dupUser = User.findOne({ email });
    if (dupUser) {
      return res.status(500).json({
        message: "User Exist",
        resgistered: true,
        title: "Invalid Email Address",
        context:
          "The email address has already been used. An email can only be used on one Social Media account at a time.",
        button: "OK, I will try another email.",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        message: "User Not Found",
        logged: false,
        title: "User Not Found",
        context: "User Not Found. Enter a different account",
        button: "OK",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
        logged: false,
        title: "Invalid credentials",
        context: "Wrong password! Try again.",
        button: "OK",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({
      logged: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
