import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/environment.js";

class JwtService {
    sign(payload) {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: '1h' });
    }

    verify(token) {
        return jwt.verify(token, jwtConfig.secret);
    }

    decode(token) {
        return jwt.decode(token);
    }
}

export default JwtService;