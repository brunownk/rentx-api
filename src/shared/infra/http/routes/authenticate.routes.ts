import { Router } from "express";

import { AuthenticateUsercontroller } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUsercontroller();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
