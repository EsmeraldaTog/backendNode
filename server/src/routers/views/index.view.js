import { Router } from "express";
import formRouter from "./form.view.js";
import realRouter from "./real.view.js";
import registerRouter from "./register.view.js";


const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    
    return res.render("index", {  });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", realRouter)
viewsRouter.use("/form", formRouter)
viewsRouter.use("/register", registerRouter)

export default viewsRouter;
