import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.js";

import ViewsRouter from "./views/index.view.js";

const api= new ApiRouter();
const apiRouter=api.getRouter();

const view= new ViewsRouter();
const viewsRouter= view.getRouter();
export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}

