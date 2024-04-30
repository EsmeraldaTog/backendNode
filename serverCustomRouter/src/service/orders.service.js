import { testOrders } from "../data/mongo/manager.mongo.js"


class OrdersService{

    constructor(){
        this.model=testOrders
    }

    create = async ({data}) => await this.model.create(data);
    read = async ({ filter, options }) => await this.model.read({ filter, options });
    readOne = async (id) => await this.model.readOne(id);
    report = async (id) => await this.model.report(id);
    update = async (data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const serviceOrders= new OrdersService();
export default serviceOrders