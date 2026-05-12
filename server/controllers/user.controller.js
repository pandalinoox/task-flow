import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { checkPasswordIsValid, hashPassword } from "../utils/hash.util";
import dotenvConfig from "../config/dotenv";

const JWT_ACCESS_TOKEN_SECRET = dotenvConfig.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = dotenvConfig.JWT_REFRESH_TOKEN_SECRET;

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    if (!name || !email || !password) {
      return next(new Error("Please provide all credentials"));
    }

    const isAlreadyRegistered = await User.findOne({ email });

    if (isAlreadyRegistered) {
      return next(new Error("User already exists"));
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Please provide all credentials"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error("Invalid email or password"));
    }

    const isPasswordValid = await checkPasswordIsValid(password, user.password);
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return next(new Error("Invalid email or password"));
    }

    const refreshToken = jwt.sign(
      { userId: user.id },
      JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { name: user.name, email: user.email },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const generateToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      return next(new Error("Refresh token not found"));
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);
  
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Token generated successfully", newAccessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "logged out successfully" });
};
