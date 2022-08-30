import jwt from "jsonwebtoken";
import config from "../config.js";

// SECURITY GUARD (=Türsteher)
export const auth = (req, res, next) => {
  console.log("[AUTH Middleware] here...");

  // extract incoming token from headers
  const token = req.headers.authorization;

  // check if token is valid!
  try {
    const decodedUser = jwt.verify(token, config.JWT_SECRET);
    // console.log(decodedUser);
    req.user = decodedUser; // store decoded user info in request so we know who is talking to us
    next();
  } catch (err) {
    err.status = 401;
    next(err); // forward to EXIT door (= central error handler)
  }
};
