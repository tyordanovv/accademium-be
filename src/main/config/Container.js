import { asClass, asValue, createContainer } from "awilix";

import UserController from "../api/userController.js";
import SurveyService from "../survey/SurveyService.js";
import OpenAIClient from "../survey/OpenAIClient.js";
import SurveyController from "../api/surveyController.js";

const container = createContainer();

container.register({
  userController: asClass(UserController).singleton(),
  surveyController: asClass(SurveyController).singleton(),
  surveyService: asClass(SurveyService).singleton(),
  openAIClient: asClass(OpenAIClient).singleton(),
});

export default container;
