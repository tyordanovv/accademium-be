class AuthMiddleware {
    constructor({ jwtService }) {
        this.jwtService = jwtService;
    }

    verifyToken = async (req, res, next) => {
        console.log(req.headers.authorization)
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
    
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded; 
            console.log("decoded:", decoded)
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    };

    authorize = (role) => (req, res, next) => {
        const { groups } = req.user; 

        if (!groups || !groups.includes(role)) {
            return res.status(403).send("Access Denied");
        }

        next();
    };
}

export default AuthMiddleware;
