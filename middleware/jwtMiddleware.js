const JWT = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token)
      return res.status(401).json({
        error: "No token provided",
      });
    JWT.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error)
        return res.status(401).json({
          error: "Invalid token",
        });
      console.log({ payload });
      req.body.id = payload.id;
      req.body.email = payload.email;
      next();
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = jwtMiddleware;
