import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Ivnalid token",
      });
    }

    req.userId = decoded.id;
    next();
  });
}

export default authenticateToken;
