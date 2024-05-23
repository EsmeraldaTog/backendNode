

import  testProducts  from "../../data/mongo/manager.mongo.js";
import SessionsView from "./sessions.view.js";
import ordersRouter from "../api/orders.router.js";

import ProductsView from "./products.view.js";
import CustomRouter from "../CustomRouter.js";



const sessionsRouter= new SessionsView();
const productsRouter=new  ProductsView();
export default class ViewsRouter extends CustomRouter{
init(){
  this.router.use("/products", productsRouter.getRouter())
  // this.router.use("/orders", ordersRouter)
  this.router.use("/sessions", sessionsRouter.getRouter())


this.read("/",["PUBLIC"], async (req, res, next) => {
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
}

}


