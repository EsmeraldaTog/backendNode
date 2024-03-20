import { Router } from "express";
import formRouter from "./form.view.js";
import realRouter from "./real.view.js";
import registerRouter from "./register.view.js";
import { testProducts } from "../../data/mongo/manager.mongo.js";
import loginRouter from "./login.view.js";


const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { price: 1 },
      lean: true 
    };

    const filter = {};

    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    if (req.query.price === "desc") {
      orderAndPaginate.sort.price = -1;
    }
    

    let allProducts = await testProducts.read({ filter, orderAndPaginate });

 
    const {
      docs,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = allProducts;
    console.log(allProducts);

    const pagesArray = Array.from({ length: totalPages }, (_, i) => ({
      pageNumber: i + 1,
      isCurrent: i + 1 === page,
      
    }));
    console.log(pagesArray)
    return res.render("index", {products:docs, pages: pagesArray, hasNextPage,hasPrevPage, prevPage,nextPage});
   
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", realRouter)
viewsRouter.use("/product", formRouter)
viewsRouter.use("/auth", registerRouter)
viewsRouter.use("/auth", loginRouter)

export default viewsRouter;
