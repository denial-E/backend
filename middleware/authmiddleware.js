import User from "../Models/auth.schema.js";
import  jwt  from "jsonwebtoken";

export const authmiddleware = async (req, res, next) => {
  let token = req.headers.authorization?.replace("Bearer","");

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
