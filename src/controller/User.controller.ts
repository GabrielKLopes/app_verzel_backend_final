import { UserService } from "../services/User.service"
import { Request, Response } from "express"
export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Missing required fields" })
                return
            }

            const user = await userService.createUser(email, password);
            res.status(200).json({ message: user });

        } catch (error){
            console.error('Error creating user:', error); 
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
          const userService = new UserService();
          const token = req.headers.authorization?.split(" ")[1];
    
          if (!token) {
            res.status(401).json({ message: "Token de autorização não fornecido" });
            return;
          }
    
          const users = await userService.getAllUser(token);
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      }
}