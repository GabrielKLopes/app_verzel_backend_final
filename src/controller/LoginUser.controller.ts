import { Request, Response } from "express";
import { AuthorizationUser } from "../services/AuthorizationUser.service";


export class LoginUserController{
    static async login(req: Request, res: Response): Promise<void>{
        try{
            const {email, password} = req.body;
            const authorization = new AuthorizationUser();
            const token = await authorization.authorizationUser(email, password);
            res.status(200).json({token});
        }catch(error){
            console.log(error);
            res.status(401).json({error: "Authentication failed"});
        }
    }
}