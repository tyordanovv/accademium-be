import { asClass, asValue, createContainer } from "awilix";

import UserController from "../api/userController.js";
import SurveyService from "../survey/SurveyService.js";
import OpenAIClient from "../survey/OpenAIClient.js";
import SurveyController from "../api/surveyController.js";
import Cognito from "../aws/cognitoClient.js";
import CognitoService from "../aws/cognitoService.js";
import UserService from "../user/UserService.js";
import JwtService from "../api/middleware/jwtService.js";
import AuthMiddleware from "../api/middleware/authMiddleware.js";

const container = createContainer();

container.register({
  // Users
  userController: asClass(UserController).singleton(),
  userService: asClass(UserService).singleton(),
  // Auth
  jwtService: asClass(JwtService).singleton(),
  authMiddleware: asClass(AuthMiddleware).singleton(),
  // Survey
  surveyController: asClass(SurveyController).singleton(),
  surveyService: asClass(SurveyService).singleton(),
  // OpenAI
  openAIClient: asClass(OpenAIClient).singleton(),
  // AWS
  cognitoService: asClass(CognitoService).singleton(),
  cognito: asValue(Cognito),
});

export default container;