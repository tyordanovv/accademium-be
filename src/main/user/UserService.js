class UserService {
    constructor({ cognitoService, jwtService }) {
        this.cognitoService = cognitoService;
        this.jwtService = jwtService;
    }

    async registerUser(username, password, email, organisationId) {
        await this.cognitoService.adminCreateUser(username, password, email, organisationId);
        await this.cognitoService.adminAddUserToGroup('StudentGroup', email)
    }

    async createB2BUser(username, email, organisationId, role) {
        // const tempPassword = Math.random().toString(36).slice(-8);
        // const params = {
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     Username: username,
        //     UserAttributes: [
        //         { Name: 'email', Value: email },
        //         { Name: 'custom:organisationId', Value: organisationId },
        //     ],
        //     TemporaryPassword: tempPassword,
        // };

        // await this.cognito.adminCreateUser(params);
        // await this.cognito.adminAddUserToGroup({
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     GroupName: role,
        //     Username: username,
        // });

        // return tempPassword;
    }

    async loginUser(username, password) {
        // const params = {
        //     AuthFlow: 'ADMIN_NO_SRP_AUTH',
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     ClientId: this.cognitoConfig.clientId,
        //     AuthParameters: {
        //         USERNAME: username,
        //         PASSWORD: password,
        //     },
        // };

        // const response = await this.cognito.adminInitiateAuth(params);
        // const idToken = response.AuthenticationResult.IdToken;
        // const decoded = this.jwtService.decode(idToken);

        // const token = this.jwtService.sign({
        //     username: decoded['cognito:username'],
        //     email: decoded.email,
        //     groups: decoded['cognito:groups'],
        //     organisationId: decoded['custom:organisationId'],
        // });

        // return token;
    }

    async verifyUser(username, code) {
        // const params = {
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     Username: username,
        //     ConfirmationCode: code,
        // };

        // await this.cognito.confirmSignUp(params);
    }

    async getUserProfile(username) {
        // const params = {
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     Username: username,
        // };

        // const user = await this.cognito.adminGetUser(params);
        // return user;
    }

    async deleteUserProfile(username) {
        // const params = {
        //     UserPoolId: this.cognitoConfig.userPoolId,
        //     Username: username,
        // };

        // await this.cognito.adminDeleteUser(params);
    }
}

export default UserService;