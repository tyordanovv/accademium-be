import express from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "./middleware/asynchHandler.js";


class SurveyController {
    constructor({ surveyService }) {
        this.router = express.Router();
      
        this.router.post(
            asyncHandler(this.handleSurvey.bind(this))
        );
    }

    handleSurvey = async (req, res) => {
        const result = await this.surveyService.evaluateResults(req.body)
        res.status(StatusCodes.OK).send(result);
    };
}
export default SurveyController;
