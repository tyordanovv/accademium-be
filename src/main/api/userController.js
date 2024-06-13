import express from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "./middleware/asynchHandler.js";


class UserController {
    constructor({ }) {
        this.router = express.Router();
      
        this.router.get(
            "/test",
            asyncHandler(this.test.bind(this))
        );
    }

    test = async (req, res) => {
        res.status(StatusCodes.OK).send("test");
    };
}
export default UserController;
