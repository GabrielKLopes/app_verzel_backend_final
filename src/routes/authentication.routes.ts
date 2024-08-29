import { Router } from "express";
import { LoginUserController } from "../controller/LoginUser.controller";


export const loginRoutes = Router();

loginRoutes.post('/authentication', LoginUserController.login);