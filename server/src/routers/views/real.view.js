import { Router } from "express";



const realRouter = Router();

realRouter.get("/", (req, res, next) => {
  try {
    return res.render("products", { title: "REAL" });
  } catch (error) {
    next(error);
  }
});

export default realRouter;