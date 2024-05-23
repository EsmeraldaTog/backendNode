import repository from "../repositories/orders.rep.js";
import OrderDTO from "../dto/orders.dto.js";
class OrdersService{

    constructor(){
        this.repository=repository;
    }

    create = async (data) => {
        data = new OrderDTO(data);
        const response = await this.repository.create(data);
        return response;
      };
    read = async ({ filter, options }) => await this.repository.read({ filter, options });
    readOne = async (id) => await this.repository.readOne(id);
    report = async (id) => await this.repository.report(id);
    update = async (id,data) => await this.repository.update(id, data);
    destroy = async (id) => await this.repository.destroy(id);
}

const serviceOrders= new OrdersService();
export default serviceOrders