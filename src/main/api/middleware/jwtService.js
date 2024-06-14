import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/environment.js";

class JwtService {
    generateToken(userId) {
        return jwt.sign({ id: userId }, jwtConfig.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
      }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, jwtConfig.secret);
        return decoded;
        } catch (err) {
            console.error("Error verifying token", err);
            return null;
        }
    }
}

export default JwtService;