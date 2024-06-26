const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Jsonwebtokendata =
  process.env.Jsonwebtokendata || "Thisithetokenfoadminregiration";
const verifyAuth = expressAsyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization ;
    try{
        const token = authHeader.split(" ")[1];
    if (authHeader) {
      jwt.verify(token, Jsonwebtokendata, (err, user) => {
        if (err) res.status(403).json("Token is not valid");
        req.user = user;
        next();
      });
    } else {
      return res.status(500).json("You are not authenticate");
    }
    }catch(err){return res.status(500).json("no token");}
  });
module.exports = verifyAuth;
