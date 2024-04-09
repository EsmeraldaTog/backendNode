import { verifyToken } from "../utils/token.util.js";

export default (req, res, next) => {
    try {
      //console.log(req.session);
      // const token= req.cookies.token;
      // const userData=verifyToken(token)
console.log(req.user);

      const { role } = req.user;
      //console.log(role);
      if (role === 1) {
        return next();
      } else {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  };