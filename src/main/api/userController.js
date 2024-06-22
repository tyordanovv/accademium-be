import express from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "./middleware/asynchHandler.js";
import validateSchema from './middleware/validateSchema.js'
import Joi from 'joi';

class UserController {
    constructor({ userService }) {
        this.router = express.Router();
        this.userService = userService;
      
        this.router.get(
            "/test",
            asyncHandler(this.test.bind(this))
        );
        this.router.post(
            "/register",
            validateSchema(StudentRegistrationRequest),
            asyncHandler(this.registerStudent.bind(this))
        );
        this.router.post(
            "/login",
            asyncHandler(this.login.bind(this))
        );
        // this.router.post(
        //     "/verify",
        //     asyncHandler(this.verify.bind(this))
        // );
        // this.router.post(
        //     "/createB2BAdmin",
        //     authMiddleware.verifyToken,
        //     authMiddleware.authorize('PlatformAdmin'),
        //     asyncHandler(this.createB2BAdmin.bind(this))
        // );
        // this.router.post(
        //     "/createB2BModerator",
        //     authMiddleware.verifyToken,
        //     authMiddleware.authorize('uniAdmin'),
        //     asyncHandler(this.createB2BModerator.bind(this))
        // );
        // this.router.get(
        //     "/profile",
        //     authMiddleware.verifyToken,
        //     asyncHandler(this.profile.bind(this))
        // );
        // this.router.delete(
        //     "/:email",
        //     authMiddleware.verifyToken,
        //     authMiddleware.authorize('PlatformAdmin'),
        //     asyncHandler(this.deleteUser.bind(this))
        // );
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
        const token = await this.userService.loginUser(email, password);
        res.status(StatusCodes.OK).json({ token });
    }

    // async verify(req, res) {
    //     const { email, code } = req.body;
    //     await this.userService.verifyUser(email, code);
    //     res.status(StatusCodes.OK).send("User verified successfully.");
    // }

    // async createB2BAdmin(req, res) {
    //     const { email, organisationId } = req.body;
    //     const tempPassword = await this.userService.createB2BUser(email, organisationId, 'uniAdmin');
    //     res.status(StatusCodes.OK).send(`B2B Admin created successfully with temporary password: ${tempPassword}`);
    // }

    // async createB2BModerator(req, res) {
    //     const { email, organisationId } = req.body;
    //     const tempPassword = await this.userService.createB2BUser(email, organisationId, 'Moderator');
    //     res.status(StatusCodes.OK).send(`B2B Moderator created successfully with temporary password: ${tempPassword}`);
    // }

    // async profile(req, res) {
    //     const email = req.user.email;
    //     const user = await this.userService.getUserProfile(email);
    //     res.status(StatusCodes.OK).json(user);
    // }

    // async deleteUser(req, res) {
    //     const { email } = req.params;
    //     await this.userService.deleteUserProfile(email);
    //     res.status(StatusCodes.OK).send("User deleted successfully.");
    // }
}
export default UserController;

const LoginRequest = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  
  const StudentRegistrationRequest = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    organisationId: Joi.string().required(),
  });