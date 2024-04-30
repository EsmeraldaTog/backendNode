import service from "../service/users.service.js";

class UsersControllers {
  constructor() {
    this.service = service;
  }

  create = async (req, response, next) => {
    try {
      const data = req.body;
      const newUser = await this.service.create(data);
      return response.success201(newUser);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, response, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { email: 1 },
      };

      const filter = {};

      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      const users = await this.service.read({ filter, orderAndPaginate });
      return response.succes200(users);
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req, response, next) => {
    try {
      const { uid } = req.user._id;
      const userId = await this.service.readOne(uid);
      if (userId) {
        response.succes200(userId);
      } else {
        return response.error404();
      }
    } catch (error) {
      next(error);
    }
  };

  readByEmail = async (req, response, next) => {
    try {
      const { uemail } = req.user.email;
      const user = await this.service.readByEmail(uemail);
      return response.succes200(user);
    } catch (error) {
      return next(error);
    }
  };

  update= async (req, response, next) => {

    try {
         const { _id } = req.user
      req.body.uid= _id
        const data = req.body;
        const updatedUser = await this.service.update(uid,data);
        return  response.success201(updatedUser)

    } catch (error) {
     return next(error)
        
    }
};
destroy = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const response = await this.service.destroy(eid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

const usersController = new UsersControllers();
export const { create, read, readOne, readByEmail,update, destroy } = usersController;
