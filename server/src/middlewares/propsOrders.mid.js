const propsOrders = (req, res, next) => {
    const { pid, uid, quantity, state } = req.body;
    if (
      !pid ||
      !uid ||
     
      !quantity ||
      typeof quantity !== "number" ||
      !state||
      typeof state !=="string"
    ) {
      return res.json({
        statusCode: 400,
        response: `${req.method} ${req.baseUrl}${req.route.path} : The values of quantity and state are required,`,
      });
    } else {
      return next();
    }
  };
  export default propsOrders;