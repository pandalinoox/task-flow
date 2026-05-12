import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv";

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorised: no token provided" });
    }

    const accessToken = authHeader.split(" ")[1];
    // console.log(accessToken);

    const decoded = jwt.verify(
      accessToken,
      dotenvConfig.JWT_ACCESS_TOKEN_SECRET,
    );
    req.user = { userId: decoded.userId };
    return next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
};
