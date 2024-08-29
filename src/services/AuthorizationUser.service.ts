import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";


export class AuthorizationUser {
    private userRepository = AppDataSource.getRepository(Users);
    private secretJWT = process.env.JWT_SECRET_KEY || "";

    async authorizationUser(email: string, password: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) throw new Error("User not found");

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = {
                    email: user.email,
                    user_id: user.user_id,

                };
                return jwt.sign(payload, this.secretJWT, { expiresIn: '1h' });
            }
            throw new Error('User ou password incorrect');
        } catch (error) {
            throw error;
        }
    }
}
