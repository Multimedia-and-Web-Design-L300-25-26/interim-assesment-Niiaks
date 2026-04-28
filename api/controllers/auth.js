import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.cookie(
      "token",
      jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "15m",
        },
      ),
      {
        expires: new Date(Date.now() + 15 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
    );

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProfile(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
