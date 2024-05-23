import serviceProducts from "../service/products.service.js"


class ProductsController {
 constructor(){
    this.service=serviceProducts;
 }
    create= async (req, response, next) => {
        try {
          const data  = req.body;
          console.log(req.user)
      
        const newProduct = await this.service.create(data);
          return response.success201(newProduct);
        } catch (error) {
          return next(error);
        }
      }

      read = async (req, response, next) => {
        try {
          const orderAndPaginate = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { title: 1 },
          };
  
          const filter = {};
  
          if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(), "i");
          }
          const products = await this.service.read({ filter, orderAndPaginate });
          return  response.success200(products);
        } catch (error) {
            next(error);
        }
      }


      readOne= async (req, response, next) => {
        try {
          const { pid } = req.params;
          const productId = await this.service.readOne(pid);
          if (productId) {
            response.success200(productId);
          } else {
            return response.error404();
          } 
        } catch (error) {
          return next(error);
        }
      }


      update=async (req, response, next) => {
        try {
          const { pid } = req.params;
          const data = req.body;
  
          const updatedProduct = await this.service.update(pid, data);
          return response.success201(updatedProduct)
        } catch (error) {
          return next(error);
        }
      }

      remove = async (req, response, next) => {
        try {
          const { pid } = req.params;
  
          const deleteProduct = await this.model.destroy(pid);
          return response.success200(deleteProduct)
        } catch (error) {
          return next(error);
        }
      }


    }
   




 


      

const productsController=  new ProductsController();
export  const { create, read, readOne, update, remove } = productsController;
