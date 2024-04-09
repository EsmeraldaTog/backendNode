import { Router } from "express";
import { testUsers } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login

sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in",
          //session: req.session,
          //token:req.token,
        });
    } catch (error) {
      return next(error);
    }
  }
);

//login google
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
//google callback
sessionsRouter.get(
  "/google/cb",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

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

/// Ensignout Esta pendiente borrar la cookie con el token que se genero en el logeo
sessionsRouter.post(
  "/signout",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }),
  async (req, res, next) => {
    try {
      // if (req.session.email) {
      //   req.session.destroy();
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
      // } else {
      //   const error = new Error("No Auth");
      //   error.statusCode = 400;
      //   throw error;
      // }
    } catch (error) {
      return next(error);
    }
  }
);

///badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

///signout /cb

sessionsRouter.get("/signout/cb", async (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already dONE",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
