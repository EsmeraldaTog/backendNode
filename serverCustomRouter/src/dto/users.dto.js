import argsUtil from "../utils/args.util.js";
import { randomBytes } from "crypto";
import { createHash } from "../utils/hash.util.js";


class UserDTO {
  constructor(data) {
    argsUtil.env !== "prod" && (this._id = randomBytes(12).toString("hex")),
      this.name = data.name,
      this.photo = data.photo,
      this.email = data.email,
      this.password = createHash(data.password),
      this.role = data.role || 1;
    argsUtil.env !== "prod" && (this.createdAt = new Date());
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
  }
}

export default UserDTO;
