import { generateRandomPassword } from "../utils/password/randomPasswordGenerator.js";

class UserService {
    constructor({ cognitoService, jwtService }) {
        this.cognitoService = cognitoService;
        this.jwtService = jwtService;
    }

    async registerUser( username, password, email, organisationId ) {
        await this.cognitoService.createStudent(username, password, email, organisationId);
        await this.cognitoService.adminAddUserToGroup('StudentGroup', email)
    }

    async createB2BUser( username, email, organisationId, role ) {
        const tempPassword = generateRandomPassword();

        await this.cognitoService.adminCreateUser(username, tempPassword, email, organisationId);
        await this.cognitoService.adminAddUserToGroup(role, email)

        return tempPassword;
    }

    async loginUser(email, password) {
        const response = await this.cognitoService.initiateAuthCommand(email, password);
    
        if (!response.AuthenticationResult) {
            const challengeName = response.ChallengeName;
    
            if (challengeName === 'NEW_PASSWORD_REQUIRED') {
                return response;
            } else {
                throw new Error('Authentication failed. Challenge not supported.');
            }
        }
    
        const { IdToken } = response.AuthenticationResult;
        const decoded = this.jwtService.decode(IdToken);
    
        const token = this.jwtService.sign({
            username: decoded['cognito:username'],
            email: decoded.email,
            groups: decoded['cognito:groups'],
            organisationId: decoded['custom:organisationId'],
        });
    
        return token;
    }
    

    async verifyUser(username, code) {
        await this.cognitoService.confirmSignUp(username, code);
    }

    async getUserProfile(email) {
        const response = await this.cognitoService.adminGetUser(email);
        const { UserAttributes, UserCreateDate } = response;
        return { UserAttributes, UserCreateDate };
    }

    async deleteUserProfile(email) {
        await this.cognitoService.adminDeleteUser(email);
    }

    async changePassword(user, currentPassword, newPassword) {
        await this.cognitoService.changePassword(user, currentPassword, newPassword);
    }

    async changeInitialPassword(email, session, newPassword) {
        await this.cognitoService.respondToNewPasswordChallenge(email, session, newPassword);
    }
}

export default UserService;