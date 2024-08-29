import bcrypt from 'bcrypt';
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";
import * as jwt from 'jsonwebtoken';

export class UserService{
    private userRepository = AppDataSource.getRepository(Users);
    private secretJWT = process.env.JWT_SECRET_KEY || "";

    async createUser(email: string, password: string): Promise<Users>{
        try{
            const existingEmail = await this.userRepository.findOne({where: {email}});
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            const hashPassowrd = await bcrypt.hash(password, 10);
            const user = new Users();

            if(!emailRegex.test(email)) throw new Error('Invalid Email');
            if(!passwordRegex.test(password)) throw new Error('The password must be between 8 and 16 characters long, containing at least one saved letter, one lowercase letter, one number and one special character.');
            if(existingEmail) throw new Error("Email already registered");

            user.email = email;
            user.password = hashPassowrd;
            await this.userRepository.save(user);
            return user;

        }catch(error){
            throw error;
        }
    }

    async getAllUser(token: string): Promise<Users[]> {
        const decodedToken: any = jwt.verify(token, this.secretJWT);
        const userId = decodedToken.userId;
      
        const users = await this.userRepository.find({
            select: ['user_id', 'email']
        });
      
        return users;
      }
    }