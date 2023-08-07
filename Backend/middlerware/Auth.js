import jwt from "jsonwebtoken"; 
const jwtSecret ="331a205afdd7f7da4d2ef74929e2e015f42d0a76b4850dff91d4c8932041f874261118"
const verifyToken = (req, res, next) => {
  const token =req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  
  try {
    const decoded = jwt.verify(token,jwtSecret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;