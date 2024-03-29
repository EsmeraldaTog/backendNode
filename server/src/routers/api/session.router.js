import { Router } from "express";
import { testUsers } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";


const sessionsRouter = Router();

//register
sessionsRouter.post("/register", has8char,async (req, res, next) => {
  try {
    const data = req.body;
    const user= await testUsers.create(data);
    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

//register

sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "admin"
      return res.json({
        statusCode: 200,
        message: "Logged in",
        session: req.session
      });
    }

    const error = new Error("Bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});


sessionsRouter.post("/", async (req, res, next) => {
    try {
      if (req.session.email) {
        return res.json({
          statusCode: 200,
          message: "Session with email: " + req.session.email,
        });
      } else {
        const error = new Error("No Auth");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  });


  //signout
sessionsRouter.post("/signout", async (req, res, next) => {
    try {
      if (req.session.email) {
        req.session.destroy();
        return res.json({
          statusCode: 200,
          message: "Signed out!",
        });
      } else {
        const error = new Error("No Auth");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  });
export default sessionsRouter;
