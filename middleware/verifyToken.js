const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user data
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.userData = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: err.message,
    });
  }
}

// Optional endpoint middleware to check token validity without proceeding
function isAuthorized(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN_KEY);

    return res.status(200).json({ success: true, message: "Token is valid" });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: err.message,
    });
  }
}

module.exports = {
  verifyToken,
  isAuthorized,
};
