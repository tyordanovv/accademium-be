import express from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "./middleware/asynchHandler.js";
import validateSchema from './middleware/validateSchema.js'
import Joi from 'joi';

class UserController {
    constructor({ userService, authMiddleware }) {
        this.router = express.Router();
        this.userService = userService;
      
        this.router
                .get("/test", asyncHandler(this.test.bind(this)))
                .post("/register", validateSchema(StudentRegistrationRequest), asyncHandler(this.registerStudent.bind(this)))
                .post("/login", validateSchema(LoginRequest), asyncHandler(this.login.bind(this)))
                .post("/verify", validateSchema(ValidationRequest),asyncHandler(this.verify.bind(this)))
                .post("/createB2BAdmin", authMiddleware.verifyToken, authMiddleware.authorize('PlatformAdminGroup'), asyncHandler(this.createB2BAdmin.bind(this)))
                .post("/createB2BModerator", authMiddleware.verifyToken, authMiddleware.authorize('B2BAdminGroup'), asyncHandler(this.createB2BModerator.bind(this)))
                .post("/pass/change", authMiddleware.verifyToken, asyncHandler(this.changePassword.bind(this)))
                .post("/pass/change/init", asyncHandler(this.changeInitialPassword.bind(this)))
                .get("/", authMiddleware.verifyToken, asyncHandler(this.profile.bind(this)))
                .delete("/", authMiddleware.verifyToken, asyncHandler(this.deleteUser.bind(this)));
    }

    test = async (req, res) => {
        res.status(StatusCodes.OK).send("test");
    };

    async registerStudent(req, res) {
        const { email, password, organisationId } = req.body;
        await this.userService.registerUser(email, password, email, organisationId);
        res.status(StatusCodes.OK).send("Student registered successfully. Please check your email for verification.");
    }

    async login(req, res) {
        const { email, password } = req.body;
        const response = await this.userService.loginUser(email, password);
        res.status(StatusCodes.OK).json({ response });
    }

    async verify(req, res) {
        const { email, code } = req.body;
        await this.userService.verifyUser(email, code);
        res.status(StatusCodes.OK).send("User verified successfully.");
    }

    async createB2BAdmin(req, res) {
        const { email, organisationId } = req.body;
        const tempPassword = await this.userService.createB2BUser(email, email, organisationId, 'B2BAdminGroup');
        res.status(StatusCodes.OK).send(`B2B Admin created successfully with temporary password: ${tempPassword}`);
    }

    async createB2BModerator(req, res) {
        const { email, organisationId } = req.body;
        const tempPassword = await this.userService.createB2BUser(email, email, organisationId, 'B2BModeratorGroup');
        res.status(StatusCodes.OK).send(`B2B Moderator created successfully with temporary password: ${tempPassword}`);
    }

    async profile(req, res) {
        const email = req.user.email;
        const user = await this.userService.getUserProfile(email);
        res.status(StatusCodes.OK).json(user);
    }

    async deleteUser(req, res) {
        const email = req.user.email;
        await this.userService.deleteUserProfile(email);
        res.status(StatusCodes.OK).send("User deleted successfully.");
    }

    async changePassword(req, res) {
        const { user, currentPassword, newPassword } = req.body;

        try {
            this.userService.changePassword(user, currentPassword, newPassword);
            return res.status(200).json({ message: 'Password changed successfully.' });
        } catch (error) {
            console.error('Error changing password:', error);
            return res.status(500).json({ message: 'Error changing password.' });
        }
    }

    async changeInitialPassword(req, res) {
        const { user, session, password } = req.body;

        try {
            this.userService.changeInitialPassword(user.email, session, password);
            return res.status(200).json({ message: 'Password changed successfully.' });
        } catch (error) {
            console.error('Error changing password:', error);
            return res.status(500).json({ message: 'Error changing password.' });
        }
    }
}
export default UserController;
  
const StudentRegistrationRequest = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    organisationId: Joi.string().required(),
});

const LoginRequest = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const ValidationRequest = Joi.object({
    email: Joi.string().required(),
    code: Joi.string().required(),
});