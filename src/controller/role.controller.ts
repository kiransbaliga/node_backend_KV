import exp from "constants";
import express from "express";
import authenticate from "../middleware/authenticate.middleware";
import ApiResponse from "../utils/response";
import { Role } from "../utils/role.enum";

class RoleController {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.get("/", authenticate, this.getAllRoles);
  }
  getAllRoles = async (req, res) => {
    res.status(200).send(
        new ApiResponse(
            Object.values(Role),
            "ok",
            null,
            {
                length:Object.values(Role).length,
                took:new Date().getTime() - req.body.time,
                total:Object.values(Role).length
            }
        )
    )
  };
}

export default RoleController