import { asClass, asValue, createContainer } from "awilix";

import UserController from "../api/userController.js";

const container = createContainer();

container.register({
  userController: asClass(UserController).singleton(),
});

export default container;
